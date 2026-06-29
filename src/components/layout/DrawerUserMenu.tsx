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
import { useNavigate } from "react-router-dom";

type Props = {
  handleClose: () => void
}

export default function DrawerUserMenu({ handleClose }: Props) {
  const {
    user,
    loading,
    userMessages,
    setUserMessages,
    handleLoginAttempt,
    handleLogoutAttempt,
  } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    handleLoginAttempt(email, password, {
      onSuccess: () => {
        resetState();
      }
    });
  }

  const handleRegister = (event?: React.SyntheticEvent<EventTarget>) => {
    if (event) {
      event.preventDefault();
    }
    handleClose();
    navigate('/register');
  }

  const username = user.userInfo?.username ?? user.email?.split('@')[0] ?? '';

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" component="h2">
        Work-It-Out
      </Typography>
      {loading
        ? <LoadingIcon />
        : user.isLoggedIn
          ? <Stack spacing={1} sx={{ pt: 1 }}>
            <Typography>Hello, {username}</Typography>
            <Button
              variant="contained"
              sx={{ borderRadius: 5, textTransform: 'capitalize' }}
              onClick={logout}
            >
              Logout
            </Button>
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
                sx={{ borderRadius: 5, textTransform: 'capitalize' }}
                type="submit"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: grey[500], borderRadius: 5, textTransform: 'capitalize' }}
                onClick={(e) => handleRegister(e)}
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