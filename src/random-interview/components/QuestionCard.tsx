import React from 'react';
import { RandomQuestion, RANDOM_SEGMENTS_BY_ID } from '../data';

interface QuestionCardProps {
  question: RandomQuestion | null;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  if (!question) {
    return (
      <div className="bg-[#11131a] border border-gray-800/80 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[200px] shadow-lg">
        <div className="w-12 h-12 rounded-full bg-[#181a24] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-200">
          Ready to Start the Interview
        </h3>
        <p dir="auto" className="text-xs text-gray-400 mt-1 max-w-md [unicode-bidi:isolate]">
          اضغط على زر Spin لبدء القرعة العشوائية واختيار سؤال من بين 60 سؤالاً مقسمة على 6 محاور.
        </p>
      </div>
    );
  }

  const segment = RANDOM_SEGMENTS_BY_ID[question.segmentId];

  return (
    <div className="bg-[#11131a] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Golden Accent Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A6D1C] via-[#D4AF37] to-[#8A6D1C]" />

      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-800">
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-[#1c1e29] text-[#D4AF37] border border-[#D4AF37]/30 tracking-wider">
          {question.id}
        </span>
        {segment && (
          <span className="text-xs font-semibold text-gray-300 bg-gray-800/60 px-3 py-1 rounded-md">
            {segment.name}
          </span>
        )}
      </div>

      {/* Main Full Original Question */}
      <div dir="auto" className="my-4 text-right [unicode-bidi:isolate]">
        <p className="text-lg sm:text-xl md:text-2xl font-black text-white leading-relaxed tracking-wide">
          {question.originalQuestion}
        </p>
      </div>

      {/* Segment Description Context Footer */}
      {segment && (
        <div dir="auto" className="mt-6 pt-4 border-t border-gray-800/80 text-right [unicode-bidi:isolate]">
          <p className="text-xs text-gray-400 leading-normal">
            <span className="font-semibold text-gray-300">سياق المحور: </span>
            {segment.description}
          </p>
        </div>
      )}
    </div>
  );
};
