import React, { useState } from 'react';
import {
  ChevronDown,
  Heart,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Track, Comment } from '../types';
import { SoundCloudLogo } from './SoundCloudLogo';

interface NowPlayingModalProps {
  isOpen: boolean;
  track: Track;
  isPlaying: boolean;
  progressSeconds: number;
  onClose: () => void;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  onToggleLike: () => void;
}

export const NowPlayingModal: React.FC<NowPlayingModalProps> = ({
  isOpen,
  track,
  isPlaying,
  progressSeconds,
  onClose,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  onToggleLike,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      username: 'dabor_beats',
      avatar: '🎧',
      text: 'that 808 drop at 0:42 is insane 🔥',
      timestampSeconds: 42,
    },
    {
      id: 'c2',
      username: 'subvibez',
      avatar: '⚡',
      text: 'SoundCloud underground gold ✨',
      timestampSeconds: 78,
    },
    {
      id: 'c3',
      username: 'kris_99',
      avatar: '🌊',
      text: 'Need this on loop all night',
      timestampSeconds: 120,
    },
  ]);

  if (!isOpen) return null;

  const duration = track.duration || 180;
  const progressPercent = Math.min(100, Math.max(0, (progressSeconds / duration) * 100));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      username: 'you',
      avatar: '👤',
      text: commentInput.trim(),
      timestampSeconds: Math.floor(progressSeconds),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentInput('');
  };

  // Generate 60 waveform bar heights for SoundCloud aesthetic
  const waveformHeights = [
    24, 38, 55, 42, 68, 85, 70, 92, 45, 60, 78, 95, 64, 80, 50, 68, 88, 100,
    75, 52, 65, 82, 90, 72, 48, 62, 85, 94, 60, 42, 70, 88, 92, 65, 50, 78,
    84, 96, 70, 58, 44, 66, 80, 90, 68, 52, 74, 86, 62, 45, 68, 82, 90, 55,
    40, 60, 72, 85, 64, 48,
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md mx-auto h-[95vh] bg-[#111116] rounded-t-[32px] border-t border-white/10 flex flex-col overflow-hidden shadow-2xl">
        {/* Top Handle and Dismiss */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="flex items-center gap-1.5 text-xs font-bold text-white/60 uppercase tracking-wider">
            <SoundCloudLogo size={16} />
            <span>SoundCloud Player</span>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Mute/Unmute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Player Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 flex flex-col justify-between scrollbar-none">
          {/* Main Album Artwork */}
          <div className="relative my-auto aspect-square w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
            <img
              src={track.coverUrl}
              alt={track.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#ff5500]/40 text-[11px] font-bold text-[#ff5500] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-ping"></span>
                <span>NOW STREAMING</span>
              </div>
            )}
          </div>

          {/* Title, Artist, and Quick Actions */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col min-w-0 pr-4">
                <h1 className="text-xl font-extrabold text-white truncate tracking-tight">
                  {track.title}
                </h1>
                <p className="text-sm font-medium text-white/60 truncate mt-0.5">
                  {track.artist}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleLike}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 active:scale-90 transition-all"
                  aria-label="Like Track"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      track.isLiked
                        ? 'fill-[#ff5500] text-[#ff5500]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  />
                </button>

                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    showComments ? 'bg-[#ff5500] text-white' : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                  aria-label="Comments"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>

                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:text-white transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iconic SoundCloud Waveform Scrubber */}
            <div className="mt-6 select-none">
              <div
                className="relative h-16 w-full flex items-end gap-[3px] cursor-pointer group py-2"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  onSeek(ratio * duration);
                }}
              >
                {waveformHeights.map((height, i) => {
                  const barPercent = (i / waveformHeights.length) * 100;
                  const isPassed = barPercent <= progressPercent;

                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end items-center h-full"
                    >
                      <div
                        className={`w-full rounded-sm transition-colors duration-150 ${
                          isPassed
                            ? 'bg-[#ff5500]'
                            : 'bg-white/20 group-hover:bg-white/30'
                        }`}
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}

                {/* Floating comment dots on waveform */}
                {comments.map((c) => {
                  const leftPos = (c.timestampSeconds / duration) * 100;
                  return (
                    <div
                      key={c.id}
                      className="absolute bottom-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#1c1c22] border border-[#ff5500] flex items-center justify-center text-[8px] cursor-pointer hover:scale-125 transition-transform"
                      style={{ left: `${leftPos}%` }}
                      title={`${c.username}: ${c.text}`}
                    >
                      {c.avatar}
                    </div>
                  );
                })}
              </div>

              {/* Time Indicators */}
              <div className="flex items-center justify-between text-xs font-mono font-medium text-white/50 mt-1">
                <span className="text-[#ff5500]">{formatTime(progressSeconds)}</span>
                <span>-{formatTime(duration - progressSeconds)}</span>
              </div>
            </div>

            {/* Transport Controls */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Shuffle"
              >
                <Shuffle className="w-5 h-5 stroke-[2]" />
              </button>

              <button
                onClick={onPrev}
                className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                aria-label="Previous Track"
              >
                <SkipBack className="w-7 h-7 fill-white/80" />
              </button>

              <button
                onClick={onPlayPause}
                className="w-16 h-16 rounded-full bg-[#ff5500] hover:bg-[#ff6611] text-white flex items-center justify-center shadow-xl shadow-[#ff5500]/40 active:scale-95 transition-all"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white text-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white text-white ml-1" />
                )}
              </button>

              <button
                onClick={onNext}
                className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
                aria-label="Next Track"
              >
                <SkipForward className="w-7 h-7 fill-white/80" />
              </button>

              <button
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Repeat"
              >
                <Repeat className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* Comments drawer toggle view */}
            {showComments && (
              <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between text-xs font-bold text-white/70 mb-2">
                  <span>Waveform Comments</span>
                  <span className="text-[11px] text-[#ff5500]">{comments.length} comments</span>
                </div>

                <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
                  {comments.map((c) => (
                    <div key={c.id} className="flex items-start gap-2 text-xs">
                      <span className="text-sm">{c.avatar}</span>
                      <div className="flex-1">
                        <span className="font-semibold text-white/90">{c.username}</span>
                        <span className="text-white/40 text-[10px] ml-1.5">
                          {formatTime(c.timestampSeconds)}
                        </span>
                        <p className="text-white/70 text-[11px]">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={`Comment at ${formatTime(progressSeconds)}...`}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#ff5500]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#ff5500] text-white text-xs font-bold rounded-lg"
                  >
                    Post
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
