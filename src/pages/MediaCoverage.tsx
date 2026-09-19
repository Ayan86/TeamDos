import React, { useState } from 'react';
import { 
  Tv, 
  Newspaper, 
  Youtube, 
  Radio, 
  ExternalLink, 
  Calendar, 
  Search, 
  Video,
  Play,
  X
} from 'lucide-react';
import { MediaItem } from '../types';

interface MediaCoverageProps {
  media: MediaItem[];
}

export const MediaCoverage: React.FC<MediaCoverageProps> = ({ media }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<MediaItem | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Coverage' },
    { id: 'Television', label: 'Television' },
    { id: 'Newspapers', label: 'Newspapers' },
    { id: 'Magazines', label: 'Magazines' },
    { id: 'YouTube', label: 'YouTube' },
    { id: 'Podcasts', label: 'Podcasts' },
    { id: 'Interviews', label: 'Interviews' },
    { id: 'Online Media', label: 'Online Media' },
    { id: 'Documentaries', label: 'Documentaries' }
  ];

  const filteredMedia = media.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.publisher || item.publication || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary || item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-transparent text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <Tv size={14} />
            <span>PRESS, TELEVISION & BROADCAST ARCHIVE</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase">
            MEDIA COVERAGE
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400">
            National television documentary specials, investigative news broadcasts, newspaper features, and podcast interviews spotlighting DOS scientific fieldwork across India since 2010.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/40 backdrop-blur-md border border-neutral-800 rounded-lg p-4 mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search news features, TV specials, publishers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-neutral-800 focus:border-red-600 rounded pl-10 pr-4 py-2 text-xs font-mono-tech text-gray-200 placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-neutral-900">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded text-xs font-mono-tech tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-red-700 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)] border border-red-500'
                      : 'bg-black/40 backdrop-blur-sm text-gray-300 border border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.videoUrl) setSelectedVideo(item);
              }}
              className="group bg-black/40 backdrop-blur-md rounded-lg border border-neutral-800/80 hover:border-red-600/70 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(220,38,38,0.25)] cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
                <img
                  src={item.thumbnailUrl || item.thumbnail || '/horror_background_wide.jpg'}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded bg-black/80 border border-neutral-800 text-[10px] font-mono-tech text-red-400 font-bold uppercase backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {item.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.9)] group-hover:scale-110 transition-transform border border-red-500">
                      <Play size={20} className="translate-x-0.5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-gray-400 mb-2">
                    <span className="text-red-400 font-bold uppercase tracking-wider">{item.publisher || item.publication}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar size={11} className="text-neutral-500" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-gray-100 group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
                    {item.summary || item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between">
                  {item.videoUrl ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVideo(item);
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono-tech tracking-wider text-red-400 hover:text-red-300 uppercase transition-colors"
                    >
                      <Video size={13} />
                      <span>PLAY VIDEO BROADCAST</span>
                    </button>
                  ) : (
                    <a
                      href={item.externalUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center space-x-1.5 text-xs font-mono-tech tracking-wider text-red-400 hover:text-red-300 uppercase transition-colors"
                    >
                      <span>VIEW COVERAGE</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <span className="text-[10px] font-mono-tech text-neutral-600">DOS ARCHIVE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-[#09090d] border border-red-900/80 rounded-xl overflow-hidden max-w-4xl w-full shadow-[0_0_50px_rgba(220,38,38,0.4)]">
              <div className="p-4 bg-black/80 border-b border-red-950 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-red-400 uppercase tracking-wider font-bold">
                    {selectedVideo.publisher || selectedVideo.publication} • {selectedVideo.category}
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-gray-100 mt-0.5">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-red-950 text-gray-300 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 bg-black flex flex-col items-center justify-center">
                {selectedVideo.videoUrl && selectedVideo.videoUrl.includes('youtube') || selectedVideo.videoUrl?.includes('youtu.be') ? (
                  <div className="w-full aspect-video">
                    <iframe
                      src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')}
                      title={selectedVideo.title}
                      className="w-full h-full rounded"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video
                    src={selectedVideo.videoUrl}
                    controls
                    autoPlay
                    className="w-full max-h-[70vh] rounded bg-black object-contain shadow-2xl"
                  />
                )}
                
                <p className="mt-4 text-xs font-mono-tech text-gray-400 text-center max-w-2xl">
                  {selectedVideo.summary || selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
