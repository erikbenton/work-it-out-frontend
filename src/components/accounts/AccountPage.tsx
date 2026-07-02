import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { weightUnits, type WeightUnit } from "../../types/weightUnit";
import { distanceUnits, type DistanceUnit } from "../../types/distanceUnit";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Collapse, Paper, Typography } from "@mui/material";
import LoadingIcon from "../layout/LoadingIcon";
import { bgBlue } from "../../utils/styling";

export default function AccountsPage() {
  const { user, services } = useUser();
  const [username, setUsername] = useState(user.userInfo?.username);
  const [bodyWeight, setBodyWeight] = useState<number | undefined>(user.userInfo?.bodyWeight);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>(user.userInfo?.weightUnit ?? weightUnits[0]);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(user.userInfo?.distanceUnit ?? distanceUnits[0]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const cancelEdits = () => {
    setEditing(false);
    setUsername(user.userInfo?.username);
    setBodyWeight(user.userInfo?.bodyWeight);
    setWeightUnit(user.userInfo?.weightUnit ?? weightUnits[0]);
    setDistanceUnit(user.userInfo?.distanceUnit ?? distanceUnits[0]);
  }

  const submitUserInfo = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (editing) {
      const newUserInfo = {
        weightUnit,
        distanceUnit,
        bodyWeight,
        username: username === '' ? undefined : username
      }
      const oldWeightUnit = user.userInfo?.weightUnit;
      const oldDistanceUnit = user.userInfo?.distanceUnit;
      setSaving(true);
      services.updateUser(newUserInfo, {
        onSuccess: (userInfo) => {
          setUsername(userInfo.username);
          setBodyWeight(userInfo.bodyWeight);
          setWeightUnit(userInfo.weightUnit);
          setDistanceUnit(userInfo.distanceUnit);
          setEditing(false);
          // if the user changed their unit preference
          // invalidate the completed workouts to trigger recalcs
          if (oldWeightUnit !== userInfo.weightUnit || oldDistanceUnit !== userInfo.distanceUnit) {
            services.updateCachedWorkouts(userInfo.weightUnit, userInfo.distanceUnit);
          }
        },
        onSettled: () => {
          setSaving(false);
        }
      });
    }
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

  return (
    <Box className="w-full md:w-2/3 px-3 border-x border-blue-100" sx={{ minHeight: `calc(100dvh - 64px)`, pb: '10vh' }}>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Stack component="form" spacing={2} sx={{ mt: 1, opacity: saving ? 0.5 : undefined }} onSubmit={submitUserInfo}>
        <Typography variant="h4" component="h2">
          Account
        </Typography>
        <Paper
          sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2.5, bgcolor: bgBlue, borderRadius: 5 }}
          square={false}
        >
          <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>

            <TextField
              id="user-email"
              name="user-email"
              label="Email"
              type="text"
              fullWidth
              variant="outlined"
              value={user.email}
              disabled={true}
            />
          </Stack>
        </Paper>
        <Paper
          sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2.5, bgcolor: bgBlue, borderRadius: 5 }}
          square={false}
        >
          <Stack spacing={2} sx={{ flexGrow: 1, mx: 2 }}>
            <Typography color="textDisabled">Optional</Typography>
            <TextField
              id="username"
              name="username"
              label="Username"
              placeholder="(optional)"
              type="text"
              fullWidth
              disabled={!editing}
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
              disabled={!editing}
              variant="outlined"
              value={bodyWeight ?? ''}
              onChange={handleBodyWeight}
            />
          </Stack>
        </Paper>
        <Paper
          sx={{ width: '100%', display: 'flex', flexDirection: 'row', py: 2.5, bgcolor: bgBlue, borderRadius: 5 }}
          square={false}
        >
          <Stack spacing={1.5} sx={{ flexGrow: 1, mx: 2 }}>
            <Typography color="textDisabled">Preferences</Typography>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <FormControl disabled={!editing}>
                <FormLabel id="sign-up-weight-units">Weight</FormLabel>
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
              <FormControl disabled={!editing}>
                <FormLabel id="sign-up-distance-units">Distance</FormLabel>
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
            </Stack>
          </Stack>
        </Paper>
        <Collapse sx={{ alignSelf: 'center', justifyContent: 'center', width: '50%' }} in={editing}>
          <Button
            variant="contained"
            type="submit"
            sx={{ alignSelf: 'center', textTransform: 'capitalize', width: '100%', borderRadius: 5, mb: 1 }}
          >
            Update Account
          </Button>
        </Collapse>
      </Stack>
      <Box display='flex' sx={{ justifyContent: 'center', width: '100%' }}>
        <Button
          variant="contained"
          color={editing ? 'info' : 'primary'}
          onClick={() => (editing ? cancelEdits() : setEditing(true))}
          sx={{ textTransform: 'capitalize', width: '50%', borderRadius: 5 }}
        >
          {editing ? 'Cancel' : 'Edit Account'}
        </Button>
      </Box>
    </Box>
  );
}