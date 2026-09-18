import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Radio, Activity } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  location?: string;
  timestamp?: string;
  audioUrl?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  location,
  timestamp
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enhancedFilter, setEnhancedFilter] = useState(true);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="bg-black/40 backdrop-blur-md border border-red-950/80 rounded-lg p-4 font-mono-tech select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2 mb-3">
        <div className="flex items-center space-x-2">
          <Radio size={14} className="text-red-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-200 uppercase tracking-wider truncate max-w-[200px] sm:max-w-xs">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-gray-400">
          {timestamp && <span>{timestamp}</span>}
          <span className="px-1.5 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-900/60">
            EVP TAPE
          </span>
        </div>
      </div>

      {/* Simulated Waveform Visualizer */}
      <div className="h-14 bg-black/60 rounded border border-neutral-900 flex items-center justify-between px-2 py-1 gap-[2px] overflow-hidden">
        {Array.from({ length: 42 }).map((_, i) => {
          const isPassed = (i / 42) * 100 <= progress;
          // Generate pseudo random heights
          const baseHeight = ((Math.sin(i * 0.4) + 1.2) * 18);
          const activeHeight = isPlaying ? Math.min(48, Math.max(6, baseHeight + (Math.random() * 20 - 10))) : baseHeight;
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-100 ${
                isPassed 
                  ? 'bg-red-500 shadow-[0_0_6px_#ef4444]' 
                  : 'bg-neutral-800'
              }`}
              style={{ height: `${activeHeight}px` }}
            />
          );
        })}
      </div>

      {/* Progress & Controls */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-red-700 hover:bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-transform active:scale-95"
            aria-label={isPlaying ? "Pause EVP recording" : "Play EVP recording"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded bg-neutral-900 text-gray-400 hover:text-gray-200"
            title="Rewind"
          >
            <RotateCcw size={13} />
          </button>

          <span className="text-[11px] text-gray-400">
            {Math.floor((progress * 0.42) / 60)}:{String(Math.floor((progress * 0.42) % 60)).padStart(2, '0')} / 0:42
          </span>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEnhancedFilter(!enhancedFilter)}
            className={`text-[10px] px-2 py-1 rounded border transition-colors ${
              enhancedFilter
                ? 'bg-red-950/60 border-red-600 text-red-300'
                : 'bg-neutral-900 border-neutral-800 text-gray-500'
            }`}
          >
            {enhancedFilter ? 'BANDPASS FILTER ON' : 'RAW AUDIO'}
          </button>
        </div>
      </div>

      {location && (
        <div className="mt-2 text-[10px] text-neutral-500 flex items-center space-x-1">
          <span>SOURCE LOCATION:</span>
          <span className="text-gray-400">{location}</span>
        </div>
      )}
    </div>
  );
};
