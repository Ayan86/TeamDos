import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Filter, 
  Radio, 
  FileText, 
  Camera, 
  Video, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle,
  FolderLock,
  Download,
  Eye
} from 'lucide-react';
import { VaultCase, CaseStatus } from '../types';
import { DossierModal } from '../components/DossierModal';
import { AudioPlayer } from '../components/AudioPlayer';
import { getStatusColor } from '../components/InvestigationCard';

interface VaultProps {
  cases: VaultCase[];
}

export const Vault: React.FC<VaultProps> = ({ cases }) => {
  const [selectedCase, setSelectedCase] = useState<VaultCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Case Files',
    'EVP / Audio Analysis',
    'Photographic Evidence',
    'Video Surveillance',
    'Historical Records'
  ];

  const statuses: { label: string; value: string }[] = [
    { label: 'All Statuses', value: 'ALL' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Under Investigation', value: 'UNDER_INVESTIGATION' },
    { label: 'Documented', value: 'DOCUMENTED' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'Archived', value: 'ARCHIVED' }
  ];

  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.summary || c.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Classified Archive Banner */}
        <div className="relative rounded-xl bg-black/40 backdrop-blur-md border border-red-900/60 p-6 sm:p-10 mb-10 overflow-hidden shadow-[0_0_40px_rgba(185,28,28,0.15)]">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <FolderLock size={280} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-2">
                <Lock size={14} />
                <span>DOS VAULT // CLASSIFIED ARCHIVE</span>
              </div>
              <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                THE DOS VAULT
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-gray-300 max-w-2xl font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Permanent evidentiary repository housing declassified case files, calibrated sensor logs, spectral audio recordings (EVP), and field investigation notes gathered across India since 2010.
              </p>
            </div>

            {/* Clearance Stamp Badge */}
            <div className="shrink-0 p-4 rounded bg-black/60 border border-red-800/80 text-center font-mono-tech backdrop-blur-sm">
              <div className="text-[10px] text-red-400 tracking-widest uppercase">REPOSITORY CLEARANCE</div>
              <div className="text-xl font-bold text-red-500 tracking-wider mt-0.5">LEVEL 03 PUBLIC</div>
              <div className="text-[9px] text-gray-400 mt-1">ENCRYPTION: AES-256</div>
            </div>
          </div>
        </div>

        {/* Featured Interactive Audio Evidence (EVP Player Bar) */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono-tech tracking-widest text-red-400 uppercase font-semibold mb-3">
            <Radio size={14} className="animate-pulse" />
            <span>DE-CLASSIFIED EVP AUDIO SAMPLE (SOUTH PARK STREET CEMETERY)</span>
          </div>
          <AudioPlayer
            title="EVP-REC // PHONIC WHISPER FREQUENCY CAPTURE"
            location="South Park Street Cemetery, Kolkata"
            timestamp="14 OCT 2023 - 02:44 AM"
          />
        </div>

        {/* Filter & Search Terminal Bar */}
        <div className="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-lg p-4 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search archive by Case ID, location, title, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-neutral-800 focus:border-red-600 rounded pl-10 pr-4 py-2.5 text-xs font-mono-tech text-gray-200 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-mono-tech text-gray-400 hidden sm:inline">STATUS:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black/60 border border-neutral-800 focus:border-red-600 rounded px-3 py-2.5 text-xs font-mono-tech text-gray-200 focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Case Files Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="group bg-black/40 backdrop-blur-md rounded-lg border border-neutral-800/80 hover:border-red-600/70 p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)]"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-tech text-xs tracking-widest text-red-400 font-bold bg-black/60 px-2.5 py-1 rounded border border-neutral-800">
                    {caseItem.caseId}
                  </span>
                  <span className={`text-[10px] font-mono-tech tracking-wider uppercase px-2 py-0.5 rounded border ${getStatusColor(caseItem.status)}`}>
                    {caseItem.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] font-mono-tech text-gray-400 mb-2">
                  <span className="flex items-center space-x-1">
                    <MapPin size={11} className="text-red-500" />
                    <span>{caseItem.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar size={11} className="text-neutral-500" />
                    <span>{caseItem.date}</span>
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-gray-100 group-hover:text-red-300 transition-colors line-clamp-2">
                  {caseItem.title}
                </h3>

                <p className="mt-3 text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans">
                  {caseItem.summary}
                </p>

                {/* Evidence tags */}
                {caseItem.evidenceItems && caseItem.evidenceItems.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {caseItem.evidenceItems.map((e, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-black text-[10px] font-mono-tech text-neutral-400 border border-neutral-800"
                      >
                        {e.type.toUpperCase()}: {e.title.slice(0, 16)}...
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
                <span className="text-[10px] font-mono-tech text-neutral-500">
                  CLEARANCE LVL {caseItem.clearanceLevel || 3}
                </span>

                <button
                  onClick={() => setSelectedCase(caseItem)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-xs font-mono-tech tracking-wider text-red-300 transition-colors"
                >
                  <Eye size={13} />
                  <span>OPEN DOSSIER</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-20 bg-black/40 rounded border border-neutral-900 font-mono-tech">
            <AlertTriangle size={32} className="text-amber-500 mx-auto mb-3" />
            <p className="text-gray-300 text-sm">NO CASE FILES MATCH SPECIFIED SEARCH PARAMETERS</p>
            <p className="text-xs text-neutral-500 mt-1">Try resetting search query or status filters.</p>
          </div>
        )}

      </div>

      {/* Dossier Modal View */}
      {selectedCase && (
        <DossierModal
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
};
