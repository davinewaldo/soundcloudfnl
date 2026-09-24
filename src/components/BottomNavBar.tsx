import React from 'react';
import { Home, Radio, Search, Heart, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; isLikesTab?: boolean }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'feed',
      label: 'Feed',
      icon: <Radio className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="w-5 h-5 stroke-[2]" />,
    },
    {
      id: 'likes',
      label: 'Likes',
      isLikesTab: true,
      // The fourth tab replaces 'Library' with a SOLID HEART icon representing 'Likes' and labeled 'Likes'
      icon: <Heart className="w-5 h-5 fill-current stroke-0" />,
    },
    {
      id: 'upgrade',
      label: 'Upgrade',
      icon: <Sparkles className="w-5 h-5 stroke-[2]" />,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f0f13]/98 backdrop-blur-xl border-t border-white/[0.06] pb-safe"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-md mx-auto h-16 grid grid-cols-5 items-center px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full gap-1 transition-colors active:scale-95 ${
                isActive
                  ? 'text-[#ff5500]'
                  : 'text-white/45 hover:text-white/80'
              }`}
            >
              <div className={`relative transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
                {tab.isLikesTab && (
                  <span className="sr-only">(Likes Library)</span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight leading-none ${
                  isActive ? 'font-bold text-[#ff5500]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
