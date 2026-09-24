export interface Track {
  id: string;
  title: string;
  artist: string;
  location?: string;
  coverUrl: string;
  duration: number; // in seconds
  likesCount?: number;
  playsCount?: string;
  genre?: string;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestampSeconds: number;
}

export type TabType = 'home' | 'feed' | 'search' | 'likes' | 'upgrade';
