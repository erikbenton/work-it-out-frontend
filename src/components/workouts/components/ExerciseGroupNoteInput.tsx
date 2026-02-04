import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import type ExerciseGroup from '../../../types/exerciseGroup';
import type { WorkoutAction } from '../../../reducers/workoutReducer';

type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  exerciseGroup: ExerciseGroup,
  dispatch: React.ActionDispatch<[action: WorkoutAction]>
}

export default function ExerciseGroupNoteInput({ open, setOpen, exerciseGroup, dispatch }: Props) {
  const [note, setNote] = useState(exerciseGroup.note);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'updateGroup',
      payload: {
        group: { ...exerciseGroup, note: note !== '' ? note : undefined }
      }
    });
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = e.target.value !== ''
    ? e.target.value
    : undefined;
    setNote(newNote);
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit} id="exercise-group-note-form">
          <TextField
            autoFocus
            id="note"
            name="note"
            label="Note"
            type="text"
            multiline
            maxRows={10}
            minRows={1}
            fullWidth
            variant="standard"
            value={note}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" form="exercise-group-note-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
