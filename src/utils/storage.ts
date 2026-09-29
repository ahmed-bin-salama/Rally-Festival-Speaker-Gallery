import { SpeakerStatus } from '../types/speaker';

const STORAGE_KEY = 'rally_speaker_statuses_v1';
const VALID_STATUSES: Set<SpeakerStatus> = new Set([
  'not_interviewed',
  'postponed',
  'failed',
  'completed',
]);

function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__rally_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getSavedStatuses(): Record<string, SpeakerStatus> {
  if (!isLocalStorageAvailable()) {
    return {};
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      console.warn('Storage: Corrupted speaker statuses found in localStorage, resetting.');
      return {};
    }

    const validated: Record<string, SpeakerStatus> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string' && VALID_STATUSES.has(value as SpeakerStatus)) {
        validated[key] = value as SpeakerStatus;
      }
    }

    return validated;
  } catch (err) {
    console.warn('Storage: Failed to read speaker statuses from localStorage:', err);
    return {};
  }
}

export function saveSpeakerStatus(speakerId: string, status: SpeakerStatus): Record<string, SpeakerStatus> {
  const current = getSavedStatuses();
  const updated = { ...current, [speakerId]: status };

  if (!isLocalStorageAvailable()) {
    console.warn('Storage: localStorage is unavailable, keeping updated status in session memory only.');
    return updated;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Storage: Failed to save speaker status to localStorage (quota or restriction):', err);
  }

  return updated;
}

export function resetAllStatuses(): void {
  if (!isLocalStorageAvailable()) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Storage: Failed to reset statuses in localStorage:', err);
  }
}
