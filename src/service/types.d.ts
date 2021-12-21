declare namespace API {
  type APIResponse<T> = {
    code: number;
    msg?: string;
    result?: T;
    data?: T;
  };

  export enum SearchType {
    Single = 1,
    Album = 10,
    Singer = 100,
    SongList = 1000,
    User = 1002,
    MV = 1004,
    Lyric = 1006,
    BoarderCast = 1009,
    Video = 1014,
    Composite = 1018,
  }

  export type Search = {
    keywords: string;
    limit?: number;
    offset?: number;
    type?: SearchType;
  };

  export type Artist = {
    id: number;
    name: string;
    img1v1Url: string;
  };

  export type Album = {
    id: number;
    name: string;
    size: number;
  };

  export type Song = {
    id: number;
    name: string;
    artists: Array<Artist>;
    album: Album;
    duration: number; // ms
    // mvid: number;
  };

  type SearchResponse = {
    songs?: Array<Song>;
    hasMore?: boolean;
    songCount: number;
  };

  type Suggest = {
    keywords: string;
    type?: string;
  };

  type SuggestResponse = {
    songs: Array<Song>;
  };

  type SongUrl = {
    id: number;
    br?: number;
  };

  type SongUrlResponse = {
    id: number;
    url: string;
    br: number;
    size: number;
    md5: string;
    code: number;
    type: string;
  };

  type Login = {
    phone: number;
    password: string;
    md5_password?: string;
  };

  type LoginResponse = {
    code: number;
    msg?: string;
    token?: string;
    cookie?: string;
    account?: {
      userName: string;
    };
  };

  type UserProfile = {
    userId: number;
    nickname: string;
    avatarUrl: string;
    userName: string;
  };

  type UserProfileResponse = {
    data?: {
      code: number;
      profile?: UserProfile;
      msg?: string;
    };
  };

  type Playlist = {
    uid: number;
    limit?: number;
    offset?: number;
  };

  type PlaylistResponse = {
    code: number;
    msg?: string;
    playlist?: Array<{
      id: number;
      name: string;
      coverImgUrl: string;
    }>;
  };

  type PlaylistDetail = {
    id: number;
    s?: number;
  };

  type PlaylistDetailResponse = {
    code: number;
    msg?: string;
    playlist?: {
      id: number;
      name: string;
      description: string;
      coverImgUrl: string;
      playCount: number;
      tags: Array<string>;
      trackIds: Array<{
        id: number;
      }>;
    };
  };

  type SongDetail = {
    ids: Array<number>;
  };

  type SongDetailResponse = {
    code: number;
    msg?: string;
    songs: Array<OneSongDetail>;
  };

  type OneSongDetail = {
    name: string;
    id: number;
    ar: Array<{
      id: number;
      name: string;
    }>;
    al: {
      // album?
      id: number;
      name: string;
      picUrl: string;
    };
  };

  type Lyric = {
    id: number;
  };

  type LyricResponse = {
    code: number;
    msg?: string;
    lrc?: { lyric: string };
  };

  type SongComment = {
    id: number;
    limit?: number;
    offset?: number;
    before?: number;
  };

  type Comment = {
    user: {
      nickname: string;
      avatarUrl: string;
    };
    content: string;
    timeStr: string;
    likedCount: number;
    liked: boolean;
  };

  type SongCommentResponse = {
    code: number;
    msg?: string;
    hotComments?: Array<Comment>;
    comments?: Array<Comment>;
  };
  // TODO: /comment/floor
}
