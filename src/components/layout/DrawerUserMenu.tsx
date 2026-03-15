import { useState } from "react";
import useUser from "../../hooks/useUser";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";

export default function DrawerUserMenu() {
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

  const handleLoginAttempt = async (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    await handleLoginClick();
  }

  const handleLoginClick = async () => {
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
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" component="h2">
        Work-It-Out
      </Typography>
      {userInfo.isLoggedIn
        ? <Stack spacing={1} sx={{ pt: 1 }}>
          <Typography>Hello {userInfo.email!.split('@')[0]}</Typography>
          <Button variant="contained" onClick={handleLogoutAttempt}>Logout</Button>
        </Stack> :
        <form onSubmit={handleLoginAttempt}>
          <Stack spacing={1} sx={{ pt: 1 }}>
            <TextField
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
            <Button variant="contained" type="submit" onClick={handleLoginClick}>Login</Button>
            <Button variant="contained" sx={{ bgcolor: grey[500] }} onClick={handleRegisterAttempt}>Register</Button>
          </Stack>
        </form>
      }
    </Box >
  );
}