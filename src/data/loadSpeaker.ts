import { Speaker } from '../types/speaker';

let cachedSpeakers: Speaker[] | null = null;

export async function loadSpeaker(speakerId: string): Promise<Speaker | null> {
  if (!cachedSpeakers) {
    const { SPEAKERS_DATA } = await import('./speakersData');
    cachedSpeakers = SPEAKERS_DATA;
  }
  return cachedSpeakers.find((sp) => sp.id === speakerId) || null;
}

export async function loadAllSpeakers(): Promise<Speaker[]> {
  if (!cachedSpeakers) {
    const { SPEAKERS_DATA } = await import('./speakersData');
    cachedSpeakers = SPEAKERS_DATA;
  }
  return cachedSpeakers;
}
