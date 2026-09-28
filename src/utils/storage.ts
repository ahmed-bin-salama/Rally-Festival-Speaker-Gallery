import { SpeakerStatus } from '../types/speaker';

const STORAGE_KEY = 'rally_speaker_statuses_v1';

export function getSavedStatuses(): Record<string, SpeakerStatus> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error('Failed to read speaker statuses from localStorage:', err);
    return {};
  }
}

export function saveSpeakerStatus(speakerId: string, status: SpeakerStatus): Record<string, SpeakerStatus> {
  try {
    const current = getSavedStatuses();
    const updated = { ...current, [speakerId]: status };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save speaker status to localStorage:', err);
    return getSavedStatuses();
  }
}

export function resetAllStatuses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset statuses:', err);
  }
}
