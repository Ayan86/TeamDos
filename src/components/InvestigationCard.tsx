import React from 'react';
import { Calendar, MapPin, ShieldCheck, Clock, FileSearch, ArrowUpRight } from 'lucide-react';
import { Investigation, CaseStatus } from '../types';

interface InvestigationCardProps {
  investigation: Investigation;
  onSelect: (investigation: Investigation) => void;
}

export const getStatusColor = (status: CaseStatus) => {
  switch (status) {
    case 'OPEN':
      return 'text-amber-400 bg-amber-950/40 border-amber-600/50';
    case 'UNDER_INVESTIGATION':
      return 'text-red-400 bg-red-950/40 border-red-600/60 animate-pulse';
    case 'DOCUMENTED':
      return 'text-emerald-400 bg-emerald-950/40 border-emerald-600/50';
    case 'CLOSED':
      return 'text-blue-400 bg-blue-950/40 border-blue-600/50';
    case 'ARCHIVED':
      return 'text-neutral-400 bg-neutral-900 border-neutral-700';
    default:
      return 'text-gray-400 bg-gray-900 border-gray-700';
  }
};

export const InvestigationCard: React.FC<InvestigationCardProps> = ({ 
  investigation, 
  onSelect 
}) => {
  return (
    <div className="group relative bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-neutral-800/80 hover:border-red-600/60 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] flex flex-col">
      {/* Photograph with Dark Vignette */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
        <img
          src={investigation.heroImage}
          alt={investigation.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

        {/* Case Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-mono-tech tracking-wider uppercase font-bold border backdrop-blur-md ${getStatusColor(investigation.status)}`}>
            <span>{investigation.status.replace('_', ' ')}</span>
          </span>
        </div>

        {investigation.evidenceCount && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono-tech tracking-wider text-gray-300 bg-black/70 border border-neutral-700 backdrop-blur-md">
              <FileSearch size={11} className="text-red-400" />
              <span>{investigation.evidenceCount} FILES</span>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] font-mono-tech text-gray-400 mb-2.5">
            <span className="flex items-center space-x-1">
              <MapPin size={12} className="text-red-500" />
              <span>{investigation.location}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar size={12} className="text-neutral-500" />
              <span>{investigation.investigationDate}</span>
            </span>
          </div>

          <h4 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-gray-100 group-hover:text-red-300 transition-colors line-clamp-2">
            {investigation.title}
          </h4>

          <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
            {investigation.shortDescription}
          </p>
        </div>

        {/* Action Button: View Investigation */}
        <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between">
          <button
            onClick={() => onSelect(investigation)}
            className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 rounded bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-600/70 text-xs font-mono-tech tracking-widest text-gray-200 hover:text-red-300 uppercase transition-all duration-200"
          >
            <span>VIEW INVESTIGATION</span>
            <ArrowUpRight size={14} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
