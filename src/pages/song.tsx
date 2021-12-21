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

interface IProp {
  location: RouteProps['location'];
}

function Song(props: IProp): React.ReactElement {
  function getUrlParamsByName(name: string) {
    // \b 边界
    // ?<= 向后匹配
    // 字符串转成正则表达式，其中的'\b'类型的特殊字符要多加一个'\'
    const reg = new RegExp(`(?<=\\b${name}=)[^&]*`),
      str = props.location?.search || '',
      target = str.match(reg);

    if (target) {
      return target[0];
    }
    return '0';
  }

  const [song, setSong] = useState<API.OneSongDetail>();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const id = +getUrlParamsByName('id');
    api
      .getSongDetail({ ids: [id] })
      .then((res) => setSong(res.songs[0]))
      .catch((res) => console.log(res));
    api
      .getSongUrl({ id: id })
      .then((res) => setUrl(res.url))
      .catch((res) => console.log(res));
  }, [props.location?.search]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          <Box sx={{ width: 1.0 }}>
            <img
              src={song?.al.picUrl}
              style={{ width: 240, height: 240, borderRadius: 800 }}
            ></img>
          </Box>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Song;
