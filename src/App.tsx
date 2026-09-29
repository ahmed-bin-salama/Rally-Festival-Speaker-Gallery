import { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { SPEAKERS_METADATA } from './data/speakersMetadata';
import { loadSpeaker } from './data/loadSpeaker';
import { Speaker, SpeakerStatus } from './types/speaker';
import { getSavedStatuses, saveSpeakerStatus } from './utils/storage';
import { sortSpeakersByDefaultPriority } from './utils/sorting';
import { GalleryHeader } from './components/GalleryHeader';
import { FilterBar, FilterOption } from './components/FilterBar';
import { SpeakerCard } from './components/SpeakerCard';
import { SpeakerPageLayout } from './components/SpeakerPageLayout';

const RandomInterviewPage = lazy(() =>
  import('./random-interview/RandomInterviewPage').then((module) => ({
    default: module.RandomInterviewPage,
  }))
);

type AppView = { type: 'gallery' } | { type: 'speaker'; speakerId: string } | { type: 'random-interview' };

type GallerySpeaker = Pick<Speaker, 'id' | 'name' | 'role' | 'avatar' | 'status' | 'originalIndex'> & {
  questionCount: number;
};

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
  const [statuses, setStatuses] = useState<Record<string, SpeakerStatus>>(() => getSavedStatuses());
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [currentView, setCurrentView] = useState<AppView>(parseRoute);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

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

  useEffect(() => {
    if (currentView.type !== 'speaker') {
      setSelectedSpeaker(null);
      return;
    }

    let didCancel = false;
    loadSpeaker(currentView.speakerId).then((speaker) => {
      if (!didCancel) {
        setSelectedSpeaker(speaker ?? null);
      }
    });

    return () => {
      didCancel = true;
    };
  }, [currentView]);

  const handleStatusChange = (speakerId: string, newStatus: SpeakerStatus) => {
    const updated = saveSpeakerStatus(speakerId, newStatus);
    setStatuses(updated);

    setSelectedSpeaker((prev) => {
      if (!prev || prev.id !== speakerId) return prev;
      return { ...prev, status: newStatus };
    });
  };

  const handleSelectSpeaker = (speakerId: string) => {
    window.location.hash = `speaker/${encodeURIComponent(speakerId)}`;
    setCurrentView({ type: 'speaker', speakerId });
    setSelectedSpeaker(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRandomInterview = () => {
    window.location.hash = 'random-interview';
    setCurrentView({ type: 'random-interview' });
    setSelectedSpeaker(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGallery = () => {
    window.location.hash = '';
    setCurrentView({ type: 'gallery' });
    setSelectedSpeaker(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gallerySpeakers = useMemo<GallerySpeaker[]>(() => {
    return SPEAKERS_METADATA.map((sp) => ({
      id: sp.id,
      name: sp.name,
      role: sp.role,
      avatar: sp.avatar,
      status: statuses[sp.id] || 'not_interviewed',
      originalIndex: sp.originalIndex,
      questionCount: sp.questionCount,
    }));
  }, [statuses]);

  const sortedSpeakers = useMemo(() => {
    if (currentView.type !== 'gallery') return gallerySpeakers;
    return sortSpeakersByDefaultPriority(gallerySpeakers);
  }, [gallerySpeakers, currentView.type]);

  const filterCounts = useMemo(() => {
    if (currentView.type !== 'gallery') {
      return {
        all: gallerySpeakers.length,
        not_interviewed: 0,
        postponed: 0,
        failed: 0,
        completed: 0,
      } satisfies Record<FilterOption, number>;
    }

    const counts: Record<FilterOption, number> = {
      all: gallerySpeakers.length,
      not_interviewed: 0,
      postponed: 0,
      failed: 0,
      completed: 0,
    };

    gallerySpeakers.forEach((sp) => {
      if (counts[sp.status] !== undefined) {
        counts[sp.status]++;
      }
    });

    return counts;
  }, [gallerySpeakers, currentView.type]);

  const displayedSpeakers = useMemo(() => {
    if (currentView.type !== 'gallery') return [];
    if (activeFilter === 'all') return sortedSpeakers;
    return sortedSpeakers.filter((sp) => sp.status === activeFilter);
  }, [sortedSpeakers, activeFilter, currentView.type]);

  if (currentView.type === 'random-interview') {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex items-center justify-center">
            <p className="text-sm text-gray-300">Loading Random Interview...</p>
          </div>
        }
      >
        <RandomInterviewPage onBackToGallery={handleBackToGallery} />
      </Suspense>
    );
  }

  if (currentView.type === 'speaker') {
    if (!selectedSpeaker) {
      return (
        <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-300">Loading speaker profile...</p>
            <button
              type="button"
              onClick={handleBackToGallery}
              className="mt-4 text-xs text-[#D4AF37] hover:underline"
            >
              Back to Gallery
            </button>
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

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col">
      <GalleryHeader onOpenRandomInterview={handleOpenRandomInterview} />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#11131a] p-4 rounded-2xl border border-gray-800">
          <div>
            <h2 className="text-sm font-semibold text-gray-300">Filter Speakers by Status</h2>
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

      <footer className="border-t border-gray-800/80 bg-[#11131a] py-6 text-center text-xs text-gray-500">
        <p>Rally Speaker Interview Gallery • 18 Speakers • 2026</p>
      </footer>
    </div>
  );
}

export default App;
