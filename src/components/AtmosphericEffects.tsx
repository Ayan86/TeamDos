import React from 'react';

interface AtmosphericEffectsProps {
  showScanlines?: boolean;
}

export const AtmosphericEffects: React.FC<AtmosphericEffectsProps> = ({ showScanlines = true }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* Subtle Vignette */}
      <div className="absolute inset-0 vignette-radial opacity-35" />

      {/* Subtle CRT Scanlines */}
      {showScanlines && (
        <div className="absolute inset-0 scanlines opacity-20" />
      )}

      {/* Atmospheric Ambient Red Corner Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-950/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-950/15 rounded-full blur-3xl" />
    </div>
  );
};
