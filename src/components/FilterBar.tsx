import React from 'react';
import { SpeakerStatus } from '../types/speaker';

export type FilterOption = 'all' | SpeakerStatus;

interface FilterBarProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  counts: Record<FilterOption, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  counts,
}) => {
  const options: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'not_interviewed', label: 'Not Interviewed' },
    { id: 'postponed', label: 'Postponed' },
    { id: 'failed', label: 'Failed' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 bg-[#151821] p-1.5 rounded-xl border border-gray-800">
      {options.map((option) => {
        const isActive = activeFilter === option.id;
        const count = counts[option.id] || 0;

        return (
          <button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/20 font-semibold'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            <span>{option.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
