import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import * as API from '../service/api';

function Login(): React.ReactElement {
  const [alert, setAlert] = useState<string>('');
  const [formValues, setFormValues] = useState({
    cellphone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    API.phoneLogin({
      phone: +formValues.cellphone,
      password: formValues.password,
    })
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          localStorage.setItem(
            'username',
            res.account === undefined ? '' : res.account.userName
          );
          window.location.href = '/';
        } else {
          setAlert(res.msg === undefined ? '登录失败' : res.msg);
        }
      })
      .catch((err) => {
        setAlert(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Collapse in={alert !== ''}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlert('');
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      </Collapse>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cellphone"
          label="手机号码"
          name="cellphone"
          autoComplete="cellphone"
          autoFocus
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          label="密码"
          name="password"
          autoComplete="password"
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          登录
        </Button>
        <Link href="https://music.163.com/">
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>
            {'注册账号'}
          </Button>
        </Link>
      </form>
    </Container>
  );
}

export default Login;
