import { NextRequest } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
// Smart matching functions (inline for simplicity)
type MoodCategory = 'emotional' | 'anxiety' | 'loneliness' | 'stress' | 'general';

const moodToCategory: Record<string, MoodCategory> = {
  sadness: 'emotional',
  other: 'emotional',
  anxiety: 'anxiety',
  loneliness: 'loneliness',
  stress: 'stress',
  justtalk: 'general',
};

function calculateCompatibility(mood1: string, mood2: string): number {
  if (!mood1 || !mood2) return 0.5;
  const cat1 = moodToCategory[mood1] || 'general';
  const cat2 = moodToCategory[mood2] || 'general';
  if (cat1 === cat2) return 1.0;
  if (cat1 === 'general' || cat2 === 'general') return 0.7;
  if (cat1 === 'emotional' && cat2 === 'loneliness') return 0.8;
  if (cat1 === 'stress' && cat2 === 'anxiety') return 0.75;
  return 0.4;
}

interface SessionData {
  user1: string;
  user2?: string;
  mood?: string;
  joinedAt: number;
}

function findBestMatch(currentSessionId: string, currentMood: string | undefined, sessions: Map<string, SessionData>): string | null {
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [sessionId, data] of sessions) {
    if (sessionId === currentSessionId || data.user2) continue;
    const score = calculateCompatibility(currentMood || '', data.mood || '');
    const waitTime = Date.now() - data.joinedAt;
    const waitBonus = Math.min(waitTime / 30000, 0.2);
    const finalScore = score + waitBonus;
    if (finalScore > bestScore) {
      bestScore = finalScore;
      bestMatch = sessionId;
    }
  }
  return bestMatch;
}

// In-memory session storage (ephemeral - resets on server restart)
let io: SocketIOServer | undefined;
const sessions = new Map<string, SessionData>();
const userSockets = new Map<string, string>(); // sessionId -> socketId

export async function GET(req: NextRequest) {
  if (!io) {
    io = new SocketIOServer({
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join-session', ({ sessionId, mood }: { sessionId: string; mood?: string }) => {
        userSockets.set(sessionId, socket.id);
        
        const sessionData: SessionData = {
          user1: sessionId,
          mood,
          joinedAt: Date.now(),
        };
        
        // Try smart matching
        const matchId = findBestMatch(sessionId, mood, sessions);
        
        if (matchId) {
          // Match found
          const matchData = sessions.get(matchId)!;
          matchData.user2 = sessionId;
          sessions.set(matchId, matchData);
          
          const partnerSocketId = userSockets.get(matchId);
          if (partnerSocketId) {
            io!.to(partnerSocketId).emit('matched', { partnerId: sessionId });
            io!.to(socket.id).emit('matched', { partnerId: matchId });
          }
        } else {
          // No good match yet, wait
          sessions.set(sessionId, sessionData);
        }
      });

      socket.on('send-message', ({ sessionId, text, audio, type }: { 
        sessionId: string; 
        text?: string; 
        audio?: string; 
        type: string;
      }) => {
        // Find partner and forward message
        for (const [sId, data] of sessions) {
          if (data.user1 === sessionId && data.user2) {
            const partnerSocket = userSockets.get(data.user2);
            if (partnerSocket) {
              io!.to(partnerSocket).emit('message', {
                text,
                audio,
                timestamp: new Date().toISOString(),
                type,
              });
            }
            break;
          }
          if (data.user2 === sessionId && data.user1) {
            const partnerSocket = userSockets.get(data.user1);
            if (partnerSocket) {
              io!.to(partnerSocket).emit('message', {
                text,
                audio,
                timestamp: new Date().toISOString(),
                type,
              });
            }
            break;
          }
        }
      });

      socket.on('typing', ({ sessionId }: { sessionId: string }) => {
        for (const [sId, data] of sessions) {
          if (data.user1 === sessionId && data.user2) {
            const partnerSocket = userSockets.get(data.user2);
            if (partnerSocket) io!.to(partnerSocket).emit('partner-typing');
            break;
          }
          if (data.user2 === sessionId && data.user1) {
            const partnerSocket = userSockets.get(data.user1);
            if (partnerSocket) io!.to(partnerSocket).emit('partner-typing');
            break;
          }
        }
      });

      socket.on('report-user', ({ sessionId, reason }: { sessionId: string; reason: string }) => {
        console.log(`[REPORT] Session ${sessionId} reported for: ${reason}`);
        // In production: save to DB, notify moderators, etc.
        
        // For now, just notify the user
        socket.emit('report-received', { message: "Thank you. We have received your report." });
        
        // Auto end chat for safety
        for (const [sId, data] of sessions) {
          if (data.user1 === sessionId || data.user2 === sessionId) {
            const partnerId = data.user1 === sessionId ? data.user2 : data.user1;
            if (partnerId) {
              const partnerSocket = userSockets.get(partnerId);
              if (partnerSocket) {
                io!.to(partnerSocket).emit('partner-left');
              }
            }
            sessions.delete(sId);
            break;
          }
        }
      });

      socket.on('leave-session', ({ sessionId }: { sessionId: string }) => {
        for (const [sId, data] of sessions) {
          if (data.user1 === sessionId || data.user2 === sessionId) {
            const partnerId = data.user1 === sessionId ? data.user2 : data.user1;
            if (partnerId) {
              const partnerSocket = userSockets.get(partnerId);
              if (partnerSocket) {
                io!.to(partnerSocket).emit('partner-left');
              }
            }
            sessions.delete(sId);
            break;
          }
        }
        userSockets.delete(sessionId);
      });

      // ==================== ROOM CHAT ====================
      const roomUsers = new Map<string, Set<string>>(); // roomId -> Set of usernames

      socket.on('join-room', ({ roomId, username }: { roomId: string; username: string }) => {
        socket.join(roomId);
        
        if (!roomUsers.has(roomId)) {
          roomUsers.set(roomId, new Set());
        }
        roomUsers.get(roomId)!.add(username);
        
        // Send current user count
        io!.to(roomId).emit('user-count', roomUsers.get(roomId)!.size);
        
        // Notify others
        socket.to(roomId).emit('user-joined', { username });
        
        console.log(`${username} joined room ${roomId}`);
      });

      socket.on('room-message', ({ roomId, text, username }: { roomId: string; text: string; username: string }) => {
        io!.to(roomId).emit('room-message', {
          text,
          username,
          timestamp: new Date().toISOString(),
        });
      });

      socket.on('leave-room', ({ roomId, username }: { roomId: string; username: string }) => {
        socket.leave(roomId);
        
        if (roomUsers.has(roomId)) {
          roomUsers.get(roomId)!.delete(username);
          io!.to(roomId).emit('user-count', roomUsers.get(roomId)!.size);
          socket.to(roomId).emit('user-left', { username });
        }
      });

      socket.on('disconnect', () => {
        // Handle 1-on-1 disconnect
        for (const [sessionId, socketId] of userSockets) {
          if (socketId === socket.id) {
            userSockets.delete(sessionId);
            
            for (const [sId, data] of sessions) {
              if (data.user1 === sessionId || data.user2 === sessionId) {
                const partnerId = data.user1 === sessionId ? data.user2 : data.user1;
                if (partnerId) {
                  const partnerSocket = userSockets.get(partnerId);
                  if (partnerSocket) {
                    io!.to(partnerSocket).emit('partner-left');
                  }
                }
                sessions.delete(sId);
              }
            }
            break;
          }
        }
      });
    });
  }

  return new Response('Socket server running', { status: 200 });
}
