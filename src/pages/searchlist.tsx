import React, { useState, useEffect } from 'react';
import { RouteProps } from 'react-router';
import * as api from '../service/api';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface IProp {
  location: RouteProps['location'];
}

function Searchlist(props: IProp): React.ReactElement {
  const [result, setResult] = useState<Array<API.Song>>();
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  const query = new URLSearchParams(props.location?.search);
  const keywords = query.get('keywords') || '';

  function totime(ms: number): string {
    let s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    s = s % 60;
    const ps = s > 9 ? s.toString() : '0' + s;
    const pm = m > 9 ? m.toString() : '0' + m;
    return pm + ':' + ps;
  }

  useEffect(() => {
    api
      .search({
        keywords: keywords,
        limit: 15,
        offset: (page - 1) * 15,
      })
      .then((res) => {
        setResult(res.songs || []);
        setPageLimit(Math.ceil(res.songCount / 15));
      })
      .catch((res) => console.log(res));
  }, [props.location?.search, page]);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h5">{'搜索结果：' + keywords}</Typography>
      <List sx={{ width: '100%' }}>
        {result?.map((item) => (
          <div key={item.id}>
            <ListItemButton
              alignItems="flex-start"
              component="a"
              href={'/#/song?id=' + item.id}
            >
              <ListItemText
                primary={item.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.artists.map((artist) => artist.name).join('/')}
                    </Typography>
                    {' — 专辑名称：' +
                      item.album.name +
                      ' — 歌曲时长：' +
                      totime(item.duration)}
                  </React.Fragment>
                }
              />
            </ListItemButton>
            <Divider variant="middle" component="li" />
          </div>
        ))}
      </List>

      <Pagination
        count={pageLimit}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </Container>
  );
}

export default Searchlist;
