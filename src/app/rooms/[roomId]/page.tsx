'use client';

import { useParams, useRouter } from 'next/navigation';
import { RoomChatPusher } from '../../../components/RoomChatPusher';

const roomData: Record<string, { name: string }> = {
  anxiety: { name: 'Anxiety Support' },
  loneliness: { name: 'Loneliness Support' },
  stress: { name: 'Stress & Overwhelm' },
  sleep: { name: 'Sleep Struggles' },
  general: { name: 'General Support' },
};

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const room = roomData[roomId];

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center">Room not found</div>;
  }

  return (
    <RoomChatPusher 
      roomId={roomId} 
      roomName={room.name} 
      onLeave={() => router.push('/rooms')} 
    />
  );
}
