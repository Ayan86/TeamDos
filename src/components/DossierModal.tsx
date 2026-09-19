import React from 'react';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Calendar, 
  FileText, 
  Activity, 
  Thermometer, 
  Radio, 
  Eye, 
  Lock, 
  Download
} from 'lucide-react';
import { VaultCase } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface DossierModalProps {
  caseItem: VaultCase;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ caseItem, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black/75 backdrop-blur-xl border border-red-900/60 rounded-lg shadow-[0_0_50px_rgba(185,28,28,0.3)] my-auto overflow-hidden text-gray-200">
        
        {/* Top Classified Dossier Header Bar */}
        <div className="bg-black/60 border-b border-red-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-red-950/60 border border-red-800 text-red-500">
              <Lock size={16} />
            </div>
            <div>
              <span className="font-mono-tech text-[10px] tracking-[0.25em] text-red-500 font-bold uppercase block">
                DOS CLASSIFIED ARCHIVE // DOS-CASE-FILE
              </span>
              <span className="font-mono-tech text-xs tracking-wider text-gray-400">
                CASE ID: {caseItem.caseId}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-mono-tech text-xs px-2.5 py-1 rounded bg-red-900/40 text-red-300 border border-red-700/60 uppercase font-bold">
              {caseItem.status.replace('_', ' ')}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded bg-neutral-900 text-gray-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Title & Classified Stamp */}
          <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-800/80">
            <div>
              <div className="flex items-center space-x-4 text-xs font-mono-tech text-gray-400 mb-2">
                <span className="flex items-center space-x-1">
                  <MapPin size={13} className="text-red-500" />
                  <span>{caseItem.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar size={13} className="text-neutral-500" />
                  <span>{caseItem.date}</span>
                </span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-gray-100 tracking-wide">
                {caseItem.title}
              </h2>
            </div>

            {/* Stamp */}
            <div className="inline-block self-start border-2 border-red-600/80 text-red-600 font-mono-tech font-bold text-xs tracking-[0.3em] uppercase px-3 py-1.5 rounded rotate-[-4deg] shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              CLEARANCE: LEVEL {caseItem.clearanceLevel || 3}
            </div>
          </div>

          {/* Incident Summary */}
          <div>
            <h4 className="font-mono-tech text-xs tracking-widest text-red-500 uppercase font-semibold mb-2 flex items-center space-x-2">
              <FileText size={14} />
              <span>INCIDENT SUMMARY & FIELD BRIEF</span>
            </h4>
            <p className="text-sm leading-relaxed text-gray-300 bg-black/40 p-4 rounded border border-neutral-900 font-serif">
              {caseItem.summary}
            </p>
          </div>

          {/* Technical Sensor Measurements (Scientific Investigation) */}
          <div>
            <h4 className="font-mono-tech text-xs tracking-widest text-red-500 uppercase font-semibold mb-3 flex items-center space-x-2">
              <Activity size={14} />
              <span>TECHNICAL SENSOR METRICS & ANOMALIES</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0e0e14] border border-neutral-800 p-3 rounded flex items-center space-x-3">
                <div className="p-2 rounded bg-amber-950/40 text-amber-500 border border-amber-900/50">
                  <Activity size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech text-gray-400">PEAK EMF SPIKE</div>
                  <div className="text-sm font-mono-tech font-bold text-gray-100">14.8 mG</div>
                </div>
              </div>

              <div className="bg-[#0e0e14] border border-neutral-800 p-3 rounded flex items-center space-x-3">
                <div className="p-2 rounded bg-blue-950/40 text-blue-500 border border-blue-900/50">
                  <Thermometer size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech text-gray-400">TEMP COLD SPOT</div>
                  <div className="text-sm font-mono-tech font-bold text-gray-100">-8.4°C DROP</div>
                </div>
              </div>

              <div className="bg-[#0e0e14] border border-neutral-800 p-3 rounded flex items-center space-x-3">
                <div className="p-2 rounded bg-red-950/40 text-red-500 border border-red-900/50">
                  <Radio size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech text-gray-400">INFRASOUND DETECTED</div>
                  <div className="text-sm font-mono-tech font-bold text-gray-100">18.9 Hz</div>
                </div>
              </div>
            </div>
          </div>

          {/* EVP Audio Evidence Sample if available */}
          {caseItem.evidenceItems && caseItem.evidenceItems.some(e => e.type === 'audio') && (
            <div>
              <h4 className="font-mono-tech text-xs tracking-widest text-red-500 uppercase font-semibold mb-2 flex items-center space-x-2">
                <Radio size={14} />
                <span>ARCHIVED AUDIO EVIDENCE (EVP RECORDING)</span>
              </h4>
              <AudioPlayer
                title={`ARCHIVED EVP // ${caseItem.title}`}
                location={caseItem.location}
                timestamp={caseItem.date}
              />
            </div>
          )}

          {/* Evidence Attachments List */}
          {caseItem.evidenceItems && caseItem.evidenceItems.length > 0 && (
            <div>
              <h4 className="font-mono-tech text-xs tracking-widest text-red-500 uppercase font-semibold mb-2">
                EVIDENCE LOG ENTRIES ({caseItem.evidenceItems.length})
              </h4>
              <div className="space-y-2">
                {caseItem.evidenceItems.map((evidence, idx) => (
                  <div 
                    key={evidence.id || idx}
                    className="p-3 rounded bg-black/50 border border-neutral-800 flex items-start justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-gray-200 flex items-center space-x-2">
                        <span className="font-mono-tech text-red-400">[{evidence.type.toUpperCase()}]</span>
                        <span>{evidence.title}</span>
                      </div>
                      <div className="text-neutral-400 mt-1 text-[11px]">{evidence.description}</div>
                    </div>
                    {evidence.timestamp && (
                      <span className="font-mono-tech text-[10px] text-gray-500">
                        {evidence.timestamp}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conclusion */}
          {caseItem.conclusion && (
            <div className="p-4 rounded bg-red-950/20 border border-red-900/40">
              <h4 className="font-mono-tech text-xs tracking-widest text-red-400 uppercase font-semibold mb-1">
                LEAD INVESTIGATOR FINDINGS & SCIENTIFIC CONCLUSION
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed font-mono-tech">
                {caseItem.conclusion}
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#050507] border-t border-neutral-900 px-6 py-3 flex items-center justify-between text-[11px] font-mono-tech text-neutral-500">
          <span>DETECTIVES OF SUPERNATURAL // ARCHIVAL DIVISION</span>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white transition-colors"
          >
            <Download size={13} />
            <span>PRINT DOSSIER</span>
          </button>
        </div>

      </div>
    </div>
  );
};
