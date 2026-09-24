import React from 'react';
import { Play, Pause, Heart, ListMusic } from 'lucide-react';
import { Track } from '../types';

interface MiniPlayerProps {
  track: Track;
  isPlaying: boolean;
  progressSeconds: number;
  onPlayPauseToggle: () => void;
  onHeartToggle: () => void;
  onQueueClick: () => void;
  onExpandPlayer: () => void;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  track,
  isPlaying,
  progressSeconds,
  onPlayPauseToggle,
  onHeartToggle,
  onQueueClick,
  onExpandPlayer,
}) => {
  const progressPercent = Math.min(100, Math.max(0, (progressSeconds / (track.duration || 180)) * 100));

  return (
    <div className="fixed bottom-[64px] left-0 right-0 z-30 px-3 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div
          onClick={onExpandPlayer}
          className="relative group flex items-center justify-between p-2 pl-2.5 pr-3 rounded-2xl bg-[#1a1a20]/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl shadow-black/80 hover:border-[#ff5500]/40 transition-all cursor-pointer overflow-hidden"
        >
          {/* Progress bar line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-[#ff5500] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Left: Album Artwork + Title & Artist */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-[#25252c] border border-white/[0.08]">
              <img
                src={track.coverUrl}
                alt={track.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-ping"></span>
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate tracking-tight group-hover:text-white">
                {track.title}
              </span>
              <span className="text-[11px] text-white/50 truncate font-medium mt-0.5">
                {track.artist}
              </span>
            </div>
          </div>

          {/* Right Controls: Heart (Orange Highlighted), Pause, Queue */}
          <div
            className="flex items-center gap-1 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heart Icon - Retained and highlighted in signature SoundCloud orange */}
            <button
              onClick={onHeartToggle}
              className="w-9 h-9 flex items-center justify-center text-[#ff5500] hover:scale-110 active:scale-90 transition-transform"
              aria-label="Liked track"
              title="Like this track"
            >
              <Heart
                className={`w-5 h-5 ${track.isLiked ? 'fill-[#ff5500] text-[#ff5500]' : 'text-white/60 hover:text-white'}`}
              />
            </button>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={onPlayPauseToggle}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>

            {/* Queue Icon */}
            <button
              onClick={onQueueClick}
              className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Play Queue"
              title="Up Next Queue"
            >
              <ListMusic className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
