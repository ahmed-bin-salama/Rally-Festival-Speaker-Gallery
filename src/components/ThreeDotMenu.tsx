import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';
import { SpeakerStatus } from '../types/speaker';

interface ThreeDotMenuProps {
  currentStatus: SpeakerStatus;
  onStatusChange: (status: SpeakerStatus) => void;
}

export const ThreeDotMenu: React.FC<ThreeDotMenuProps> = ({ currentStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (e: React.MouseEvent, status: SpeakerStatus) => {
    e.stopPropagation(); // Stop card click navigation
    onStatusChange(status);
    setIsOpen(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop card click navigation
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative inline-block text-left z-20" ref={menuRef}>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Speaker options menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#800020] focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Status options"
          className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1a1d26] border border-gray-800 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800/80">
            Change Status
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={(e) => handleSelect(e, 'completed')}
            className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 transition-colors ${
              currentStatus === 'completed'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Interview Completed
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={(e) => handleSelect(e, 'postponed')}
            className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 transition-colors ${
              currentStatus === 'postponed'
                ? 'bg-amber-500/20 text-amber-300 font-semibold'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            Interview Postponed
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={(e) => handleSelect(e, 'failed')}
            className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 transition-colors ${
              currentStatus === 'failed'
                ? 'bg-rose-500/20 text-rose-300 font-semibold'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            Interview Failed
          </button>

          {currentStatus !== 'not_interviewed' && (
            <button
              type="button"
              role="menuitem"
              onClick={(e) => handleSelect(e, 'not_interviewed')}
              className="w-full text-left px-3.5 py-2.5 text-xs flex items-center gap-2.5 text-gray-400 hover:bg-white/5 hover:text-gray-200 border-t border-gray-800/80 mt-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              Reset to Not Interviewed
            </button>
          )}
        </div>
      )}
    </div>
  );
};
