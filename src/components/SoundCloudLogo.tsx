import React from 'react';

interface SoundCloudLogoProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

export const SoundCloudLogo: React.FC<SoundCloudLogoProps> = ({
  className = '',
  size = 24,
  monochrome = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="SoundCloud"
    >
      <path
        d="M11.5 8.5C11.5 7.12 12.62 6 14 6C14.7 6 15.33 6.29 15.78 6.75C16.32 5.68 17.44 5 18.75 5C20.55 5 22 6.45 22 8.25C22.61 8.58 23 9.24 23 10C23 11.1 22.1 12 21 12H11.5"
        stroke={monochrome ? 'currentColor' : '#ff5500'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Waveform bars forming cloud base */}
      <line x1="2" y1="10" x2="2" y2="12" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.5" y1="8.5" x2="4.5" y2="13" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="7" x2="7" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.5" y1="7.5" x2="9.5" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.5" y1="8.5" x2="14.5" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="9" x2="17" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="19.5" y1="10" x2="19.5" y2="13.5" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="11" x2="22" y2="13" stroke={monochrome ? 'currentColor' : '#ff5500'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
