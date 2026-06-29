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
import { Collapse, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { weightUnits, type WeightUnit } from "../../types/weightUnit";
import { distanceUnits, type DistanceUnit } from "../../types/distanceUnit";

export default function RegisterLogin() {
  const { loading, userMessages, setUserMessages, handleLoginAttempt, handleRegisterAttempt } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [bodyWeight, setBodyWeight] = useState<number | undefined>(undefined);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(weightUnits[0]);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(distanceUnits[0]);
  const [redirecting, setRedirecting] = useState(false);
  const [registering, setRegistering] = useState(false);
  const navigate = useNavigate();


  const resetState = () => {
    setEmail('')
    setPassword('');
  }

  const handleLoginClick = (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    handleLoginAttempt(email, password, {
      onSuccess: () => {
        setRedirecting(true);
        resetState();
        navigate('/');
      }
    });
  }

  const handleRegisterClick = (event?: React.SyntheticEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const userInfo = {
      weightUnit,
      distanceUnit,
      bodyWeight,
      username: username === '' ? undefined : username
    }
    handleRegisterAttempt(email, password, userInfo, {
      onSuccess: () => {
        setRedirecting(true);
        resetState();
        navigate('/');
      }
    });
  }

  const handleBodyWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setBodyWeight(undefined);
    }
    const newWeight = Number(event.target.value);
    if (newWeight > 0) {
      setBodyWeight(newWeight);
    }
  }

  const handleWeightUnit = (_event: React.ChangeEvent<HTMLInputElement, Element>, newUnit: string) => {
    if (_event) {
      _event.preventDefault();
    }
    const unit = newUnit as WeightUnit;
    setWeightUnit(unit)
  }

  const handleDistanceUnit = (_event: React.ChangeEvent<HTMLInputElement, Element>, newUnit: string) => {
    if (_event) {
      _event.preventDefault();
    }
    const unit = newUnit as DistanceUnit;
    setDistanceUnit(unit)
  }

  const toggleSignUp = (event?: React.SyntheticEvent<EventTarget>) => {
    if (event) {
      event.preventDefault();
    }
    setRegistering(!registering);
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
      <Collapse in={!registering}>
        <Stack component="form" spacing={2} sx={{ pt: 1, mb: 2 }} onSubmit={handleLoginClick}>
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
        </Stack>
      </Collapse>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{ textTransform: 'none', width: '33%', borderRadius: 5 }}
          onClick={(e) => toggleSignUp(e)}
        >
          {registering ? 'Back to Login' : 'New? Sign up!'}
        </Button>
      </Box>
      <Collapse in={registering}>
        <Stack component="form" spacing={2} sx={{ mt: 2 }} onSubmit={handleRegisterClick}>
          <TextField
            id="new-email"
            name="new-email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="new-password"
            name="new-password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="username"
            name="username"
            label="Username"
            placeholder="(optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={username ?? ''}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="bodyweight"
            name="bodyweight"
            label={`Bodyweight (${weightUnit})`}
            placeholder="(optional)"
            type="number"
            fullWidth
            variant="outlined"
            value={bodyWeight ?? ''}
            onChange={handleBodyWeight}
          />
          <FormControl>
            <FormLabel id="sign-up-weight-units">Weight Units</FormLabel>
            <RadioGroup
              row
              aria-labelledby="sign-up-weight-units"
              name="sign-up-weight-group"
              value={weightUnit}
              onChange={handleWeightUnit}
            >
              {weightUnits.map(unit => (
                <FormControlLabel key={unit} value={unit} control={<Radio />} label={unit} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="sign-up-distance-units">Distance Units</FormLabel>
            <RadioGroup
              row
              aria-labelledby="sign-up-distance-units"
              name="sign-up-distance"
              value={distanceUnit}
              onChange={handleDistanceUnit}
            >
              {distanceUnits.map(unit => (
                <FormControlLabel key={unit} value={unit} control={<Radio />} label={unit} />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: 'center', textTransform: 'capitalize', width: '50%', borderRadius: 5 }}
          >
            Create Account
          </Button>
        </Stack>
      </Collapse>
    </Box>
  )
}