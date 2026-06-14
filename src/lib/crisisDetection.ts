// Enhanced Crisis Keyword Detection for SoulSpace
// Safety-first system for mental health peer support

const highRiskPatterns = [
  // Direct suicide/self-harm
  'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'self harm', 'cut myself', 'hurt myself', 'overdose', 'hang myself',
  'no reason to live', 'can\'t go on', 'ending it all', 'i want to die',
  'planning to kill', 'going to end it', 'take my life', 'not worth living',
  'i\'m going to hurt myself', 'i have pills', 'rope around my neck'
];

const mediumRiskPatterns = [
  'depressed', 'hopeless', 'worthless', 'alone', 'lonely',
  'anxious', 'panic attack', 'scared', 'overwhelmed', 'numb',
  'can\'t cope', 'giving up', 'tired of living', 'feel empty',
  'no point', 'hate myself', 'want to disappear', 'can\'t take it anymore',
  'everything is pointless', 'i feel nothing', 'tired of everything'
];

// Simple context phrases
const crisisPhrases = [
  'i want to kill myself',
  'thinking about suicide',
  'planning to end my life',
  'i don\'t want to be here anymore',
  'i feel like dying',
];

export function detectCrisis(text: string): { 
  level: 'none' | 'medium' | 'high'; 
  keywords: string[];
  matchedPhrases: string[];
} {
  const lowerText = text.toLowerCase().trim();
  const foundKeywords: string[] = [];
  const matchedPhrases: string[] = [];

  // Check exact phrases first (higher confidence)
  for (const phrase of crisisPhrases) {
    if (lowerText.includes(phrase)) {
      matchedPhrases.push(phrase);
      return { level: 'high', keywords: [], matchedPhrases };
    }
  }

  // Check high risk keywords
  for (const keyword of highRiskPatterns) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
      return { level: 'high', keywords: foundKeywords, matchedPhrases: [] };
    }
  }

  // Check medium risk
  for (const keyword of mediumRiskPatterns) {
    if (lowerText.includes(keyword)) {
      foundKeywords.push(keyword);
    }
  }

  if (foundKeywords.length > 0) {
    return { level: 'medium', keywords: foundKeywords, matchedPhrases: [] };
  }

  return { level: 'none', keywords: [], matchedPhrases: [] };
}

export const crisisResources = {
  high: {
    title: "You're not alone right now",
    message: "It sounds like you're going through something extremely difficult. Please reach out for immediate professional help.",
    actions: [
      "🇺🇸 Call or text 988 (Suicide & Crisis Lifeline)",
      "🌍 Visit https://www.iasp.info/ for local resources worldwide",
      "Talk to a trusted friend, family member, or go to the nearest emergency room",
      "You matter. Help is available 24/7."
    ]
  },
  medium: {
    title: "It’s okay to feel this way",
    message: "Reaching out is a brave step. Here are some resources that can help you right now.",
    actions: [
      "Talk to a trained listener at 7 Cups or Befrienders",
      "Consider speaking with a mental health professional",
      "Visit https://www.iasp.info/ for localized support",
      "You are not alone in this."
    ]
  }
};
