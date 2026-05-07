import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type ExerciseGroup from "../../../types/exerciseGroup";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import { FormLabel, Stack } from "@mui/material";

type Props = {
  exerciseGroup: ExerciseGroup
}

const getInitRestTime = (rest: string | undefined): { minutes: number, seconds: number } | undefined => {
  if (rest && rest.length > 5) {
    const [, minutes = 0, seconds = 0] = rest.split(':');
    return { minutes: Number(minutes), seconds: Number(seconds) };
  }
  return undefined;
}

export default function ExerciseGroupRestTimeInput({ exerciseGroup }: Props) {
  const { editing, dispatch } = useWorkoutForm();
  const initRestTime = getInitRestTime(exerciseGroup.restTime);
  const [seconds, setSeconds] = useState<number | undefined>(initRestTime?.seconds);
  const [minutes, setMinutes] = useState<number | undefined>(initRestTime?.minutes);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    let restTime: string | undefined = undefined;

    if (seconds !== undefined || minutes !== undefined) {
      const saveSeconds = seconds ?? 0;
      const saveMinutes = minutes ?? 0;
      if (saveMinutes !== 0 || saveSeconds !== 0) {
        const minutesText = saveMinutes < 10 ? `0${saveMinutes}` : saveMinutes;
        const secondsText = saveSeconds < 10 ? `0${saveSeconds}` : saveSeconds;
        restTime = `00:${minutesText}:${secondsText}`;
      }
    }

    dispatch({
      type: 'updateGroup',
      payload: {
        group: { ...exerciseGroup, restTime }
      }
    });

    handleClose();
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setMinutes(undefined);
      if (seconds === 0) {
        setSeconds(undefined);
      }
    } else {
      const newMinutes = Number(e.target.value);
      if (!seconds) {
        setSeconds(0);
      }
      setMinutes(newMinutes < 0 ? 0 : newMinutes > 59 ? 59 : newMinutes);
    }
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setSeconds(undefined);
      if (minutes === 0) {
        setMinutes(undefined);
      }
    } else {
      if (!minutes) {
        setMinutes(0);
      }
      const newSeconds = Number(e.target.value.replace(/^0+(?=\d)/, ''));
      setSeconds(newSeconds < 0 ? 0 : newSeconds > 59 ? 59 : newSeconds);
    }
  }

  const handleMinutesCheck = () => {
    if (!minutes && (seconds ?? 0) > 0) {
      setMinutes(0);
    }
    if (!seconds && !minutes) {
      setSeconds(undefined);
      setMinutes(undefined);
    }
  }

  const handleSecondsCheck = () => {
    if (!seconds && (minutes ?? 0) > 0) {
      setSeconds(0);
    }
    if (!seconds && !minutes) {
      setSeconds(undefined);
      setMinutes(undefined);
    }
  }

  const [restMinutes, restSeconds] = exerciseGroup.restTime
    ? exerciseGroup.restTime.split(':').splice(-2)
    : [null, null];

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-group-rest-time-form">
            <Stack spacing={1}>
              <FormLabel>Rest Time</FormLabel>
              <Stack direction='row' spacing={2}>
                <TextField
                  autoFocus
                  id="minutes"
                  name="minutes"
                  label="Minutes"
                  type="number"
                  variant="standard"
                  value={minutes ?? ""}
                  slotProps={{ htmlInput: { style: { textAlign: 'end' } }, inputLabel: { style: { textAlign: 'end' } } }}
                  onChange={handleMinutesChange}
                  onBlur={handleMinutesCheck}
                />
                <TextField
                  id="seconds"
                  name="seconds"
                  label="Seconds"
                  type="number"
                  variant="standard"
                  // need to do conversion here to deal with leading zeroes bc type=number
                  value={seconds === undefined ? '' : seconds < 10 ? `0${seconds ?? 0}` : `${seconds}`.replace(/^0+(?=\d)/, '')}
                  onChange={handleSecondsChange}
                  onBlur={handleSecondsCheck}
                />
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="exercise-group-rest-time-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="text"
        color='inherit'
        disableTouchRipple={!editing}
        sx={{ textTransform: 'none' }}
        startIcon={<AlarmOutlinedIcon className='mr-2' />}
        onClick={() => { if (editing) { setOpen(true) } }}
      >
        <Typography
          sx={{ flex: 1, textAlign: 'left' }}
          className={exerciseGroup.restTime ? '' : 'text-gray-400'}
        >
          {restMinutes || restSeconds ? `${restMinutes ?? '00'}:${restSeconds ?? '00'}` : ''}
        </Typography>
      </Button>
    </>
  );
}