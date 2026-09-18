import React, { useState } from 'react';
import { 
  Camera, 
  Filter, 
  MapPin, 
  Calendar, 
  Eye, 
  Maximize2 
} from 'lucide-react';
import { GalleryImage, GalleryCategory } from '../types';
import { Lightbox } from '../components/Lightbox';

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Archives' },
    { id: 'Investigations', label: 'Investigations' },
    { id: 'Haunted Locations', label: 'Haunted Locations' },
    { id: 'Equipment', label: 'Equipment' },
    { id: 'Evidence', label: 'Evidence' },
    { id: 'Team', label: 'Team' },
    { id: 'Events', label: 'Events' },
    { id: 'Media', label: 'Media' },
    { id: 'Behind The Scenes', label: 'Behind The Scenes' }
  ];

  const filteredImages = selectedCategory === 'ALL'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <Camera size={14} />
            <span>PHOTOGRAPHIC & VISUAL ARCHIVE</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase">
            EVIDENCE GALLERY
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            Documented photographic captures, full-spectrum anomalies, haunted heritage site documentation, and technical deployments from active field cases.
          </p>
        </div>

        {/* Category Filters */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setActiveLightboxIndex(index)}
              className="group relative bg-black/30 backdrop-blur-md rounded-lg overflow-hidden border border-neutral-800/80 hover:border-red-600/70 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] aspect-[4/3] sm:aspect-[3/4]"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-115 brightness-90 group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

              {/* Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-800 text-[10px] font-mono-tech text-red-400">
                  {img.category}
                </span>
              </div>

              {/* Hover maximize indicator */}
              <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-red-950/80 text-red-300 border border-red-700">
                <Maximize2 size={13} />
              </div>

              {/* Bottom Caption Info */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="flex items-center space-x-2 text-[10px] font-mono-tech text-red-400 mb-1">
                  {img.location && (
                    <span className="flex items-center space-x-1">
                      <MapPin size={10} />
                      <span className="truncate max-w-[120px]">{img.location}</span>
                    </span>
                  )}
                  {img.date && <span>• {img.date}</span>}
                </div>

                <h3 className="font-cinzel text-sm font-bold text-gray-100 group-hover:text-red-300 transition-colors line-clamp-1">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20 bg-black/40 rounded border border-neutral-900 font-mono-tech">
            <Camera size={32} className="text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">NO PHOTOGRAPHS IN THIS ARCHIVE CATEGORY</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={activeLightboxIndex}
          onClose={() => setActiveLightboxIndex(null)}
          onNext={() => setActiveLightboxIndex((prev) => (prev! + 1) % filteredImages.length)}
          onPrev={() => setActiveLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length)}
        />
      )}
    </div>
  );
};
