import React, { useState } from 'react';
import { Heart, Shuffle, Play, Pause, Search, Clock, MoreVertical } from 'lucide-react';
import { Track } from '../types';

interface LikesViewProps {
  likedTracks: Track[];
  currentTrackId?: string;
  isPlaying?: boolean;
  onTrackSelect: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
  onShuffleLikes: () => void;
}

export const LikesView: React.FC<LikesViewProps> = ({
  likedTracks,
  currentTrackId,
  isPlaying,
  onTrackSelect,
  onToggleLike,
  onShuffleLikes,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTracks = likedTracks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* Header Banner */}
      <div className="px-5 pt-4 pb-6 bg-gradient-to-b from-[#ff5500]/20 via-[#18181d] to-[#0f0f13] border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-[#ff5500] flex items-center justify-center shadow-xl shadow-[#ff5500]/40 flex-shrink-0">
            <Heart className="w-10 h-10 fill-white text-white stroke-0" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff5500]">
              COLLECTION
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Your Likes</h1>
            <p className="text-xs text-white/60 mt-1">
              {likedTracks.length} tracks · Updated recently
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (filteredTracks.length > 0) onTrackSelect(filteredTracks[0]);
              }}
              className="px-5 py-2 rounded-full bg-[#ff5500] hover:bg-[#ff6611] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ff5500]/30 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play All</span>
            </button>

            <button
              onClick={onShuffleLikes}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
              aria-label="Shuffle Likes"
            >
              <Shuffle className="w-4 h-4 stroke-[2]" />
            </button>
          </div>

          <div className="relative w-36 sm:w-44">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter likes..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff5500]"
            />
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="px-4 mt-3 divide-y divide-white/[0.04]">
        {filteredTracks.map((track, index) => {
          const isThisPlaying = currentTrackId === track.id && isPlaying;
          return (
            <div
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="group flex items-center justify-between py-3 px-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <span className="text-xs font-mono text-white/30 w-4 text-center">
                  {index + 1}
                </span>

                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#222228]">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isThisPlaying && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Pause className="w-4 h-4 fill-[#ff5500] text-[#ff5500]" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-sm font-bold truncate tracking-tight ${
                      currentTrackId === track.id ? 'text-[#ff5500]' : 'text-white'
                    }`}
                  >
                    {track.title}
                  </span>
                  <span className="text-xs text-white/50 truncate font-medium">
                    {track.artist}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(track.id);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-[#ff5500] hover:scale-110 active:scale-90 transition-transform"
                  aria-label="Remove from Likes"
                >
                  <Heart className="w-4 h-4 fill-[#ff5500] text-[#ff5500]" />
                </button>

                <span className="text-xs font-mono text-white/40 hidden sm:inline">
                  {Math.floor(track.duration / 60)}:
                  {(track.duration % 60).toString().padStart(2, '0')}
                </span>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white"
                  aria-label="More options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTracks.length === 0 && (
          <div className="py-12 text-center text-white/40 text-sm">
            No liked tracks found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
