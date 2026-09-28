import React from 'react';
import { SpeakerStatus } from '../types/speaker';
import { CheckCircle2, Clock, XCircle, Circle } from 'lucide-react';

interface StatusBadgeProps {
  status: SpeakerStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  switch (status) {
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'}`}>
          <CheckCircle2 className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          Completed
        </span>
      );
    case 'postponed':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'}`}>
          <Clock className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          Postponed
        </span>
      );
    case 'failed':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'}`}>
          <XCircle className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          Failed
        </span>
      );
    case 'not_interviewed':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'}`}>
          <Circle className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
          Not Interviewed
        </span>
      );
  }
};
