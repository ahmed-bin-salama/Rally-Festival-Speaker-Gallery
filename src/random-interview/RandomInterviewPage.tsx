import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ALL_RANDOM_QUESTIONS,
  RANDOM_QUESTIONS_BY_ID,
  RandomQuestion,
} from './data';
import {
  loadPersistedState,
  savePersistedState,
  clearPersistedState,
} from './storage';
import { RandomInterviewWheel } from './components/RandomInterviewWheel';
import { QuestionCard } from './components/QuestionCard';

interface RandomInterviewPageProps {
  onBackToGallery: () => void;
}

export const RandomInterviewPage: React.FC<RandomInterviewPageProps> = ({ onBackToGallery }) => {
  // Loaded initial state from storage
  const [persistedState] = useState(() => loadPersistedState());

  const [drawnQuestionIds, setDrawnQuestionIds] = useState<string[]>(persistedState.drawnQuestionIds);
  const [spinHistory, setSpinHistory] = useState<string[]>(persistedState.spinHistory);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(persistedState.currentQuestionId);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState<boolean>(false);

  const spinTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync to localStorage whenever state changes
  useEffect(() => {
    savePersistedState({
      version: 1,
      drawnQuestionIds,
      spinHistory,
      currentQuestionId,
    });
  }, [drawnQuestionIds, spinHistory, currentQuestionId]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (spinTimerRef.current) {
        clearTimeout(spinTimerRef.current);
      }
    };
  }, []);

  // Compute available questions
  const drawnSet = useMemo(() => new Set(drawnQuestionIds), [drawnQuestionIds]);
  const availableQuestions = useMemo(() => {
    return ALL_RANDOM_QUESTIONS.filter((q) => !drawnSet.has(q.id));
  }, [drawnSet]);

  const isExhausted = availableQuestions.length === 0;
  const currentQuestion: RandomQuestion | null = currentQuestionId ? RANDOM_QUESTIONS_BY_ID[currentQuestionId] || null : null;

  // Spin Request Handler
  const handleSpinRequest = () => {
    if (isSpinning || isExhausted || availableQuestions.length === 0) {
      return;
    }

    // 1. Uniformly pick 1 available question candidate
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const candidate = availableQuestions[randomIndex];

    // 2. Determine candidate index (0 to 59)
    const candidateGlobalIndex = ALL_RANDOM_QUESTIONS.findIndex((q) => q.id === candidate.id);
    if (candidateGlobalIndex === -1) return;

    // 3. Calculate target rotation angle so candidate aligns with TOP pointer (-90° / 270°)
    const centerAngle = candidateGlobalIndex * 6 + 3;
    const targetBase = ((270 - centerAngle) % 360 + 360) % 360;
    const currentNorm = ((wheelRotation % 360) + 360) % 360;

    let forwardDelta = targetBase - currentNorm;
    if (forwardDelta <= 0) {
      forwardDelta += 360;
    }

    // Add 6 full 360-degree rotations for visual animation
    const nextTargetRotation = wheelRotation + forwardDelta + (6 * 360);

    setIsSpinning(true);
    setWheelRotation(nextTargetRotation);

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReducedMotion ? 300 : 4000;

    if (spinTimerRef.current) clearTimeout(spinTimerRef.current);

    spinTimerRef.current = setTimeout(() => {
      // Commit selection after animation completes
      setDrawnQuestionIds((prev) => Array.from(new Set([...prev, candidate.id])));
      setSpinHistory((prev) => [...prev, candidate.id]);
      setCurrentQuestionId(candidate.id);
      setIsSpinning(false);
    }, duration);
  };

  // Back One Step (Undo latest spin)
  const handleUndo = () => {
    if (isSpinning || spinHistory.length === 0) return;

    const lastId = spinHistory[spinHistory.length - 1];
    const newHistory = spinHistory.slice(0, -1);
    const newDrawn = drawnQuestionIds.filter((id) => id !== lastId);
    const newCurrentId = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;

    setSpinHistory(newHistory);
    setDrawnQuestionIds(newDrawn);
    setCurrentQuestionId(newCurrentId);
  };

  // Clear All Handler
  const handleConfirmClearAll = () => {
    if (isSpinning) return;

    setDrawnQuestionIds([]);
    setSpinHistory([]);
    setCurrentQuestionId(null);
    clearPersistedState();
    setShowClearConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col">
      {/* HEADER */}
      <header className="border-b border-gray-800/80 bg-[#0d0e12]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToGallery}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-[#D4AF37] transition-colors bg-[#141620] px-3.5 py-2 rounded-xl border border-gray-800 hover:border-[#D4AF37]/50 focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <svg className="w-4 h-4 dir-rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Speaker Gallery</span>
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 justify-center">
              <span className="text-[#D4AF37]">RALLY</span> RANDOM INTERVIEW WHEEL
            </h1>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Interactive 60-Question Thematic Wheel • Professional Interview Tool
            </p>
          </div>

          <div className="flex items-center gap-2">
            <img src="assets/rally-society-logo.png" alt="Rally Logo" className="h-7 w-auto object-contain hidden md:block" />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* TOP STATUS BAR & COUNTER */}
        <div className="bg-[#11131a] border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="text-center md:text-left">
            <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
              Interview Session Progress
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 dir-rtl">
              كل سؤال يظهر مرة واحدة فقط في الجلسة حتى يتم عمل Reset.
            </p>
          </div>

          {/* COUNTER BADGE */}
          <div className="flex items-center gap-3 bg-[#181a24] px-4 py-2 rounded-xl border border-[#D4AF37]/30">
            <span className="text-xs font-semibold text-gray-400">USED QUESTIONS:</span>
            <span className="text-base font-black text-[#D4AF37] tracking-wider">
              {drawnQuestionIds.length} / 60
            </span>
          </div>
        </div>

        {/* EXHAUSTED BANNER */}
        {isExhausted && (
          <div className="bg-[#1e1518] border border-rose-500/40 rounded-2xl p-4 text-center text-rose-200 text-sm font-semibold dir-rtl shadow-lg">
            All questions have been used. (تم استنفاذ جميع الأسئلة الـ60)
          </div>
        )}

        {/* MAIN LAYOUT GRID: WHEEL & QUESTION CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* WHEEL SECTION (LEFT/TOP) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#11131a] border border-gray-800 rounded-3xl p-4 sm:p-6 shadow-xl">
            <RandomInterviewWheel
              drawnQuestionIds={drawnQuestionIds}
              currentQuestionId={currentQuestionId}
              wheelRotation={wheelRotation}
              isSpinning={isSpinning}
              onSpinClick={handleSpinRequest}
              disabled={isSpinning || isExhausted}
            />

            {/* ACTION CONTROLS */}
            <div className="w-full max-w-md mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">

              {/* SPIN BUTTON */}
              <button
                onClick={handleSpinRequest}
                disabled={isSpinning || isExhausted}
                className={`w-full sm:flex-1 py-3 px-6 rounded-xl font-black text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isSpinning || isExhausted
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : 'bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-gray-950 hover:brightness-110 active:scale-[0.98] border border-[#FFF8DC]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}</span>
              </button>

              {/* BACK ONE STEP (UNDO) */}
              <button
                onClick={handleUndo}
                disabled={isSpinning || spinHistory.length === 0}
                className={`w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isSpinning || spinHistory.length === 0
                    ? 'bg-[#141620] text-gray-600 border-gray-800 cursor-not-allowed'
                    : 'bg-[#1a1d29] text-gray-200 hover:text-white hover:bg-[#222636] border-gray-700 active:scale-[0.98]'
                }`}
                title="Undo last spin"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>BACK ONE STEP</span>
              </button>

              {/* CLEAR ALL (RESET) */}
              <button
                onClick={() => setShowClearConfirmModal(true)}
                disabled={isSpinning || (drawnQuestionIds.length === 0 && spinHistory.length === 0)}
                className={`w-full sm:w-auto py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isSpinning || (drawnQuestionIds.length === 0 && spinHistory.length === 0)
                    ? 'bg-[#141620] text-gray-600 border-gray-800 cursor-not-allowed'
                    : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border-rose-800/60 active:scale-[0.98]'
                }`}
                title="Reset all questions"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>CLEAR ALL</span>
              </button>

            </div>
          </div>

          {/* QUESTION CARD & HISTORY SECTION (RIGHT/BOTTOM) */}
          <div className="lg:col-span-5 space-y-6">

            {/* CURRENT QUESTION CARD */}
            <div aria-live="polite" aria-atomic="true">
              <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                Selected Question
              </h2>
              <QuestionCard question={currentQuestion} />
            </div>

            {/* RECENT SESSION HISTORY LOG */}
            {spinHistory.length > 0 && (
              <div className="bg-[#11131a] border border-gray-800 rounded-2xl p-5 shadow-lg">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Session History ({spinHistory.length})</span>
                  <span className="text-[10px] text-gray-500 font-normal">Latest first</span>
                </h3>
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {[...spinHistory].reverse().map((id, index) => {
                    const q = RANDOM_QUESTIONS_BY_ID[id];
                    if (!q) return null;
                    const isLatest = index === 0 && id === currentQuestionId;

                    return (
                      <div
                        key={`${id}-${index}`}
                        className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between gap-3 ${
                          isLatest
                            ? 'bg-[#1a1d2b] border-[#D4AF37]/50 text-white'
                            : 'bg-[#141620] border-gray-800/80 text-gray-300'
                        }`}
                      >
                        <span className="font-bold text-[#D4AF37]">{q.id}</span>
                        <span className="flex-1 text-right truncate dir-rtl font-medium">
                          {q.wheelLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* CLEAR ALL CONFIRMATION MODAL */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#11131a] border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/80 text-rose-400 mx-auto flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">
              Clear all used questions?
            </h3>
            <p className="text-xs text-gray-400 dir-rtl">
              سيتم إعادة تعيين جميع الأسئلة المستعملة (0 / 60) وحذف السجل المضي. هل أنت تأكد؟
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirmModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClearAll}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-800/80 bg-[#11131a] py-4 text-center text-xs text-gray-500 mt-auto">
        <p>Rally Festival 2026 • Random Interview Wheel • 60 Canonical Questions</p>
      </footer>
    </div>
  );
};
