import { useState } from 'react';
import { Home } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({ src, alt, className = '', fallbackTitle }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#162947] to-[#0F1F38] text-[#FAF7F2] p-6 text-center ${className}`}
      >
        <Home className="w-8 h-8 opacity-75 mb-2" strokeWidth={1.25} aria-hidden="true" />
        {fallbackTitle && (
          <span className="font-display text-lg tracking-tight opacity-90">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
