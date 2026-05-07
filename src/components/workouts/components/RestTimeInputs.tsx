import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type ExerciseGroup from "../../../types/exerciseGroup";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

type Props = {
  exerciseGroup: ExerciseGroup
}

const getInitRestTime = (rest: string | undefined): number | undefined => {
  if (rest && rest.length > 5) {
    const [, minutes = 0, seconds = 0] = rest.split(':');
    return Number(minutes) * 100 + Number(seconds);
  }
  return undefined;
}

export default function ExerciseGroupRestDurationInput({ exerciseGroup }: Props) {
  const { editing, dispatch } = useWorkoutForm();
  const [open, setOpen] = useState(false);
  const [restTime, setRestTime] = useState(getInitRestTime(exerciseGroup.restTime));

  const handleSubmit = () => {
    let updatedRestTime: string | undefined = undefined;

    if (restTime) {
      const minutes = Math.floor(restTime / 100);
      const seconds = Math.floor(restTime % 100);
      const minutesText = minutes < 10 ? `0${minutes}` : minutes;
      const secondsText = seconds < 10 ? `0${seconds}` : seconds;
      updatedRestTime = `00:${minutesText}:${secondsText}`;
    }

    dispatch({
      type: 'updateGroup',
      payload: {
        group: { ...exerciseGroup, restTime: updatedRestTime }
      }
    });

    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setRestTime(getInitRestTime(exerciseGroup.restTime));
    handleClose();
  }

  const handleChangeRestTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedText = e.target.value.replace(':', '');
    const newRestTime = Number(parsedText);
    setRestTime(newRestTime);
  }

  const restTimeText = (restTime?: number): string => {
    if (!restTime) return '';
    const minutes = Math.floor(restTime / 100);
    const seconds = Math.floor(restTime % 100);
    return minutes
      ? (`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
      : `${seconds}`;
  }

  const [, restMinutes, restSeconds] = exerciseGroup.restTime
    ? exerciseGroup.restTime.split(':')
    : [null, null];

  return (
    <>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent>
          <TextField
            autoFocus
            id="minutes"
            name="minutes"
            label="Rest Time"
            type="text"
            variant="standard"
            value={restTimeText(restTime)}
            inputMode="numeric"
            slotProps={{ htmlInput: { style: { textAlign: 'end' } }, inputLabel: { style: { textAlign: 'end' } } }}
            onChange={handleChangeRestTime}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} form="exercise-group-rest-time-form">
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