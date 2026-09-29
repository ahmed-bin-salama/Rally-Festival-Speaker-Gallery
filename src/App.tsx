import { useState, useEffect, useMemo } from 'react';
import { SPEAKERS_DATA } from './data/speakersData';
import { Speaker, SpeakerStatus } from './types/speaker';
import { getSavedStatuses, saveSpeakerStatus } from './utils/storage';
import { sortSpeakersByDefaultPriority } from './utils/sorting';
import { GalleryHeader } from './components/GalleryHeader';
import { FilterBar, FilterOption } from './components/FilterBar';
import { SpeakerCard } from './components/SpeakerCard';
import { SpeakerPageLayout } from './components/SpeakerPageLayout';
import { RandomInterviewPage } from './random-interview/RandomInterviewPage';

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
      const speakerExists = SPEAKERS_DATA.some((speaker) => speaker.id === speakerId);

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

  // Update status handler
  const handleStatusChange = (speakerId: string, newStatus: SpeakerStatus) => {
    const updated = saveSpeakerStatus(speakerId, newStatus);
    setStatuses(updated);
  };

  // Navigate to speaker page
  const handleSelectSpeaker = (speakerId: string) => {
    window.location.hash = `speaker/${encodeURIComponent(speakerId)}`;
    setCurrentView({ type: 'speaker', speakerId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Random Interview Page
  const handleOpenRandomInterview = () => {
    window.location.hash = 'random-interview';
    setCurrentView({ type: 'random-interview' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to gallery
  const handleBackToGallery = () => {
    window.location.hash = '';
    setCurrentView({ type: 'gallery' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map speakers with their persistent statuses
  const speakersWithStatus: Speaker[] = useMemo(() => {
    return SPEAKERS_DATA.map((sp) => ({
      ...sp,
      status: statuses[sp.id] || 'not_interviewed',
    }));
  }, [statuses]);

  // Priority sorted speakers
  const sortedSpeakers = useMemo(() => {
    return sortSpeakersByDefaultPriority(speakersWithStatus);
  }, [speakersWithStatus]);

  // Counts for filter bar
  const filterCounts = useMemo(() => {
    const counts: Record<FilterOption, number> = {
      all: speakersWithStatus.length,
      not_interviewed: 0,
      postponed: 0,
      failed: 0,
      completed: 0,
    };
    speakersWithStatus.forEach((sp) => {
      if (counts[sp.status] !== undefined) {
        counts[sp.status]++;
      }
    });
    return counts;
  }, [speakersWithStatus]);

  // Filtered speakers
  const displayedSpeakers = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedSpeakers;
    }
    return sortedSpeakers.filter((sp) => sp.status === activeFilter);
  }, [sortedSpeakers, activeFilter]);

  // Selected speaker object if in speaker view
  const selectedSpeaker = useMemo(() => {
    if (currentView.type !== 'speaker') return null;
    return speakersWithStatus.find((sp) => sp.id === currentView.speakerId) || null;
  }, [speakersWithStatus, currentView]);

  // Render Random Interview Page
  if (currentView.type === 'random-interview') {
    return <RandomInterviewPage onBackToGallery={handleBackToGallery} />;
  }

  // Render Speaker Page
  if (selectedSpeaker) {
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
