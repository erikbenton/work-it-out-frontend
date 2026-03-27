import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useUser from "../../../hooks/useUser";
import Button from "@mui/material/Button";


export default function LoginRegister() {
  const { services } = useUser();
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

  const handleLoginAttempt = async (event?: React.SubmitEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    services.loginUser({ email, password }, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
      }
    });
  }

  return (
    <Stack component="form" spacing={1} sx={{ pt: 1 }} onSubmit={handleLoginAttempt}>
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
      <Button onClick={handleRegisterAttempt}>New? Register</Button>
    </Stack>
  )
}