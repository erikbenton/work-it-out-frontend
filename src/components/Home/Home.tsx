import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { getUserInfo, login, register } from '../../requests/authentication';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterAttempt = async () => {
    const isRegistered = await register(email, password);
    if (isRegistered) {
      setEmail('')
      setPassword('');
    }
  }

  const handleLoginAttempt = async () => {
    const isLoggedIn = await login(email, password);
    if (isLoggedIn) {
      setEmail('')
      setPassword('');
    }
  }

  const handleUserInfo = async () => {
    const response = await getUserInfo();
    console.log(response);
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Typography variant="h4" component="h2">
        Work-It-Out
      </Typography>
      <Stack role="form" spacing={1} sx={{ pt: 1 }}>
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
        <Button onClick={handleUserInfo}>Get User</Button>
        <Button onClick={handleRegisterAttempt}>New? Register</Button>
      </Stack>
    </Box>
  );
}