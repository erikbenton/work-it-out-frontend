import Avatar from "@mui/material/Avatar";
import Grow from "@mui/material/Grow";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from "@mui/material/IconButton";
import type ExerciseSet from "../../../types/exerciseSet";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type ExerciseGroup from "../../../types/exerciseGroup";
import { Chip, FormLabel, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import type SetTagOption from "../../../types/setTagOption";

function formattedRepsText(set: ExerciseSet): string {
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} Reps`);
}

type Props = {
  exerciseGroup: ExerciseGroup,
  set: ExerciseSet
}

export default function ExerciseGroupSetInput({ exerciseGroup, set }: Props) {
  const { editing, dispatch, setTags = [] } = useWorkoutForm();
  const [values, setValues] = useState<ExerciseSet>(set);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setValues(prev => ({ ...prev, setTagId: set.setTagId }));
    handleClose();
  }
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      type: 'updateSet',
      payload: {
        group: exerciseGroup,
        set: { ...values }
      }
    });

    handleClose();
  };

  const handleMinRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minReps = Number(e.target.value);
    if (minReps < 0) return;
    const newSet = { ...values, minReps: minReps === 0 ? undefined : minReps }
    setValues(newSet);
  }

  const handleMaxRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxReps = Number(e.target.value);
    if (maxReps < 0) return;
    const newSet = { ...values, maxReps: maxReps === 0 ? undefined : maxReps }
    setValues(newSet);
  }

  const handleSetTypeChange = (_event: React.MouseEvent<HTMLElement>, setTag: SetTagOption | undefined) => {
    if (!setTag) return;
    const newSet = { ...values, setTagId: setTag.id };
    setValues(newSet);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleCancel} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-set-input-form">
            <Stack spacing={1}>
              <FormLabel id="repetition-label">Repetitions</FormLabel>
              <Stack direction='row' spacing={2}>
                <TextField
                  autoFocus
                  id="minReps"
                  name="minReps"
                  label="Min"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.minReps ? values.minReps : ""}
                  onChange={handleMinRepsChange}
                />
                <TextField
                  id="maxReps"
                  name="maxReps"
                  label="Max"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={values.maxReps ? values.maxReps : ""}
                  onChange={handleMaxRepsChange}
                />
              </Stack>
              <Stack sx={{ mt: 2 }}>
                <FormLabel id="set-tag-group-label">Tag</FormLabel>
                <ToggleButtonGroup
                  id="set-tag-group-label"
                  value={setTags.find(st => st.id === values.setTagId)}
                  exclusive
                  onChange={handleSetTypeChange}
                  aria-label="Tag"
                  sx={{ flexWrap: 'wrap' }}
                >
                  {setTags.map(option => (
                    <ToggleButton
                      key={option.id}
                      className="rounded-full"
                      value={option}
                      sx={{ border: 'none', p: 0, mr: 1, mt: 1 }}
                    >
                      <Chip
                        label={option.name}
                        variant="outlined"
                        size="small"
                        className="capitalize"
                        sx={{ border: `1px solid ${option.colorRgb}` }}
                      />
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" form="exercise-set-input-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem
        disableGutters
        key={set.key}
        secondaryAction={
          <Grow in={editing}>
            <IconButton edge="end" aria-label="delete">
              <MoreVertIcon />
            </IconButton>
          </Grow>
        }
      >
        <ListItemButton
          disableGutters
          className="rounded"
          disableTouchRipple={!editing}
          onClick={() => { if (editing) { setOpen(true) } }}
        >
          <ListItemAvatar>
            <Avatar>
              {set.sort + 1}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={formattedRepsText(set)} />
        </ListItemButton>
      </ListItem>
    </>
  );
}