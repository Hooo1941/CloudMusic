import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Popper from '@mui/material/Popper';
import * as api from '../service/api';

const StyledSearch = styled('div')`
  /* display: flex;
  flex-direction: column; */
`;

const StyledInputElement = styled('input')`
  width: 300px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 10px;
  padding: 6px 10px;
  color: #20262d;
  transition: width 300ms ease;

  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }

  &:focus {
    outline: none;
    width: 320px;
    transition: width 200ms ease-out;
  }
`;

const StyledPopper = styled(Popper)`
  width: 360px;
`;

const StyledList = styled(List)`
  position: absolute;
  background-color: WhiteSmoke;
`;

const SearchInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export default function SearchBar(): React.ReactElement {
  const [search, setSearch] = useState('');
  const [suggest, setSuggest] = useState(Array<API.Song>());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const changeSearch = useCallback((e) => {
    setSearch(e);
  }, []);

  useEffect(() => {
    if (search === '') {
      setSuggest([]);
      return;
    }
    let newFetch = true;
    const id = setTimeout(() => {
      api
        .getSearchSuggestion({ keywords: search })
        .then((res) => {
          if (newFetch) {
            if (res.songs === undefined) setSuggest([]);
            else setSuggest(res.songs);
          }
        })
        .catch((e) => {
          console.log(e);
          if (newFetch) setSuggest([]);
        });
    }, 500);
    return () => {
      clearTimeout(id);
      newFetch = false;
    };
  }, [search]);

  function suggestlist() {
    if (suggest.length > 0) {
      return suggest.map((e) => (
        <React.Fragment key={Math.random()}>
          <ListItem
            alignItems="flex-start"
            onClick={() => {
              // TODO: Jump to details
              console.log(e);
            }}
          >
            <ListItemText
              primary={
                e.name.length >= 20 ? e.name.slice(0, 20) + '...' : e.name
              }
              secondary={e.artists.map((e) => e.name).join(', ')}
            />
          </ListItem>
          <Divider sx={{ margin: '0 0 0 0' }} variant="inset" component="li" />
        </React.Fragment>
      ));
    }
  }

  const id =
    suggest.length > 0 && Boolean(anchorEl) ? 'simple-popper' : undefined;
  const open = suggest.length > 0;

  return (
    <StyledSearch>
      <SearchInput
        placeholder="搜索歌曲"
        onChange={(e) => {
          changeSearch(e.target.value);
          setAnchorEl(e.currentTarget);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            console.log(e);
            // TODO: 路由切换
          }
        }}
      />
      {suggest.length > 0 && (
        <StyledPopper id={id} open={open} anchorEl={anchorEl}>
          <StyledList sx={{ width: '100%', maxWidth: 360 }}>
            {suggestlist()}
          </StyledList>
        </StyledPopper>
      )}
    </StyledSearch>
  );
}
