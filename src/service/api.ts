import axios from 'axios';
import { Md5 } from 'ts-md5/dist/md5';

// axios.defaults.baseURL = 'http://120.76.192.143:3000/';
axios.defaults.withCredentials = true;

export async function search(option: API.Search): Promise<API.SearchResponse> {
  try {
    const response = await axios.get<API.APIResponse<API.SearchResponse>>(
      '/search',
      { params: option }
    );
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data.result ?? Promise.resolve({ songCount: 0 });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSearchSuggestion(
  option: API.Suggest
): Promise<API.SuggestResponse> {
  try {
    const response = await axios.get<API.APIResponse<API.SuggestResponse>>(
      '/search/suggest',
      { params: option }
    );
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data.result ?? Promise.resolve({ songs: [] });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSongUrl(
  option: API.SongUrl
): Promise<API.SongUrlResponse> {
  try {
    const response = await axios.get<
      API.APIResponse<Array<API.SongUrlResponse>>
    >('/song/url', { params: option });
    if (
      response.data.code !== 200 ||
      response.data.data == null ||
      response.data.data?.length === 0
    )
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data.data[0] ?? Promise.resolve({ id: 0, url: '' });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function phoneLogin(
  option: API.Login
): Promise<API.LoginResponse> {
  try {
    option.md5password = Md5.hashStr(option.password);
    option.password = '';
    const response = await axios.post<API.LoginResponse>('/login/cellphone', {
      option,
    });
    if (response.data.code !== 200 || response.data.cookie === null)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function status(): Promise<API.UserProfile> {
  try {
    const response = await axios.get<API.UserProfileResponse>('/login/status');
    if (response.data.data === undefined)
      return Promise.reject('Unknown Error');
    if (
      response.data.data.code !== 200 ||
      response.data.data.profile === undefined
    )
      return Promise.reject(response.data.data.msg ?? 'Unknown Error');
    return response.data.data.profile;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPlayList(
  option: API.Playlist
): Promise<API.PlaylistResponse> {
  try {
    const response = await axios.get<API.PlaylistResponse>('/user/playlist', {
      params: option,
    });
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getPlayListDetail(
  option: API.PlaylistDetail
): Promise<API.PlaylistDetailResponse> {
  try {
    const response = await axios.get<API.PlaylistDetailResponse>(
      '/playlist/detail',
      { params: option }
    );
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getSongDetail(
  option: API.SongDetail
): Promise<API.SongDetailResponse> {
  try {
    const response = await axios.get<API.SongDetailResponse>('/song/detail', {
      params: { ids: option.ids.join(',') },
    });
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getLyric(option: API.Lyric): Promise<string> {
  try {
    const response = await axios.get<API.LyricResponse>('/lyric', {
      params: option,
    });
    if (
      response.data.code !== 200 ||
      response.data.lrc === undefined ||
      response.data.lrc.lyric === ''
    )
      return Promise.resolve('暂无歌词');
    return response.data.lrc.lyric ?? Promise.resolve('暂无歌词');
  } catch (error) {
    return Promise.resolve('暂无歌词');
  }
}

export async function getSongComment(
  option: API.SongComment
): Promise<API.SongCommentResponse> {
  try {
    const response = await axios.get<API.SongCommentResponse>(
      '/comment/music',
      { params: option }
    );
    if (response.data.code !== 200)
      return Promise.reject(response.data.msg ?? 'Unknown Error');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// TODO(加分项): /user/follows

// TODO(加分项): playmusic addcomment
