import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import useUser from '../../hooks/useUser';

export default function Home() {
  const { userInfo, services } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterAttempt = async () => {
    services.registerUser({ email, password }, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
      }
    });
  }

  const handleLoginAttempt = async () => {
    services.loginUser({ email, password }, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
      }
    });
  }

  const handleLogoutAttempt = async () => {
    services.logoutUser(undefined, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
      }
    });
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Typography variant="h4" component="h2">
        Work-It-Out
      </Typography>
      <Stack role="form" spacing={1} sx={{ pt: 1 }}>
        {userInfo.isLoggedIn
          ? <>
            <Typography>Hello {userInfo.email!}</Typography>
            <Button onClick={handleLogoutAttempt}>Logout</Button>
          </> :
          <>
            <TextField
              autoFocus
              id="email"
              name="email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLoginAttempt}>Login</Button>
            <Button onClick={handleRegisterAttempt}>New? Register</Button>
          </>
        }
      </Stack>
    </Box>
  );
}