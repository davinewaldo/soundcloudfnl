/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Track, TabType } from './types';
import {
  CURRENT_PLAYING_TRACK,
  GRID_TRACKS,
  TODAYS_PICK_TRACK,
  MORE_TRACKS,
} from './data/mockTracks';
import { Header } from './components/Header';
import { LikesHeaderCard } from './components/LikesHeaderCard';
import { TrackGrid } from './components/TrackGrid';
import { TodaysPick } from './components/TodaysPick';
import { MoreLikeThis } from './components/MoreLikeThis';
import { MiniPlayer } from './components/MiniPlayer';
import { BottomNavBar } from './components/BottomNavBar';
import { NowPlayingModal } from './components/NowPlayingModal';
import { LikesView } from './components/LikesView';
import { FeedView } from './components/FeedView';
import { SearchView } from './components/SearchView';
import { UpgradeView } from './components/UpgradeView';
import { audioEngine } from './utils/audioEngine';
import { Smartphone, Maximize2, CheckCircle, Volume2, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [currentTrack, setCurrentTrack] = useState<Track>(CURRENT_PLAYING_TRACK);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressSeconds, setProgressSeconds] = useState<number>(45);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Maintain liked tracks collection
  const [likedTracks, setLikedTracks] = useState<Track[]>([
    CURRENT_PLAYING_TRACK,
    GRID_TRACKS[0],
    GRID_TRACKS[1],
    GRID_TRACKS[2],
    GRID_TRACKS[3],
    TODAYS_PICK_TRACK,
    MORE_TRACKS[2],
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // Play a specific track
  const handlePlayTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setProgressSeconds(0);
    audioEngine.playTrack(track.id, () => {
      setProgressSeconds((prev) => {
        if (prev >= track.duration) {
          return 0;
        }
        return prev + 1;
      });
    });
  }, []);

  // Play/Pause toggle
  const handlePlayPauseToggle = useCallback(() => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.resume(() => {
        setProgressSeconds((prev) => {
          if (prev >= (currentTrack.duration || 180)) {
            return 0;
          }
          return prev + 1;
        });
      });
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack.duration]);

  // Toggle Heart like state for current track
  const handleToggleCurrentHeart = useCallback(() => {
    const nextLiked = !currentTrack.isLiked;
    const updated = { ...currentTrack, isLiked: nextLiked };
    setCurrentTrack(updated);

    if (nextLiked) {
      setLikedTracks((prev) => [updated, ...prev.filter((t) => t.id !== updated.id)]);
      showToast('Added to Your Likes');
    } else {
      setLikedTracks((prev) => prev.filter((t) => t.id !== updated.id));
      showToast('Removed from Your Likes');
    }
  }, [currentTrack]);

  // Toggle like by ID
  const handleToggleLikeById = useCallback((trackId: string) => {
    setLikedTracks((prev) => {
      const exists = prev.some((t) => t.id === trackId);
      if (exists) {
        showToast('Removed from Your Likes');
        return prev.filter((t) => t.id !== trackId);
      } else {
        const all = [CURRENT_PLAYING_TRACK, ...GRID_TRACKS, TODAYS_PICK_TRACK, ...MORE_TRACKS];
        const target = all.find((t) => t.id === trackId);
        if (target) {
          showToast('Added to Your Likes');
          return [{ ...target, isLiked: true }, ...prev];
        }
        return prev;
      }
    });

    if (currentTrack.id === trackId) {
      setCurrentTrack((prev) => ({ ...prev, isLiked: !prev.isLiked }));
    }
  }, [currentTrack.id]);

  // Shuffle liked tracks
  const handleShuffleLikes = useCallback(() => {
    if (likedTracks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * likedTracks.length);
    const selected = likedTracks[randomIndex];
    handlePlayTrack(selected);
    showToast(`Shuffling Likes: Playing "${selected.title}"`);
  }, [likedTracks, handlePlayTrack]);

  // Seek time
  const handleSeek = (newSeconds: number) => {
    setProgressSeconds(Math.floor(newSeconds));
  };

  // Next and Prev track logic
  const handleNext = () => {
    const all = [CURRENT_PLAYING_TRACK, ...GRID_TRACKS, TODAYS_PICK_TRACK, ...MORE_TRACKS];
    const currentIndex = all.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % all.length;
    handlePlayTrack(all[nextIndex]);
  };

  const handlePrev = () => {
    const all = [CURRENT_PLAYING_TRACK, ...GRID_TRACKS, TODAYS_PICK_TRACK, ...MORE_TRACKS];
    const currentIndex = all.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + all.length) % all.length;
    handlePlayTrack(all[prevIndex]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-start sm:py-6 font-sans">
      {/* Top Bar for Desktop View: Mode switch and SoundCloud branding */}
      <header className="w-full max-w-4xl px-4 py-2 hidden sm:flex items-center justify-between text-xs text-white/60 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
            SoundCloud Mobile Dark Rebrand
          </span>
          <span className="text-white/30">|</span>
          <span className="text-white/50">Pixel-accurate reconstruction</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
            title="Toggle device bezel frame"
          >
            {deviceFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full-Bleed View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>Device Frame View</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Mobile App Container */}
      <main
        className={`w-full transition-all duration-300 relative bg-[#0b0b0d] text-white ${
          deviceFrameMode
            ? 'max-w-[412px] h-[890px] rounded-[48px] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] ring-1 ring-white/15 border-[8px] border-[#1d1d23] overflow-hidden flex flex-col'
            : 'max-w-md min-h-screen flex flex-col'
        }`}
      >
        {/* Phone Speaker Notch Ear-piece on hardware bezel */}
        {deviceFrameMode && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#151518] rounded-full z-50 pointer-events-none"></div>
        )}

        {/* 1. Header Area: 3.17 Time, Status Icons, Abstract Artist Avatar, 'Go Pro' button, Search, Notifications, Messages, Subtle Cloud Logo */}
        <Header
          onSearchClick={() => setCurrentTab('search')}
          onNotificationsClick={() => showToast('No new notifications')}
          onMessagesClick={() => showToast('Direct Messages: 0 unread')}
          onGoProClick={() => setCurrentTab('upgrade')}
          onProfileClick={() => showToast('Viewing SoundCloud Artist Profile')}
        />

        {/* 2. Scrollable Body Views according to selected Tab */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none flex flex-col">
          {currentTab === 'home' && (
            <div className="flex flex-col pb-28">
              {/* Content Area - Top: Large 'Your likes' card with solid orange heart and shuffle icon */}
              <LikesHeaderCard
                likesCount={likedTracks.length}
                onCardClick={() => setCurrentTab('likes')}
                onShuffleClick={(e) => {
                  e.stopPropagation();
                  handleShuffleLikes();
                }}
                onPlayLikesClick={(e) => {
                  e.stopPropagation();
                  if (likedTracks.length > 0) {
                    handlePlayTrack(likedTracks[0]);
                  }
                }}
                isPlayingLikes={isPlaying && likedTracks.some((t) => t.id === currentTrack.id)}
              />

              {/* Content Area - Middle (4-card grid):
                  2x2 grid with exact artists, titles, and locations:
                  - hipdut bb / bosca
                  - Yoga BeatMap / Jakarta, Indone...
                  - LERDUT THROW... / LERBE PIDUT
                  - MMG (My Mine... / Slicejax
              */}
              <TrackGrid
                tracks={GRID_TRACKS}
                currentTrackId={currentTrack.id}
                isPlaying={isPlaying}
                onTrackSelect={handlePlayTrack}
              />

              {/* Content Area - Today's Pick:
                  - Label 'TODAY'S PICK'
                  - Title 'Hot For You 🔥'
                  - Single large card with 'VOL.19' cover art, title, artist, play button
                  - Text '386 people just liked this track' with heart icon
              */}
              <TodaysPick
                track={TODAYS_PICK_TRACK}
                currentTrackId={currentTrack.id}
                isPlaying={isPlaying}
                onPlayPick={handlePlayTrack}
                onLikeToggle={handleToggleLikeById}
              />

              {/* Content Area - More:
                  - Label 'More of what you like'
                  - Horizontal scroll carousel with partial card view
              */}
              <MoreLikeThis
                tracks={MORE_TRACKS}
                currentTrackId={currentTrack.id}
                isPlaying={isPlaying}
                onTrackSelect={handlePlayTrack}
              />
            </div>
          )}

          {/* Dedicated Tab Views */}
          {currentTab === 'likes' && (
            <LikesView
              likedTracks={likedTracks}
              currentTrackId={currentTrack.id}
              isPlaying={isPlaying}
              onTrackSelect={handlePlayTrack}
              onToggleLike={handleToggleLikeById}
              onShuffleLikes={handleShuffleLikes}
            />
          )}

          {currentTab === 'feed' && (
            <FeedView onPlayTrack={handlePlayTrack} />
          )}

          {currentTab === 'search' && (
            <SearchView
              onPlayTrack={handlePlayTrack}
              availableTracks={[CURRENT_PLAYING_TRACK, ...GRID_TRACKS, TODAYS_PICK_TRACK, ...MORE_TRACKS]}
            />
          )}

          {currentTab === 'upgrade' && <UpgradeView />}
        </div>

        {/* 3. Floating Mini-Player:
            - Features 'BKB Mandarin Fly Higher...' art, title, and artist
            - Control Icons: Pause, Queue, Heart (highlighted in orange)
            - Progress bar with SoundCloud orange accent
        */}
        <MiniPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          progressSeconds={progressSeconds}
          onPlayPauseToggle={handlePlayPauseToggle}
          onHeartToggle={handleToggleCurrentHeart}
          onQueueClick={() => showToast('Up Next: 8 tracks in queue')}
          onExpandPlayer={() => setIsPlayerExpanded(true)}
        />

        {/* 4. Bottom Navigation Bar (Modified Area of Focus):
            - 5 tabs: Home, Feed, Search, Likes (New 4th Tab with solid Heart icon labeled 'Likes'), Upgrade
        */}
        <BottomNavBar
          currentTab={currentTab}
          onTabChange={(tab) => setCurrentTab(tab)}
        />

        {/* 5. Interactive Fullscreen SoundCloud Now Playing Modal with Waveform */}
        <NowPlayingModal
          isOpen={isPlayerExpanded}
          track={currentTrack}
          isPlaying={isPlaying}
          progressSeconds={progressSeconds}
          onClose={() => setIsPlayerExpanded(false)}
          onPlayPause={handlePlayPauseToggle}
          onPrev={handlePrev}
          onNext={handleNext}
          onSeek={handleSeek}
          onToggleLike={handleToggleCurrentHeart}
        />

        {/* Quick Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#18181f]/95 border border-[#ff5500]/50 text-white text-xs font-semibold shadow-xl shadow-black/80 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#ff5500]"></span>
            <span>{toastMessage}</span>
          </div>
        )}
      </main>

      {/* Footer info in desktop mode */}
      <footer className="w-full max-w-md px-4 mt-3 hidden sm:flex items-center justify-between text-[11px] text-white/40">
        <span>SoundCloud Rebrand Mobile Architecture</span>
        <span className="text-[#ff5500] font-mono">Dark Charcoal #0B0B0D / Orange #FF5500</span>
      </footer>
    </div>
  );
}
