import React from 'react';
import { Heart, Shuffle, Play } from 'lucide-react';

interface LikesHeaderCardProps {
  likesCount?: number;
  onCardClick: () => void;
  onShuffleClick: (e: React.MouseEvent) => void;
  onPlayLikesClick: (e: React.MouseEvent) => void;
  isPlayingLikes?: boolean;
}

export const LikesHeaderCard: React.FC<LikesHeaderCardProps> = ({
  likesCount = 142,
  onCardClick,
  onShuffleClick,
  onPlayLikesClick,
  isPlayingLikes = false,
}) => {
  return (
    <div
      onClick={onCardClick}
      className="group relative mx-4 mt-3 p-5 rounded-2xl bg-gradient-to-br from-[#222227] via-[#1a1a1f] to-[#141417] border border-white/[0.08] shadow-lg shadow-black/40 hover:border-[#ff5500]/40 transition-all cursor-pointer overflow-hidden"
    >
      {/* Subtle ambient orange reflection in corner */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ff5500]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff5500]/25 transition-all"></div>

      <div className="relative flex items-center justify-between">
        {/* Left side: Solid SoundCloud Orange Heart + 'Your Likes' label */}
        <div className="flex flex-col items-start">
          {/* SoundCloud distinct solid orange heart */}
          <div className="w-12 h-12 rounded-xl bg-[#ff5500] flex items-center justify-center shadow-lg shadow-[#ff5500]/30 group-hover:scale-105 active:scale-95 transition-transform mb-3">
            <Heart className="w-6 h-6 fill-white text-white stroke-0" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold tracking-tight text-white group-hover:text-white transition-colors">
              Your Likes
            </h2>
            <div className="flex items-center gap-2 text-xs font-medium text-white/50 mt-0.5">
              <span>{likesCount} tracks</span>
              <span>·</span>
              <span className="text-[#ff5500]">SoundCloud Collection</span>
            </div>
          </div>
        </div>

        {/* Right side: Quick Play and Shuffle action buttons */}
        <div className="flex items-center gap-2">
          {/* Play/Pause all likes */}
          <button
            onClick={onPlayLikesClick}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isPlayingLikes
                ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/30'
                : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
            }`}
            aria-label="Play Likes"
            title="Play Your Likes"
          >
            <Play className={`w-4 h-4 ${isPlayingLikes ? 'fill-white text-white' : 'fill-white/80 text-white/80 pl-0.5'}`} />
          </button>

          {/* Shuffle Icon (Retained from image_0.png) */}
          <button
            onClick={onShuffleClick}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#ff5500]/20 hover:text-[#ff5500] text-white/80 flex items-center justify-center transition-all active:scale-95"
            aria-label="Shuffle Likes"
            title="Shuffle Your Likes"
          >
            <Shuffle className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};
