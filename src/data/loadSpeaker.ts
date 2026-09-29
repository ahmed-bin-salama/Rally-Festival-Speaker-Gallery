import { Speaker } from '../types/speaker';

const speakerCache: Map<string, Speaker> = new Map();

/**
 * Lazily load a full speaker record (with all 10 interview questions)
 * Only call this when navigating to a speaker detail page.
 * Uses dynamic import to defer speakersData.ts parsing.
 */
export async function loadSpeaker(speakerId: string): Promise<Speaker | null> {
  if (speakerCache.has(speakerId)) {
    return speakerCache.get(speakerId) || null;
  }

  try {
    const { SPEAKERS_DATA } = await import('./speakersData');
    const speaker = SPEAKERS_DATA.find((s) => s.id === speakerId);

    if (speaker) {
      speakerCache.set(speakerId, speaker);
      return speaker;
    }

    console.warn(`Speaker not found: "${speakerId}"`);
    return null;
  } catch (error) {
    console.error(`Failed to load speaker "${speakerId}":`, error);
    return null;
  }
}

/**
 * Preload multiple speakers (useful for prefetching)
 */
export async function preloadSpeakers(speakerIds: string[]): Promise<void> {
  try {
    const { SPEAKERS_DATA } = await import('./speakersData');

    speakerIds.forEach((id) => {
      const speaker = SPEAKERS_DATA.find((s) => s.id === id);
      if (speaker && !speakerCache.has(id)) {
        speakerCache.set(id, speaker);
      }
    });
  } catch (error) {
    console.error('Failed to preload speakers:', error);
  }
}

/**
 * Clear the speaker cache (useful for testing or memory management)
 */
export function clearSpeakerCache(): void {
  speakerCache.clear();
}
