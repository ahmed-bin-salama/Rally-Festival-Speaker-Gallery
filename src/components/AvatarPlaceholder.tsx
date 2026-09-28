import React from 'react';

interface AvatarPlaceholderProps {
  name: string;
  className?: string;
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ name, className = '' }) => {
  // Generate initials from name (e.g. "Abdullah Amer" -> "AA")
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#800020] via-[#500014] to-[#2a000b] flex items-center justify-center font-bold text-white shadow-inner select-none ${className}`}
    >
      {/* Subtle geometric overlay pattern for Rally branding */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

      {/* Decorative outline */}
      <div className="absolute inset-0 border border-white/10 rounded-inherit" />

      {/* Monogram / Initials */}
      <span className="tracking-wider drop-shadow-md z-10">{initials}</span>
    </div>
  );
};
