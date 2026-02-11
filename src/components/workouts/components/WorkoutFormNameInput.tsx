import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import { Divider, Grow, Stack } from "@mui/material";

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
      <Button
        disableTouchRipple={!editing}
        sx={{
          p: 0,
          textTransform: 'none',
          color: 'inherit',
          justifyContent: 'flex-start',
          flexGrow: 1,
        }}
        onClick={() => { if (editing) { setOpen(true); }}}>
        <Stack sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2"
            sx={{
              mr: 1,
              textAlign: 'start',
              flexGrow: 1,
            }}
          >
            {workout?.name}
          </Typography>
          <Grow in={editing} timeout={200}>
            <Divider sx={{ bgcolor: 'primary.main'}} />
          </Grow>
        </Stack>
      </Button>
    </>
  );
}