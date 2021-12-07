declare namespace API {
  type APIResponse<T> = {
    code: number;
    msg?: string;
    result?: T;
    data?: T;
  };

  enum SearchType {
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

  type Search = {
    keywords: string;
    limit?: number;
    offset?: number;
    type?: SearchType;
  };

  type Artist = {
    id: number;
    name: string;
    img1v1Url: string;
  };

  type Album = {
    id: number;
    name: string;
    size: number;
  };

  type Song = {
    id: number;
    name: string;
    artist: Artist;
    duration: number; // ms
    mvid: number;
  };

  type SearchResponse = {
    songs?: Array<Song>;
    hasMore?: boolean;
    songCount: number;
  };

  type SongUrl = {
    id: number;
    br: number;
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
    md5password?: string;
  };

  type LoginResponse = {
    code: number;
    msg?: string;
    token?: string;
    cookie?: string;
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
}
