import { RANDOM_QUESTIONS_BY_ID } from './data';

export const RANDOM_INTERVIEW_STORAGE_KEY = 'rally_random_interview_session';
export const CURRENT_STORAGE_VERSION = 1;

export interface PersistedRandomInterviewState {
  version: number;
  drawnQuestionIds: string[];
  spinHistory: string[];
  currentQuestionId: string | null;
}

export const INITIAL_STORAGE_STATE: PersistedRandomInterviewState = {
  version: CURRENT_STORAGE_VERSION,
  drawnQuestionIds: [],
  spinHistory: [],
  currentQuestionId: null,
};

/**
 * Safely load persisted state from localStorage.
 * Validates schema, version, and presence of valid canonical question IDs.
 */
export function loadPersistedState(): PersistedRandomInterviewState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { ...INITIAL_STORAGE_STATE };
  }

  try {
    const raw = window.localStorage.getItem(RANDOM_INTERVIEW_STORAGE_KEY);
    if (!raw) {
      return { ...INITIAL_STORAGE_STATE };
    }

    const parsed = JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      parsed.version !== CURRENT_STORAGE_VERSION ||
      !Array.isArray(parsed.drawnQuestionIds) ||
      !Array.isArray(parsed.spinHistory)
    ) {
      console.warn('Random Interview: Invalid or incompatible persisted state found, falling back to initial state.');
      return { ...INITIAL_STORAGE_STATE };
    }

    // Filter to valid canonical IDs only and remove duplicates
    const validDrawnIds: string[] = [];
    const drawnSet = new Set<string>();

    for (const id of parsed.drawnQuestionIds) {
      if (typeof id === 'string' && RANDOM_QUESTIONS_BY_ID[id] && !drawnSet.has(id)) {
        drawnSet.add(id);
        validDrawnIds.push(id);
      }
    }

    const validHistory: string[] = [];
    for (const id of parsed.spinHistory) {
      if (typeof id === 'string' && RANDOM_QUESTIONS_BY_ID[id] && drawnSet.has(id)) {
        validHistory.push(id);
      }
    }

    let currentId: string | null = null;
    if (
      typeof parsed.currentQuestionId === 'string' &&
      RANDOM_QUESTIONS_BY_ID[parsed.currentQuestionId] &&
      drawnSet.has(parsed.currentQuestionId)
    ) {
      currentId = parsed.currentQuestionId;
    } else if (validHistory.length > 0) {
      currentId = validHistory[validHistory.length - 1];
    }

    return {
      version: CURRENT_STORAGE_VERSION,
      drawnQuestionIds: validDrawnIds,
      spinHistory: validHistory,
      currentQuestionId: currentId,
    };
  } catch (err) {
    console.error('Random Interview: Failed to load storage state', err);
    return { ...INITIAL_STORAGE_STATE };
  }
}

/**
 * Safely persist state to localStorage.
 */
export function savePersistedState(state: PersistedRandomInterviewState): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    const payload: PersistedRandomInterviewState = {
      version: CURRENT_STORAGE_VERSION,
      drawnQuestionIds: Array.from(new Set(state.drawnQuestionIds)),
      spinHistory: [...state.spinHistory],
      currentQuestionId: state.currentQuestionId,
    };
    window.localStorage.setItem(RANDOM_INTERVIEW_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Random Interview: Failed to save storage state', err);
  }
}

/**
 * Clear persisted state.
 */
export function clearPersistedState(): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.removeItem(RANDOM_INTERVIEW_STORAGE_KEY);
  } catch (err) {
    console.error('Random Interview: Failed to clear storage state', err);
  }
}
