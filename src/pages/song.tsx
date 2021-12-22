import React from 'react';
import Container from '@mui/material/Container';
import { RouteProps } from 'react-router';
import { useEffect, useState } from 'react';
import * as api from '../service/api';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Pagination from '@mui/material/Pagination';

interface IProp {
  location: RouteProps['location'];
}

function Song(props: IProp): React.ReactElement {
  const [song, setSong] = useState<API.OneSongDetail>();
  const [url, setUrl] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [lyric, setLyric] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [comments, setComments] = useState<Array<API.Comment>>();

  useEffect(() => {
    const query = new URLSearchParams(props.location?.search);
    const id = parseInt(query.get('id') || '1', 10);
    api
      .getSongDetail({ ids: [id] })
      .then((res) => setSong(res.songs[0]))
      .catch((res) => console.log(res));
    api
      .getSongUrl({ id: id })
      .then((res) => setUrl(res.url))
      .catch((res) => console.log(res));
    api
      .getLyric({ id: id })
      .then((res) => setLyric(parseLyric(res)))
      .catch((res) => console.log(res));
  }, [props.location?.search]);

  useEffect(() => {
    const query = new URLSearchParams(props.location?.search);
    const id = parseInt(query.get('id') || '1', 10);
    api
      .getSongComment({ id: id, limit: 10, offset: (page - 1) * 10 })
      .then((res) => {
        setComments(res.comments);
        setTotal(res.total || 1);
      })
      .catch((res) => console.log(res));
  }, [props.location?.search, page]);

  function parseLyric(lyric: string) {
    return lyric.replace(/\[[0-9:.m]+\]/gi, '');
  }

  function a11yProps(index: number) {
    return {
      id: `song-tab-${index}`,
      'aria-controls': `song-tabpanel-${index}`,
    };
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <Box sx={{ width: 1.0 }}>
            <img
              src={song?.al.picUrl}
              style={{ width: 240, height: 240, borderRadius: 800 }}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Tabs value={tabIndex} onChange={(_, value) => setTabIndex(value)}>
            <Tab label="歌曲信息" {...a11yProps(0)} />
            <Tab label="歌词" {...a11yProps(1)} />
            <Tab label="评论" {...a11yProps(2)} />
          </Tabs>

          <br />

          <div
            role="tabpanel"
            hidden={tabIndex !== 0}
            id={'song-tabpanel-0'}
            aria-labelledby={'song-tab-0'}
          >
            {tabIndex === 0 && (
              <Box>
                <Typography variant="h3" component="div" gutterBottom>
                  {song?.name}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  {song?.ar.map((e) => e.name).join(', ')}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {song?.al.name}
                </Typography>
                <Link href={url}>
                  <Button variant="contained" startIcon={<DownloadIcon />}>
                    下载音乐
                  </Button>
                </Link>
              </Box>
            )}
          </div>

          <div
            role="tabpanel"
            hidden={tabIndex !== 1}
            id={'song-tabpanel-1'}
            aria-labelledby={'song-tab-1'}
          >
            {tabIndex === 1 && (
              <div style={{ whiteSpace: 'pre-wrap' }}>{lyric}</div>
            )}
          </div>

          <div
            role="tabpanel"
            hidden={tabIndex !== 2}
            id={'song-tabpanel-2'}
            aria-labelledby={'song-tab-2'}
          >
            {tabIndex === 2 && (
              <Box>
                <List
                  sx={{
                    width: '100%',
                  }}
                >
                  {comments?.map((c) => (
                    <div key={c.commentId}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt={c.user.nickname}
                            src={c.user.avatarUrl}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={c.content}
                          secondary={c.user.nickname + ' ' + c.timeStr}
                        />
                      </ListItem>
                      <Divider variant="middle" component="li" />
                    </div>
                  ))}
                </List>
                <Pagination
                  count={Math.ceil(total / 10)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Song;
