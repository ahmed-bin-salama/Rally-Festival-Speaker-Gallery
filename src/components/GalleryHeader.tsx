import React from 'react';

interface GalleryHeaderProps {
  onOpenRandomInterview?: () => void;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({ onOpenRandomInterview }) => {
  return (
    <header className="border-b border-gray-800/80 bg-[#0d0e12]/90 backdrop-blur sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Rally Brand Logos */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="./assets/rally-egypt.png"
              alt="Rally Egypt Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="h-6 w-px bg-gray-800" />
            <img
              src="./assets/rally-society-logo.png"
              alt="Rally Society Logo"
              className="h-9 w-auto object-contain brightness-110"
            />
          </div>
        </div>

        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {onOpenRandomInterview && (
            <button
              onClick={onOpenRandomInterview}
              className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-gray-950 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] px-4 py-2 rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all border border-[#FFF8DC]"
            >
              <svg className="w-4 h-4 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Random Interview Wheel</span>
            </button>
          )}

          <div className="text-center md:text-right">
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2 justify-center md:justify-end">
              <span className="text-[#D4AF37]">RALLY</span> SPEAKER INTERVIEW GALLERY
            </h1>
            <p className="text-xs text-gray-400">
              Rally Festival 2026 • Speaker Archive & Interview Guide
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
