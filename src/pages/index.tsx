import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import * as api from '../service/api';

function Index(): React.ReactElement {
  const [playlist, setPlaylist] = useState<Array<API.OneSongDetail>>([]);
  const [custom, setCustom] = useState<Array<API.OneSongDetail>>([]);

  function shuffle(arr: Array<API.OneSongDetail>): Array<API.OneSongDetail> {
    return arr.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    api
      .getPlayListDetail({ id: 3778678 })
      .then((res) =>
        setPlaylist(shuffle(res.playlist?.tracks || []).slice(0, 4))
      )
      .catch((err) => console.log('err', err));
    api
      .getPlayListDetail({ id: 2829883282 })
      .then((res) => setCustom(shuffle(res.playlist?.tracks || []).slice(0, 4)))
      .catch((err) => console.log('err', err));
  }, []);

  return (
    <div>
      <div className="hot">
        <ImageList sx={{ width: 0.75, mx: 'auto' }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div" sx={{ zIndex: 0 }}>
              热门歌曲
            </ListSubheader>
          </ImageListItem>
          {playlist.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => {
                location.href = '/#/song?id=' + item.id;
              }}
            >
              <img src={item.al.picUrl} alt={item.al.name} loading="lazy" />
              <ImageListItemBar
                title={item.name}
                subtitle={item.ar.map((e) => e.name).join(', ')}
                actionIcon={
                  <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="custom">
        {' '}
        <ImageList sx={{ width: 0.75, mx: 'auto' }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">私人雷达</ListSubheader>
          </ImageListItem>
          {custom.map((item) => (
            <ImageListItem
              key={item.id}
              onClick={() => {
                location.href = '/#/song?id=' + item.id;
              }}
            >
              <img src={item.al.picUrl} alt={item.al.name} loading="lazy" />
              <ImageListItemBar
                title={item.name}
                subtitle={item.ar.map((e) => e.name).join(', ')}
                actionIcon={
                  <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default Index;
