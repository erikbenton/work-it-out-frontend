import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import useUser from "../../hooks/useUser";
import LoadingIcon from "../layout/LoadingIcon";
import UserErrorList from "../layout/UserErrorList";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";


export default function RegisterLogin() {
  const { loading, userMessages, setUserMessages, handleLoginAttempt2, handleRegisterAttempt } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirecting, setRedirecting] = useState(false)
  const navigate = useNavigate();

  const resetState = () => {
    setEmail('')
    setPassword('');
  }

  const handleLoginClick = (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    handleLoginAttempt2(email, password, {
      onSuccess: () => {
        setRedirecting(true);
        resetState();
        navigate('/');
      }
    });
  }

  if (loading || redirecting) {
    return (<LoadingIcon />);
  }

  return (
    <Box className="w-full md:w-2/3 px-3" sx={{ mt: 3 }}>
      {userMessages.length > 0 &&
        <Alert
          severity="error"
          onClose={() => setUserMessages([])}
          sx={{ mb: 2 }}
          slotProps={{ action: { sx: { p: 0 } } }}
        >
          <UserErrorList />
        </Alert>
      }
      <Stack component="form" spacing={2} sx={{ pt: 1 }} onSubmit={handleLoginClick}>
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
        <Button
          type='submit'
          sx={{ alignSelf: 'center', textTransform: 'capitalize', width: '33%', borderRadius: 5 }}
        >
          Login
        </Button>
        <Button
          sx={{ alignSelf: 'center', textTransform: 'capitalize', width: '33%', borderRadius: 5 }}
          onClick={() => handleRegisterAttempt(email, password, resetState)}
        >
          New? Register
        </Button>
      </Stack>
    </Box>
  )
}