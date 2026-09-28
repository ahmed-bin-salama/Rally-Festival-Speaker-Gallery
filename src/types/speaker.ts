export type SpeakerStatus = 'not_interviewed' | 'postponed' | 'failed' | 'completed';

export interface Question {
  id: number;
  question: string;
  responseNote: string; // Defaults to "تعقيب"
}

export interface Speaker {
  id: string; // e.g. "abdullah-amer"
  name: string;
  role: string;
  avatar: string;
  introduction: string;
  questions: Question[];
  status: SpeakerStatus;
  originalIndex: number;
}
