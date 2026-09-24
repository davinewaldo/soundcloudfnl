import React from 'react';
import { Radio, Heart, MessageCircle, Repeat, Play, Share2 } from 'lucide-react';
import { Track } from '../types';

interface FeedViewProps {
  onPlayTrack: (track: Track) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ onPlayTrack }) => {
  const feedItems = [
    {
      id: 'f1',
      artist: 'bosca',
      avatar: '🎧',
      postedAgo: '2h ago',
      repostedBy: 'LERBE PIDUT reposted',
      trackTitle: 'hipdut bb (VIP Edit)',
      genre: 'Lo-Fi / Beats',
      likes: 824,
      reposts: 128,
      coverUrl: '/src/assets/images/album_art_bosca_1790239486568.jpg',
      duration: 164,
    },
    {
      id: 'f2',
      artist: 'Slicejax',
      avatar: '⚡',
      postedAgo: '5h ago',
      repostedBy: 'Featured on SoundCloud Hot',
      trackTitle: 'MMG (My Mine Club Dub)',
      genre: 'Phonk',
      likes: 1940,
      reposts: 312,
      coverUrl: '/src/assets/images/album_art_slicejax_1790239539912.jpg',
      duration: 173,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#ff5500]" />
          Stream Feed
        </h2>
        <span className="text-xs text-white/50">Following 18 artists</span>
      </div>

      <div className="mt-4 space-y-5">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-[#17171c] border border-white/[0.06] hover:border-[#ff5500]/30 transition-all"
          >
            <div className="flex items-center justify-between text-xs text-white/40 mb-2.5">
              <span className="flex items-center gap-1.5 font-medium text-white/60">
                <Repeat className="w-3.5 h-3.5 text-[#ff5500]" />
                {item.repostedBy}
              </span>
              <span>{item.postedAgo}</span>
            </div>

            <div className="flex gap-3 items-center">
              <div
                onClick={() =>
                  onPlayTrack({
                    id: item.id,
                    title: item.trackTitle,
                    artist: item.artist,
                    coverUrl: item.coverUrl,
                    duration: item.duration,
                    isLiked: true,
                  })
                }
                className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black cursor-pointer group"
              >
                <img src={item.coverUrl} alt={item.trackTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-5 h-5 fill-[#ff5500] text-[#ff5500]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">{item.trackTitle}</h4>
                <p className="text-xs text-white/60 font-medium">{item.artist}</p>
                <span className="inline-block mt-1 text-[10px] text-[#ff5500] font-semibold">
                  #{item.genre}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 text-xs text-white/60">
              <button className="flex items-center gap-1.5 hover:text-[#ff5500]">
                <Heart className="w-4 h-4" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white">
                <Repeat className="w-4 h-4" />
                <span>{item.reposts}</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-white">
                <MessageCircle className="w-4 h-4" />
                <span>Comments</span>
              </button>
              <button className="hover:text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
