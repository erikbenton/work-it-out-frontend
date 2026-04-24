import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useUser from "../../../hooks/useUser";
import Button from "@mui/material/Button";
import LoadingIcon from "../../layout/LoadingIcon";
import Alert from "@mui/material/Alert";
import UserErrorList from "../../layout/UserErrorList";


export default function LoginRegister() {
  const { loading, userMessages, setUserMessages, handleLoginAttempt, handleRegisterAttempt } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetState = () => {
    setEmail('')
    setPassword('');
  }

  const handleLoginClick = (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    handleLoginAttempt(email, password, resetState);
  }

  if (loading) {
    return (<LoadingIcon />);
  }

  return (
    <>
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
        <Button type='submit'>Login</Button>
        <Button onClick={() => handleRegisterAttempt(email, password, resetState)}>New? Register</Button>
      </Stack>
    </>
  )
}