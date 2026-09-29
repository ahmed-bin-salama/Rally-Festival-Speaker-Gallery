export type SpeakerStatus = 'not_interviewed' | 'postponed' | 'failed' | 'completed';

export interface Question {
  id: number;
  question: string;
  responseNote: string; // Defaults to "تعقيب"
}

export interface SpeakerCardData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  questionCount?: number;
  originalIndex: number;
  status: SpeakerStatus;
}

export interface Speaker extends SpeakerCardData {
  introduction: string;
  questions: Question[];
}
