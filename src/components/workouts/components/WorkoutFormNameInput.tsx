import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";

export default function WorkoutFormNameInput() {
  const { workout, editing, dispatch } = useWorkoutForm();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(workout.name);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: 'setName',
      payload: { name }
    });
    handleClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="workout-name-form">
            <TextField
              autoFocus
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" form="workout-name-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {editing
        ? <Button
          sx={{
            m: 0, p: 0,
            fontSize: '34px', textTransform: 'none', color: 'inherit',
            justifyContent: 'flex-start', flexGrow: 1
          }}
          onClick={() => setOpen(true)}
        >
          <Typography variant="h4" component="h2">
            {workout?.name}
          </Typography>
        </Button>
        : <Typography variant="h4" component="h2">
          {workout?.name}
        </Typography>
      }
    </>
  );
}