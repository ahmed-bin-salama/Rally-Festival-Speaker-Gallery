import React from 'react';
import { Speaker, SpeakerStatus } from '../types/speaker';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { StatusBadge } from './StatusBadge';
import { ThreeDotMenu } from './ThreeDotMenu';
import { QuestionCard } from './QuestionCard';
import { ArrowLeft, BookOpen, UserCheck, Sparkles } from 'lucide-react';

interface SpeakerPageLayoutProps {
  speaker: Speaker;
  onBackToGallery: () => void;
  onStatusChange: (speakerId: string, newStatus: SpeakerStatus) => void;
}

export const SpeakerPageLayout: React.FC<SpeakerPageLayoutProps> = ({
  speaker,
  onBackToGallery,
  onStatusChange,
}) => {
  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col">
      {/* Top Rally Header & Back Navigation */}
      <header className="border-b border-gray-800/80 bg-[#11131a]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToGallery}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-colors border border-gray-700/60 focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Gallery</span>
          </button>

          {/* Rally Logos */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/rally-egypt.png"
              alt="Rally Egypt Logo"
              className="h-8 w-auto object-contain"
            />
            <div className="h-4 w-px bg-gray-800" />
            <img
              src="/assets/rally-society-logo.png"
              alt="Rally Society Logo"
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Speaker Content Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* COMPACT PROFILE SECTION */}
        {/* Desktop: Avatar Left / Info Right; Mobile: Avatar Stacked Above Info */}
        <div className="bg-[#151821] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#800020]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
            {/* Left: Avatar Image Area */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-[#800020]/50 shadow-xl bg-[#0d0e12]">
              <AvatarPlaceholder name={speaker.name} imagePath={speaker.avatar} className="w-full h-full text-3xl font-black" />
            </div>

            {/* Right: Speaker Identity & Experience */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {speaker.name}
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-[#D4AF37] mt-1">
                    {speaker.role}
                  </p>
                </div>

                {/* Status & Control Menu */}
                <div className="flex items-center gap-3 bg-[#0d0e12]/80 px-3 py-1.5 rounded-2xl border border-gray-800">
                  <StatusBadge status={speaker.status} size="md" />
                  <ThreeDotMenu
                    currentStatus={speaker.status}
                    onStatusChange={(newStatus) => onStatusChange(speaker.id, newStatus)}
                  />
                </div>
              </div>

              {/* Speaker Metadata Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800/80 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/60 text-gray-300 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Speaker
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/60 text-gray-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  10 Structured Questions
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-800/60 text-gray-300 font-medium">
                  Rally Festival 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STANDALONE INTRODUCTION SECTION */}
        {/* Appears AFTER profile and BEFORE Question 01. Not numbered as a question. */}
        <section className="bg-gradient-to-r from-[#1c1218] via-[#151821] to-[#151821] border border-[#800020]/40 rounded-2xl p-6 sm:p-7 shadow-lg relative">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
            <BookOpen className="w-4 h-4 text-[#800020]" />
            <span>افتتاحية المقابلة / Interview Introduction</span>
          </div>

          <div
            dir="rtl"
            className="text-base sm:text-lg font-medium text-gray-200 leading-relaxed font-sans pr-2 border-r-2 border-[#D4AF37]"
          >
            {speaker.introduction}
          </div>
        </section>

        {/* 10 QUESTION CONTAINERS IN VERTICAL SEQUENCE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#800020]" />
              Interview Questions
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              10 Questions Total
            </span>
          </div>

          <div className="space-y-6">
            {speaker.questions.map((q) => (
              <QuestionCard key={q.id} question={q} speakerId={speaker.id} />
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#11131a] py-6 mt-12 text-center text-xs text-gray-500">
        <p>Rally Speaker Interview Gallery • 2026</p>
      </footer>
    </div>
  );
};
