import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Track } from '../types';

interface TodaysPickProps {
  track: Track;
  currentTrackId?: string;
  isPlaying?: boolean;
  onPlayPick: (track: Track) => void;
  onLikeToggle?: (trackId: string) => void;
}

export const TodaysPick: React.FC<TodaysPickProps> = ({
  track,
  currentTrackId,
  isPlaying,
  onPlayPick,
  onLikeToggle,
}) => {
  const isThisPlaying = currentTrackId === track.id && isPlaying;

  return (
    <div className="px-4 mt-7">
      {/* Category Eyebrow & Title */}
      <div className="flex flex-col mb-3">
        <span className="text-[11px] font-bold tracking-wider text-white/50 uppercase">
          TODAY'S PICK
        </span>
        <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5 mt-0.5">
          Hot For You <span className="text-lg">🔥</span>
        </h3>
      </div>

      {/* Large Featured Card */}
      <div
        onClick={() => onPlayPick(track)}
        className="group relative rounded-2xl overflow-hidden bg-[#18181d] border border-white/[0.08] hover:border-[#ff5500]/50 transition-all cursor-pointer shadow-xl shadow-black/50"
      >
        {/* Cover Artwork */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#111114]">
          <img
            src={track.coverUrl}
            alt={track.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Moody dark gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-black/40 to-transparent"></div>

          {/* Top badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-ping"></span>
            <span>Trending Worldwide</span>
          </div>

          {/* Big SoundCloud play button */}
          <div
            className={`absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isThisPlaying
                ? 'bg-[#ff5500] text-white shadow-xl shadow-[#ff5500]/50 scale-100'
                : 'bg-[#ff5500] hover:bg-[#ff6611] text-white shadow-xl shadow-[#ff5500]/40 group-hover:scale-110 active:scale-95'
            }`}
          >
            {isThisPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </div>

          {/* Title and Artist inside bottom of card */}
          <div className="absolute bottom-3 left-3 right-18">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                {track.title}
              </span>
            </div>
            <p className="text-xs text-white/80 font-medium truncate mt-0.5 drop-shadow">
              {track.artist}
            </p>
          </div>
        </div>

        {/* Social Proof Line: '386 people just liked this track' */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131317] border-t border-white/[0.04]">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <Heart className="w-3.5 h-3.5 fill-[#ff5500] text-[#ff5500]" />
            <span>
              <strong className="text-white font-semibold">386 people</strong> just liked this track
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onLikeToggle?.(track.id);
            }}
            className="text-xs font-semibold text-[#ff5500] hover:underline"
          >
            {track.isLiked ? 'Liked' : 'Like'}
          </button>
        </div>
      </div>
    </div>
  );
};
