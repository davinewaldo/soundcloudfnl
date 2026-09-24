import React, { useState } from 'react';
import { Search, TrendingUp, X } from 'lucide-react';
import { Track } from '../types';

interface SearchViewProps {
  onPlayTrack: (track: Track) => void;
  availableTracks: Track[];
}

export const SearchView: React.FC<SearchViewProps> = ({ onPlayTrack, availableTracks }) => {
  const [query, setQuery] = useState('');

  const trendingTags = [
    'Phonk & Drift',
    'Indonesian BeatTape',
    'Underground Trap',
    'Lo-Fi Beats to Chill',
    'Club Edit 2026',
    'Synthwave Night',
  ];

  const results = query.trim()
    ? availableTracks.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.artist.toLowerCase().includes(query.toLowerCase()) ||
          (t.genre && t.genre.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists, tracks, podcasts..."
          className="w-full bg-[#18181f] border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#ff5500] shadow-inner"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results or Trending */}
      {query.trim() ? (
        <div className="mt-4">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">
            Search Results ({results.length})
          </h3>
          <div className="space-y-2">
            {results.map((track) => (
              <div
                key={track.id}
                onClick={() => onPlayTrack(track)}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] cursor-pointer transition-colors"
              >
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{track.title}</h4>
                  <p className="text-xs text-white/50">{track.artist}</p>
                </div>
                <span className="text-[11px] text-[#ff5500] font-semibold">Play</span>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-sm text-white/40 text-center py-8">
                No tracks found for "{query}".
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
            <TrendingUp className="w-4 h-4 text-[#ff5500]" />
            <span>Trending on SoundCloud</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3.5 py-2 rounded-xl bg-[#1a1a20] border border-white/5 hover:border-[#ff5500]/40 text-xs font-medium text-white/80 hover:text-white transition-all active:scale-95"
              >
                #{tag}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">
              Explore Genres
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: 'Hip-Hop & Rap', color: 'from-amber-600 to-orange-900' },
                { name: 'Electronic / Club', color: 'from-[#ff5500] to-rose-900' },
                { name: 'Lo-Fi Chill', color: 'from-blue-600 to-indigo-950' },
                { name: 'Phonk & Bass', color: 'from-purple-600 to-black' },
              ].map((genre) => (
                <div
                  key={genre.name}
                  onClick={() => setQuery(genre.name.split(' ')[0])}
                  className={`h-20 p-3 rounded-xl bg-gradient-to-br ${genre.color} flex items-end font-extrabold text-sm text-white cursor-pointer hover:opacity-90 shadow-md`}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
