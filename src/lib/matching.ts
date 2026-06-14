// Smart Matching System for SoulSpace
// Mood-based + category compatibility

export type MoodCategory = 'emotional' | 'anxiety' | 'loneliness' | 'stress' | 'general';

export const moodToCategory: Record<string, MoodCategory> = {
  sadness: 'emotional',
  other: 'emotional',
  anxiety: 'anxiety',
  loneliness: 'loneliness',
  stress: 'stress',
  justtalk: 'general',
};

export interface SessionData {
  user1: string;
  user2?: string;
  mood?: string;
  category?: MoodCategory;
  joinedAt: number;
}

// Calculate compatibility score between two moods
export function calculateCompatibility(mood1: string, mood2: string): number {
  if (!mood1 || !mood2) return 0.5; // neutral

  const cat1 = moodToCategory[mood1] || 'general';
  const cat2 = moodToCategory[mood2] || 'general';

  if (cat1 === cat2) return 1.0;           // Perfect match
  if (cat1 === 'general' || cat2 === 'general') return 0.7;
  if (cat1 === 'emotional' && cat2 === 'loneliness') return 0.8;
  if (cat1 === 'stress' && cat2 === 'anxiety') return 0.75;

  return 0.4; // Different categories
}

// Smart matching logic
export function findBestMatch(
  currentSessionId: string,
  currentMood: string | undefined,
  sessions: Map<string, SessionData>
): string | null {
  let bestMatch: string | null = null;
  let bestScore = 0;

  const currentCategory = currentMood ? moodToCategory[currentMood] : 'general';

  for (const [sessionId, data] of sessions) {
    if (sessionId === currentSessionId || data.user2) continue;

    const score = calculateCompatibility(currentMood || '', data.mood || '');

    // Add slight bonus for waiting time (longer wait = higher priority)
    const waitTime = Date.now() - data.joinedAt;
    const waitBonus = Math.min(waitTime / 30000, 0.2); // max 0.2 bonus after 30s

    const finalScore = score + waitBonus;

    if (finalScore > bestScore) {
      bestScore = finalScore;
      bestMatch = sessionId;
    }
  }

  return bestMatch;
}
