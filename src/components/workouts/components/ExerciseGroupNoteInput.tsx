import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useRef, useState } from 'react';
import type ExerciseGroup from '../../../types/exerciseGroup';
import useWorkoutForm from '../../../hooks/useWorkoutForm';
import Typography from '@mui/material/Typography';
import NotesIcon from '@mui/icons-material/Notes';

type Props = {
  exerciseGroup: ExerciseGroup,
}

export default function ExerciseGroupNoteInput({ exerciseGroup }: Props) {
  const { editing, dispatch } = useWorkoutForm();
  const [note, setNote] = useState(exerciseGroup.note);
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
        group: { ...exerciseGroup, note: note !== '' ? note : undefined }
      }
    });
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
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
              value={note ?? ""}
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
          <Button type="submit" form="exercise-group-note-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="text"
        disableTouchRipple={!editing}
        color='inherit'
        sx={{ textTransform: 'none' }}
        startIcon={<NotesIcon className='mr-2' />}
        onClick={() => { if (editing) { setOpen(true) } }}
      >
        <Typography
          sx={{ flex: 1, textAlign: 'left' }}
          className={exerciseGroup.note ? '' : 'text-gray-400'}
        >
          {exerciseGroup.note ?? 'Note'}
        </Typography>
      </Button>
    </>
  );
}
