import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import useUser from "../../../hooks/useUser";
import Button from "@mui/material/Button";
import LoadingIcon from "../../layout/LoadingIcon";


export default function LoginRegister() {
  const { services, loading, setLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterAttempt = async () => {
    setLoading(true);
    services.registerUser({ email, password }, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
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
    setLoading(true);
    services.loginUser({ email, password }, {
      onSuccess: () => {
        setEmail('')
        setPassword('');
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      }
    });
  }

  if (loading) {
    return (<LoadingIcon />);
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