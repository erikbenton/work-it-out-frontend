import { useState } from "react";
import useUser from "../../hooks/useUser";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import LoadingIcon from "./LoadingIcon";
import Alert from "@mui/material/Alert";
import UserErrorList from "./UserErrorList";

export default function DrawerUserMenu() {
  const {
    userInfo,
    loading,
    userMessages,
    setUserMessages,
    handleLoginAttempt,
    handleLogoutAttempt,
    handleRegisterAttempt
  } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setEmail('');
    setPassword('');
  }

  const logout = () => {
    resetState();
    handleLogoutAttempt();
  }

  const handleLogin = (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    handleLoginAttempt(email, password, resetState);
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" component="h2">
        Work-It-Out
      </Typography>
      {loading
        ? <LoadingIcon />
        : userInfo.isLoggedIn
          ? <Stack spacing={1} sx={{ pt: 1 }}>
            <Typography>Hello, {userInfo.email!.split('@')[0]}</Typography>
            <Button variant="contained" sx={{ borderRadius: 5 }} onClick={logout}>Logout</Button>
          </Stack> :
          <form onSubmit={handleLogin}>
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
              <Button
                variant="contained"
                sx={{ borderRadius: 5 }}
                type="submit"
                onClick={() => handleLoginAttempt(email, password, resetState)}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: grey[500], borderRadius: 5 }}
                onClick={() => handleRegisterAttempt(email, password, resetState)}
              >
                Register
              </Button>
            </Stack>
            {userMessages.length > 0 &&
              <Alert
                severity="error"
                onClose={() => setUserMessages([])}
                sx={{ mt: 2, px: 1 }}
                slotProps={{ action: { sx: { p: 0 } } }}
              >
                <UserErrorList />
              </Alert>
            }
          </form>
      }
    </Box >
  );
}