import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { login } from '../../slices/AuthSlice';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleClick = () => {
    setLoading(true);
    setError('');
    const { username, password } = values;
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        // 登录成功后,isLoggedIn 会被更新,触发上面的 useEffect
      })
      .catch((err) => {
        setLoading(false);
        setError('Invalid username or password');
        // 如果你的错误对象有具体的错误信息,可以使用它
        // setError(err.message);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const renderForm = (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/*<Link variant="subtitle2" underline="hover">*/}
        {/*  Forgot password?*/}
        {/*</Link>*/}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  if (isLoggedIn) {
    return null; // 或者显示一个加载指示器
  }

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          {/*<Typography variant="h4">Sign in to Minimal</Typography>*/}

          {/*<Typography variant="body2" sx={{ mt: 2, mb: 5 }}>*/}
          {/*  Don&apos;t have an account?*/}
          {/*  <Link variant="subtitle2" sx={{ ml: 0.5 }}>*/}
          {/*    Get started*/}
          {/*  </Link>*/}
          {/*</Typography>*/}

          {/*<Stack direction="row" spacing={2}>*/}
          {/*  <Button*/}
          {/*    fullWidth*/}
          {/*    size="large"*/}
          {/*    color="inherit"*/}
          {/*    variant="outlined"*/}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}*/}
          {/*  >*/}
          {/*    <Iconify icon="eva:google-fill" color="#DF3E30" />*/}
          {/*  </Button>*/}

          {/*  <Button*/}
          {/*    fullWidth*/}
          {/*    size="large"*/}
          {/*    color="inherit"*/}
          {/*    variant="outlined"*/}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}*/}
          {/*  >*/}
          {/*    <Iconify icon="eva:facebook-fill" color="#1877F2" />*/}
          {/*  </Button>*/}

          {/*  <Button*/}
          {/*    fullWidth*/}
          {/*    size="large"*/}
          {/*    color="inherit"*/}
          {/*    variant="outlined"*/}
          {/*    sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}*/}
          {/*  >*/}
          {/*    <Iconify icon="eva:twitter-fill" color="#1C9CEA" />*/}
          {/*  </Button>*/}
          {/*</Stack>*/}

          {/*<Divider sx={{ my: 3 }}>*/}
          {/*  <Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
          {/*    OR*/}
          {/*  </Typography>*/}
          {/*</Divider>*/}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}