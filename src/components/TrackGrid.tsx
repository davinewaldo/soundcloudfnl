import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Track } from '../types';

interface TrackGridProps {
  tracks: Track[];
  currentTrackId?: string;
  isPlaying?: boolean;
  onTrackSelect: (track: Track) => void;
}

export const TrackGrid: React.FC<TrackGridProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  onTrackSelect,
}) => {
  return (
    <div className="px-4 mt-5">
      <div className="grid grid-cols-2 gap-3">
        {tracks.map((track) => {
          const isThisTrackPlaying = currentTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="group flex flex-col cursor-pointer text-left transition-all active:scale-[0.98]"
            >
              {/* Card Album Artwork */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#1c1c22] border border-white/[0.06] group-hover:border-[#ff5500]/50 transition-all shadow-md">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                {/* Subtle gradient vignette at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                {/* Play / Active overlay icon in SoundCloud style */}
                <div
                  className={`absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isThisTrackPlaying
                      ? 'bg-[#ff5500] text-white shadow-lg shadow-[#ff5500]/40 scale-100 opacity-100'
                      : 'bg-black/70 backdrop-blur-md text-white/90 group-hover:bg-[#ff5500] group-hover:text-white group-hover:scale-105 opacity-90'
                  }`}
                >
                  {isThisTrackPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </div>

                {/* Playing animated equalizer bars if active */}
                {isThisTrackPlaying && (
                  <div className="absolute top-2.5 left-2.5 flex items-end gap-0.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
                    <span className="w-1 bg-[#ff5500] h-3 animate-pulse"></span>
                    <span className="w-1 bg-[#ff5500] h-4 animate-bounce"></span>
                    <span className="w-1 bg-[#ff5500] h-2 animate-pulse"></span>
                  </div>
                )}
              </div>

              {/* Title & Artist/Location info */}
              <div className="mt-2 flex flex-col px-0.5">
                <span
                  className={`text-sm font-semibold truncate tracking-tight ${
                    currentTrackId === track.id ? 'text-[#ff5500]' : 'text-white group-hover:text-white'
                  }`}
                >
                  {track.title}
                </span>
                <span className="text-xs text-white/50 truncate mt-0.5 font-medium">
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
