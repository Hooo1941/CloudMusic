import React, { useEffect } from 'react';
import * as API from '../service/api';
function ApItest(): React.ReactElement {
  useEffect(() => {
    API.search({ keywords: 'you' })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getSongUrl({ id: 3932159, br: 320000 })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.phoneLogin({ phone: 15527371668, password: '123' })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.status()
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getPlayList({ uid: 24381616 })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getPlayListDetail({ id: 24381616 })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getSongDetail({ ids: [33894312] })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getLyric({ id: 33894312 })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getSongComment({ id: 33894312 })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
    API.getSearchSuggestion({ keywords: 'you' })
      .then((res) => console.log('success', res))
      .catch((err) => console.log('err', err));
  });
  return <div>ApItest</div>;
}

export default ApItest;
