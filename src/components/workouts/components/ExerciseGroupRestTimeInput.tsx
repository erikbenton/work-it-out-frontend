import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type ExerciseGroup from "../../../types/exerciseGroup";
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { useRef, useState } from "react";
import useWorkoutForm from "../../../hooks/useWorkoutForm";

type Props = {
  exerciseGroup: ExerciseGroup
}

function formatRestTime(time: string | undefined): string {
  if (!time) return '00:00';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hours = '00', minutes = '00', seconds = '00'] = time.split(':'); // duration -> 'hh:mm:ss'
  return `${minutes}:${seconds}`; // only need 'mm:ss'
}

export default function ExerciseGroupRestTimeInput({ exerciseGroup }: Props) {
  const initTime = formatRestTime(exerciseGroup.restTime);
  const { editing, dispatch } = useWorkoutForm();
  const [restTime, setRestTime] = useState<string | undefined>(initTime);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: 'updateGroup',
      payload: {
        group: { ...exerciseGroup, restTime }
      }
    });

    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestTime(e.target.value);
  }

  // Move the cursor to the end of the dialog input
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputElement = event.target;
    const length = inputElement?.value.length;
    inputElement?.setSelectionRange(length, length);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-group-rest-time-form">
            <TextField
              autoFocus
              id="restTime"
              name="restTime"
              label="Rest Time (mm:ss)"
              type="text"
              multiline
              maxRows={10}
              minRows={1}
              fullWidth
              variant="standard"
              value={restTime ?? '00:00'}
              onChange={handleChange}
              inputRef={inputRef}
              onFocus={handleFocus}
            />
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
          className={exerciseGroup.note ? '' : 'text-gray-400'}
        >
          {exerciseGroup.restTime ? exerciseGroup.restTime.slice(exerciseGroup.restTime.search(/[1-9]/)) : ''}
        </Typography>
      </Button>
    </>
  );
}