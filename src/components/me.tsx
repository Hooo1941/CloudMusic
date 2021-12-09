import React from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';

function Me(): React.ReactElement {
  return (
    <IconButton color="inherit">
      <PersonIcon />
    </IconButton>
  );
}

export default Me;
