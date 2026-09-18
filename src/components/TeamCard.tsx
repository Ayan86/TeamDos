import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';

interface TeamCardProps {
  member: TeamMember;
  onPhotoUpdated?: (updatedMember: TeamMember) => void;
}

// Dedicated high-resolution fallback portraits matching each team member's role and character
const FALLBACK_PORTRAITS: Record<string, string> = {
  'Debraj Sanyal': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
  'Ishita Das Sanyal': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  'Anirban Das': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  'Ayush Majumder': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
};

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const safeEncode = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    return path.replace(/ /g, '%20');
  };

  const nameSlug = member.name.toLowerCase().replace(/\s+/g, '-');
  const nameUnderscore = member.name.replace(/\s+/g, '_');
  const encodedName = encodeURIComponent(member.name);
  const fallbackUrl = FALLBACK_PORTRAITS[member.name] || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop';

  const getSavedLocalPhoto = () => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(`team_photo_${member.name}`) || localStorage.getItem(`team_photo_${member.id}`) || null;
      }
    } catch {
      // ignore localStorage errors
    }
    return null;
  };

  const savedLocal = getSavedLocalPhoto();

  const candidates = [
    savedLocal,
    safeEncode(member.photoUrl),
    `/uploads/${nameUnderscore}.jfif`,
    `/uploads/${nameUnderscore}.jpg`,
    `/uploads/${encodedName}.jfif`,
    `/uploads/${encodedName}.jpg`,
    `/${nameUnderscore}.jfif`,
    `/${nameUnderscore}.jpg`,
    `/${encodedName}.jfif`,
    `/${encodedName}.jpg`,
    `/uploads/${nameSlug}.jpg`,
    `${nameUnderscore}.jfif`,
    `${nameUnderscore}.jpg`,
    fallbackUrl,
  ].filter(Boolean) as string[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string>(candidates[0] || fallbackUrl);

  useEffect(() => {
    const local = getSavedLocalPhoto();
    setCurrentIndex(0);
    setHasLoaded(false);
    setActiveSrc(local || safeEncode(member.photoUrl) || candidates[0] || fallbackUrl);
  }, [member.photoUrl, member.name]);

  const handleImageError = () => {
    if (currentIndex < candidates.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setActiveSrc(candidates[nextIdx]);
    }
  };

  return (
    <div 
      className="group relative bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-red-950/60 hover:border-red-600/80 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] flex flex-col cursor-default select-none"
    >
      {/* Cinematic Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-950">
        {/* Loading placeholder skeleton */}
        {!hasLoaded && (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
            <span className="font-mono-tech text-xs text-neutral-600 tracking-widest uppercase">
              LOADING PHOTO...
            </span>
          </div>
        )}

        {/* Actual Team Photo with Clean Visibility and Subtle Cinematic Grading */}
        <img
          key={activeSrc}
          src={activeSrc}
          alt={`Investigator portrait of ${member.name}`}
          referrerPolicy="no-referrer"
          onLoad={() => setHasLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center filter contrast-105 brightness-100 group-hover:scale-105 transition-all duration-700 ease-out ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle Cinematic Grading Overlays */}
        <div className="absolute inset-0 pointer-events-none vignette-radial opacity-30 group-hover:opacity-20 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-red-950/15 via-transparent to-red-950/15 opacity-60 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 pointer-events-none scanlines opacity-10" />

        {/* Red corner accents */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600/70 opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Info Section: NAME + ROLE */}
      <div className="p-5 relative bg-black/40 backdrop-blur-md border-t border-red-950/40 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.14em] text-gray-100 uppercase group-hover:text-white transition-colors duration-300">
            {member.name}
          </h3>

          <div className="flex items-center justify-between mt-1.5">
            <p className="font-mono-tech text-xs sm:text-sm font-semibold tracking-[0.2em] text-red-500/90 group-hover:text-red-400 group-hover:glow-red-sm transition-all duration-300 uppercase">
              {member.role}
            </p>
            <div className="w-2 h-2 rounded-full bg-red-600/40 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_#ef4444] transition-all" />
          </div>

          {member.expertise && (
            <p className="mt-2 text-xs font-mono-tech text-neutral-400 tracking-wider">
              {member.expertise}
            </p>
          )}

          {/* Biography text */}
          {(() => {
            const nameLower = member.name.toLowerCase();
            let bioText = member.biography && member.biography !== 'Profile information coming soon.' ? member.biography : (member.bio || null);
            
            if (nameLower.includes('debraj') || nameLower.includes('devraj')) {
              bioText = "Devraj Sanyal is the Founder and Lead Investigator of Detectives of Supernatural (DOS), one of India's prominent paranormal research teams. Since 2010, he has dedicated himself to investigating unexplained phenomena through scientific methods, field research, and modern investigative equipment.";
            } else if (nameLower.includes('ishita')) {
              bioText = "Ishita Das Sanyal is the Director and Lead Investigator of DOS. Recognized for her contributions to paranormal research and advocacy of the message \"Rise Above Fear,\" she leads investigations and public outreach programs focused on rational inquiry.";
            } else if (nameLower.includes('anirban')) {
              bioText = "Anirban Das is the Technical Head of DOS. He specializes in investigation technology and evidence analysis, utilizing scientific instruments to examine reports of unexplained phenomena with high technical precision.";
            } else if (nameLower.includes('ayush')) {
              bioText = "Ayush Majumder is a Field Investigator at DOS, specializing in on-site evidence collection and field research. He supports the organization's mission to promote critical thinking through modern investigative techniques.";
            }
            
            if (!bioText) return null;
            return (
              <p className="mt-3 text-xs text-gray-300 leading-relaxed font-sans border-t border-red-950/50 pt-2.5">
                {bioText}
              </p>
            );
          })()}
        </div>
      </div>

      {/* Interactive Bottom Glow Bar */}
      <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-red-600 to-transparent transition-all duration-500" />
    </div>
  );
};
