import React from 'react';
import { Search, Bell, MessageSquare, Wifi, Battery, Signal } from 'lucide-react';
import { SoundCloudLogo } from './SoundCloudLogo';

interface HeaderProps {
  onSearchClick: () => void;
  onNotificationsClick: () => void;
  onMessagesClick: () => void;
  onGoProClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNotificationsClick,
  onMessagesClick,
  onGoProClick,
  onProfileClick,
}) => {
  return (
    <div className="sticky top-0 z-30 bg-[#0f0f12]/95 backdrop-blur-md border-b border-white/[0.04]">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold text-white/90">
        <div className="tracking-tight text-[13px] font-medium pl-0.5">3.17</div>
        {/* Dynamic Island / Notch indicator spacer */}
        <div className="w-20 h-4 bg-black/60 rounded-full flex items-center justify-center border border-white/10 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1.5 text-white/80">
          <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
          <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-white/70 font-mono">82%</span>
            <Battery className="w-4 h-4 fill-white/80 stroke-[1.8]" />
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Left: Generic stylized SoundCloud artist avatar (abstract geometric shape) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onProfileClick}
            className="relative group w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#ff5500] via-[#ff7700] to-[#3a3a42] shadow-sm hover:scale-105 active:scale-95 transition-all"
            aria-label="Artist Profile"
          >
            <div className="w-full h-full rounded-full bg-[#18181c] flex items-center justify-center overflow-hidden">
              {/* Stylized abstract geometric avatar */}
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <polygon
                  points="16,4 28,10 28,22 16,28 4,22 4,10"
                  fill="#24242a"
                  stroke="#ff5500"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="16" r="4.5" fill="#ff5500" />
                <path
                  d="M16 8L22 16L16 24L10 16Z"
                  stroke="#ff8833"
                  strokeWidth="1"
                  fill="rgba(255, 85, 0, 0.15)"
                />
              </svg>
            </div>
            {/* Online badge */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f0f12]"></span>
          </button>

          {/* Go Pro Button (SoundCloud style) */}
          <button
            onClick={onGoProClick}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#ff5500] to-[#ff3300] hover:from-[#ff6611] hover:to-[#ff4411] text-white font-bold text-xs tracking-tight rounded-full shadow-md shadow-[#ff5500]/20 active:scale-95 transition-all"
          >
            <span className="text-[11px] uppercase tracking-wider font-extrabold">Go Pro</span>
          </button>

          {/* Subtle integrated SoundCloud Cloud Logo */}
          <div className="flex items-center gap-1 text-white/50 hover:text-white/80 transition-colors pl-0.5">
            <SoundCloudLogo size={18} />
          </div>
        </div>

        {/* Right Action Icons: Search, Notifications, Messages */}
        <div className="flex items-center gap-1">
          <button
            onClick={onSearchClick}
            className="w-9 h-9 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          <button
            onClick={onNotificationsClick}
            className="relative w-9 h-9 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff5500] rounded-full ring-2 ring-[#0f0f12]"></span>
          </button>

          <button
            onClick={onMessagesClick}
            className="relative w-9 h-9 flex items-center justify-center text-white/75 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-colors"
            aria-label="Messages"
          >
            <MessageSquare className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
