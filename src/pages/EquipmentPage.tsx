import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Radio, 
  Camera, 
  Thermometer, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Zap,
  Gauge
} from 'lucide-react';
import { EquipmentItem } from '../types';

interface EquipmentPageProps {
  equipment: EquipmentItem[];
}

export const EquipmentPage: React.FC<EquipmentPageProps> = ({ equipment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Equipment' },
    { id: 'Detection', label: 'Detection' },
    { id: 'Audio', label: 'Audio Forensics' },
    { id: 'Video', label: 'Video Surveillance' },
    { id: 'Environmental', label: 'Environmental Sensors' },
    { id: 'Tools', label: 'Investigation Tools' }
  ];

  const filteredEquipment = selectedCategory === 'ALL'
    ? equipment
    : equipment.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <Cpu size={14} />
            <span>SCIENTIFIC ARSENAL & CALIBRATED HARDWARE</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase">
            INVESTIGATION EQUIPMENT
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            Paranormal anomalies require rigorous quantitative validation. Discover the multi-spectrum sensors, thermal optics, infrasound detectors, and calibrated electromagnetic hardware deployed during DOS field operations.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-mono-tech tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500'
                    : 'bg-black/40 backdrop-blur-sm text-gray-300 border border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="group bg-black/40 backdrop-blur-md rounded-lg border border-neutral-800/80 hover:border-red-600/70 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)]"
            >
              {/* Photo & Status */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-115 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

                {/* Status indicator */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono-tech uppercase font-bold border backdrop-blur-md ${
                    item.status === 'Active'
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
                      : item.status === 'Calibrating'
                      ? 'bg-amber-950/60 text-amber-400 border-amber-700/60'
                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-700'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-tech text-red-400 border border-neutral-800">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-gray-100 group-hover:text-red-300 transition-colors">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Detection Methodology */}
                  <div className="mt-4 p-3 rounded bg-black/50 border border-neutral-900">
                    <span className="font-mono-tech text-[10px] text-red-400 uppercase font-bold block mb-1">
                      DETECTION METHODOLOGY
                    </span>
                    <p className="text-[11px] text-gray-300 font-mono-tech leading-snug">
                      {item.methodology}
                    </p>
                  </div>
                </div>

                {/* Technical Specs key-values */}
                {item.specifications && Object.keys(item.specifications).length > 0 && (
                  <div className="mt-4 pt-3 border-t border-neutral-900/80 space-y-1.5 font-mono-tech text-[11px]">
                    {Object.entries(item.specifications).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between text-neutral-400">
                        <span className="uppercase text-[10px] text-neutral-500">{key}:</span>
                        <span className="text-gray-200 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
