import React, { useState } from 'react';
import { Question } from '../types/speaker';
import { MessageSquareText } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  speakerId: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, speakerId }) => {
  // Key for local note persistence if interviewer edits the note
  const storageKey = `rally_note_${speakerId}_q${question.id}`;
  const [noteText, setNoteText] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKey) || question.responseNote;
    } catch {
      return question.responseNote;
    }
  });

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteText(val);
    try {
      localStorage.setItem(storageKey, val);
    } catch {
      // Ignore storage errors
    }
  };

  const formattedNum = String(question.id).padStart(2, '0');

  return (
    <div className="bg-[#151821] border border-gray-800 hover:border-gray-700/80 rounded-2xl p-5 sm:p-6 shadow-xl transition-all">
      {/* Question Number & Label */}
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#800020]/20 text-[#D4AF37] font-black text-sm border border-[#800020]/40">
          {formattedNum}
        </span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Question {formattedNum}
        </span>
      </div>

      {/* Untouched Source Question Text (supports RTL Arabic seamlessly) */}
      <div
        dir="rtl"
        className="text-base sm:text-lg font-medium text-gray-100 leading-relaxed font-sans border-r-2 border-[#800020] pr-4 py-1 my-3 bg-[#11131a]/50 rounded-l-lg"
      >
        {question.question}
      </div>

      {/* Response / Note Area with تعقيب */}
      <div className="mt-4 pt-4 border-t border-gray-800/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-medium text-gray-400">
          <MessageSquareText className="w-4 h-4 text-[#D4AF37]" />
          <span>ملاحظات وملاحظات التعقيب / Interviewer Notes</span>
        </div>

        <textarea
          dir="rtl"
          value={noteText}
          onChange={handleNoteChange}
          placeholder="تعقيب..."
          rows={2}
          className="w-full bg-[#0d0e12] text-gray-200 border border-gray-800 rounded-xl p-3 text-sm focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-colors resize-y min-h-[70px] leading-relaxed"
        />
      </div>
    </div>
  );
};
