import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Track } from '../types';

interface MoreLikeThisProps {
  tracks: Track[];
  currentTrackId?: string;
  isPlaying?: boolean;
  onTrackSelect: (track: Track) => void;
}

export const MoreLikeThis: React.FC<MoreLikeThisProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  onTrackSelect,
}) => {
  return (
    <div className="mt-7 mb-24">
      <div className="px-4 mb-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-white tracking-tight">
          More of what you like
        </h3>
        <span className="text-xs text-[#ff5500] font-semibold hover:underline cursor-pointer">
          See all
        </span>
      </div>

      {/* Horizontal scroll carousel with partial card peeking */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none snap-x snap-mandatory">
        {tracks.map((track) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="flex-shrink-0 w-36 group cursor-pointer text-left snap-start active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#18181c] border border-white/[0.06] group-hover:border-[#ff5500]/40 transition-all shadow-md">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-70 transition-opacity"></div>

                {/* Play button */}
                <div
                  className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isThisPlaying
                      ? 'bg-[#ff5500] text-white scale-100'
                      : 'bg-black/70 backdrop-blur-md text-white/90 group-hover:bg-[#ff5500] group-hover:text-white'
                  }`}
                >
                  {isThisPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </div>
              </div>

              <div className="mt-1.5 flex flex-col">
                <span className="text-xs font-semibold text-white truncate tracking-tight group-hover:text-[#ff5500] transition-colors">
                  {track.title}
                </span>
                <span className="text-[11px] text-white/50 truncate font-medium">
                  {track.artist}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
