import { SpeakerStatus } from '../types/speaker';

const STATUS_PRIORITY: Record<SpeakerStatus, number> = {
  not_interviewed: 1,
  postponed: 2,
  failed: 3,
  completed: 4,
};

export function sortSpeakersByDefaultPriority<T extends { status: SpeakerStatus; originalIndex: number }>(
  speakers: T[]
): T[] {
  return [...speakers].sort((a, b) => {
    const priorityA = STATUS_PRIORITY[a.status] || 99;
    const priorityB = STATUS_PRIORITY[b.status] || 99;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // Preserve source order within identical status
    return a.originalIndex - b.originalIndex;
  });
}
