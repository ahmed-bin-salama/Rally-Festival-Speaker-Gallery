import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { SPEAKERS_METADATA } from './data/speakersMetadata';
import { loadSpeaker } from './data/loadSpeaker';
import { Speaker, SpeakerCardData, SpeakerStatus } from './types/speaker';
import { getSavedStatuses, saveSpeakerStatus } from './utils/storage';
import { sortSpeakersByDefaultPriority } from './utils/sorting';
import { GalleryHeader } from './components/GalleryHeader';
import { FilterBar, FilterOption } from './components/FilterBar';
import { SpeakerCard } from './components/SpeakerCard';
import { SpeakerPageLayout } from './components/SpeakerPageLayout';

const RandomInterviewPage = lazy(() =>
  import('./random-interview/RandomInterviewPage').then((m) => ({ default: m.RandomInterviewPage }))
);

type AppView = { type: 'gallery' } | { type: 'speaker'; speakerId: string } | { type: 'random-interview' };

function parseRoute(): AppView {
  const hash = window.location.hash;
  if (hash === '#random-interview' || hash === '#/random-interview') {
    return { type: 'random-interview' };
  }

  if (hash.startsWith('#speaker/') || hash.startsWith('#/speaker/')) {
    const rawId = hash.replace(/^#\/?speaker\//, '');
    try {
      const speakerId = decodeURIComponent(rawId);
      const speakerExists = SPEAKERS_METADATA.some((speaker) => speaker.id === speakerId);

      if (speakerId && speakerExists) {
        return { type: 'speaker', speakerId };
      }

      if (speakerId && !speakerExists) {
        console.warn(`Speaker not found: "${speakerId}". Defaulting to gallery.`);
      }
    } catch {
      console.warn('Invalid speaker route encoding. Defaulting to gallery.');
    }
  }

  return { type: 'gallery' };
}

export function App() {
  // Saved statuses map
  const [statuses, setStatuses] = useState<Record<string, SpeakerStatus>>(() => getSavedStatuses());

  // Filter option state
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Route state
  const [currentView, setCurrentView] = useState<AppView>(parseRoute);

  // Dynamic speaker detail state
  const [fullSpeaker, setFullSpeaker] = useState<Speaker | null>(null);
  const [isLoadingSpeaker, setIsLoadingSpeaker] = useState<boolean>(false);

  // Handle route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(parseRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Load full speaker data when currentView is speaker detail
  useEffect(() => {
    if (currentView.type === 'speaker') {
      setIsLoadingSpeaker(true);
      loadSpeaker(currentView.speakerId).then((sp) => {
        setFullSpeaker(sp);
        setIsLoadingSpeaker(false);
      });
    } else {
      setFullSpeaker(null);
      setIsLoadingSpeaker(false);
    }
  }, [currentView]);

  // Update status handler
  const handleStatusChange = useCallback((speakerId: string, newStatus: SpeakerStatus) => {
    const updated = saveSpeakerStatus(speakerId, newStatus);
    setStatuses(updated);
  }, []);

  // Navigate to speaker page
  const handleSelectSpeaker = useCallback((speakerId: string) => {
    window.location.hash = `speaker/${encodeURIComponent(speakerId)}`;
    setCurrentView({ type: 'speaker', speakerId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Open Random Interview Page
  const handleOpenRandomInterview = useCallback(() => {
    window.location.hash = 'random-interview';
    setCurrentView({ type: 'random-interview' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Back to gallery
  const handleBackToGallery = useCallback(() => {
    window.location.hash = '';
    setCurrentView({ type: 'gallery' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Map metadata speakers with their persistent statuses
  const speakersWithStatus: SpeakerCardData[] = useMemo(() => {
    return SPEAKERS_METADATA.map((sp) => ({
      ...sp,
      status: statuses[sp.id] || 'not_interviewed',
    }));
  }, [statuses]);

  // Priority sorted speakers (calculated only when in gallery view)
  const sortedSpeakers = useMemo(() => {
    if (currentView.type !== 'gallery') return speakersWithStatus;
    return sortSpeakersByDefaultPriority(speakersWithStatus);
  }, [speakersWithStatus, currentView.type]);

  // Counts for filter bar (calculated only when in gallery view)
  const filterCounts = useMemo(() => {
    const counts: Record<FilterOption, number> = {
      all: speakersWithStatus.length,
      not_interviewed: 0,
      postponed: 0,
      failed: 0,
      completed: 0,
    };

    if (currentView.type !== 'gallery') {
      return counts;
    }

    speakersWithStatus.forEach((sp) => {
      if (counts[sp.status] !== undefined) {
        counts[sp.status]++;
      }
    });
    return counts;
  }, [speakersWithStatus, currentView.type]);

  // Filtered speakers (calculated only when in gallery view)
  const displayedSpeakers = useMemo(() => {
    if (currentView.type !== 'gallery') return [];
    if (activeFilter === 'all') {
      return sortedSpeakers;
    }
    return sortedSpeakers.filter((sp) => sp.status === activeFilter);
  }, [sortedSpeakers, activeFilter, currentView.type]);

  // Selected speaker with updated status if in speaker view
  const selectedSpeaker = useMemo(() => {
    if (!fullSpeaker) return null;
    return {
      ...fullSpeaker,
      status: statuses[fullSpeaker.id] || fullSpeaker.status || 'not_interviewed',
    };
  }, [fullSpeaker, statuses]);

  // Render Random Interview Page
  if (currentView.type === 'random-interview') {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400 font-medium">Loading Random Interview Wheel...</p>
            </div>
          </div>
        }
      >
        <RandomInterviewPage onBackToGallery={handleBackToGallery} />
      </Suspense>
    );
  }

  // Render Speaker Page
  if (currentView.type === 'speaker') {
    if (isLoadingSpeaker || !selectedSpeaker) {
      return (
        <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-400 font-medium">Loading speaker details...</p>
          </div>
        </div>
      );
    }

    return (
      <SpeakerPageLayout
        speaker={selectedSpeaker}
        onBackToGallery={handleBackToGallery}
        onStatusChange={handleStatusChange}
      />
    );
  }

  // Render Gallery Index Page
  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col">
      <GalleryHeader onOpenRandomInterview={handleOpenRandomInterview} />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Controls Bar: Filters & Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11131a] p-4 rounded-2xl border border-gray-800">
          <div>
            <h2 className="text-sm font-semibold text-gray-300">
              Filter Speakers by Status
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Default priority: Unprocessed → Postponed → Failed → Completed
            </p>
          </div>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={filterCounts}
          />
        </div>

        {/* Gallery Grid: 6 columns on xl/2xl, scaling down to 1 column on mobile */}
        {displayedSpeakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
            {displayedSpeakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                onSelectSpeaker={handleSelectSpeaker}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#11131a] rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm font-medium">
              No speakers found matching the selected filter.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-xs text-[#D4AF37] hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#11131a] py-6 text-center text-xs text-gray-500">
        <p>Rally Speaker Interview Gallery • 18 Speakers • 2026</p>
      </footer>
    </div>
  );
}

export default App;
