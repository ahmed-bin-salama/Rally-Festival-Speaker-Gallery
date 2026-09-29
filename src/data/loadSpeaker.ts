import { Speaker } from '../types/speaker';

// Cache for loaded speakers to avoid re-importing
const speakerCache: Map<string, Speaker> = new Map();

/**
 * Lazily load a full speaker record (with all 10 interview questions)
 * Only call this when navigating to a speaker detail page
 * Uses dynamic import to defer speakersData.ts parsing
 * 
 * @param speakerId - The speaker ID to load
 * @returns Promise resolving to the full Speaker object
 */
export async function loadSpeaker(speakerId: string): Promise<Speaker | null> {
  // Check cache first
  if (speakerCache.has(speakerId)) {
    return speakerCache.get(speakerId) || null;
  }

  try {
    // Dynamic import: only loaded when first called
    // Bundler splits this into a separate chunk
    const { SPEAKERS_DATA } = await import('./speakersData');
    
    // Find speaker in full dataset
    const speaker = SPEAKERS_DATA.find((s) => s.id === speakerId);
    
    if (speaker) {
      // Cache for subsequent calls
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
 * @param speakerIds - Array of speaker IDs to preload
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
