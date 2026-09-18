import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin, Calendar, Tag } from 'lucide-react';
import { GalleryImage } from '../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      {/* Top Controls Bar */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 z-20">
        <div className="flex items-center space-x-3 text-xs font-mono-tech text-gray-400">
          <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800 text-red-300">
            {currentImage.category}
          </span>
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded bg-neutral-900/80 border border-neutral-800 text-gray-300 hover:text-white hover:border-red-600 transition-colors"
            title={isZoomed ? "Reset Zoom" : "Zoom Image"}
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded bg-neutral-900/80 border border-neutral-800 text-gray-300 hover:text-red-400 hover:border-red-600 transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-gray-300 hover:text-white hover:border-red-600 transition-all z-20"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-gray-300 hover:text-white hover:border-red-600 transition-all z-20"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Image Stage */}
      <div className="relative max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center p-4">
        <img
          src={currentImage.imageUrl}
          alt={currentImage.title}
          referrerPolicy="no-referrer"
          className={`max-w-full max-h-full object-contain rounded border border-red-950/60 transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Bottom Metadata Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-20 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-tech text-red-400/90 mb-1">
            {currentImage.location && (
              <span className="flex items-center space-x-1">
                <MapPin size={13} />
                <span>{currentImage.location}</span>
              </span>
            )}
            {currentImage.date && (
              <span className="flex items-center space-x-1 text-gray-400">
                <Calendar size={13} />
                <span>{currentImage.date}</span>
              </span>
            )}
          </div>
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-gray-100">
            {currentImage.title}
          </h3>
          {currentImage.caption && (
            <p className="mt-1 text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
