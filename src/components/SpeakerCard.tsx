import React from 'react';
import { Speaker, SpeakerStatus } from '../types/speaker';
import { AvatarPlaceholder } from './AvatarPlaceholder';
import { StatusBadge } from './StatusBadge';
import { ThreeDotMenu } from './ThreeDotMenu';
import { ChevronRight } from 'lucide-react';

interface SpeakerCardProps {
  speaker: Speaker;
  onSelectSpeaker: (speakerId: string) => void;
  onStatusChange: (speakerId: string, status: SpeakerStatus) => void;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
  onSelectSpeaker,
  onStatusChange
}) => {
  const handleClickCard = () => {
    onSelectSpeaker(speaker.id);
  };

  const handleKeyDownCard = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return; // Don't trigger if event bubbled from inner interactive controls
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectSpeaker(speaker.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClickCard}
      onKeyDown={handleKeyDownCard}
      aria-label={`View interview for ${speaker.name}`}
      className="group relative bg-[#151821] hover:bg-[#1a1e2a] border border-gray-800/80 hover:border-[#800020]/50 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#800020]/10 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
    >
      {/* Top Header: Status + Three Dot Menu */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <StatusBadge status={speaker.status} size="sm" />
        <ThreeDotMenu
          currentStatus={speaker.status}
          onStatusChange={(newStatus) => onStatusChange(speaker.id, newStatus)}
        />
      </div>

      {/* Avatar Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#0d0e12] border border-gray-800 group-hover:border-gray-700 transition-colors">
        <AvatarPlaceholder name={speaker.name} imagePath={speaker.avatar} className="w-full h-full text-2xl font-bold" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
          <span className="text-xs font-semibold text-white bg-[#800020] px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            View Interview <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Identity Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
            {speaker.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 min-h-[2rem]">
            {speaker.role}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-500">
          <span>{speaker.questions.length} Questions</span>
          <span className="group-hover:text-[#D4AF37] transition-colors">Rally 2026</span>
        </div>
      </div>
    </div>
  );
};
