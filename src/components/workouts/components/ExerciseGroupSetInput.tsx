import Avatar from "@mui/material/Avatar";
import Grow from "@mui/material/Grow";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import type ExerciseSet from "../../../types/exerciseSet";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type ExerciseGroup from "../../../types/exerciseGroup";
import type SetTagOption from "../../../types/setTagOption";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { badgeStyle, bgDarkBlue, generalAvatarStyle } from "../../../utils/styling";
import { useExercises } from "../../../hooks/useExercises";
import useExerciseCategories from "../../../hooks/useExerciseCategories";
import { devConsole } from "../../../utils/debugLogger";

function formattedRepsText(set: ExerciseSet): string {
  return (`${set.minReps ?? ""}` +
    `${set.minReps && set.maxReps ? " - " : ""}` +
    `${set.maxReps ?? ""} reps`);
}

type Props = {
  exerciseGroup: ExerciseGroup,
  set: ExerciseSet
}

export default function ExerciseGroupSetInput({ exerciseGroup, set }: Props) {
  const { editing, dispatch, setTags = [] } = useWorkoutForm();
  const { services } = useExercises();
  const { categories } = useExerciseCategories();
  const [values, setValues] = useState<ExerciseSet>(set);
  const [open, setOpen] = useState(false);
  const setTag = setTags?.find(tag => tag.id === set.setTagId);
  const category = services.getExerciseCategory(exerciseGroup.exerciseId) ?? categories[0];

  const menuItems = [
    {
      label: "Delete",
      handleClick: () => {
        dispatch({ type: 'removeGroupSet', payload: { group: exerciseGroup, set } });
      },
      sx: { color: 'error.main' }
    },
  ]

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

  const handleSetTypeChange = (_event: React.MouseEvent<HTMLElement>, setTag: SetTagOption | undefined) => {
    if (!setTag) return;
    const newSet = { ...values, setTagId: setTag.id };
    setValues(newSet);
  }

  const firstInput = () => {
    switch (category.firstTargetInput) {
      case 'reps': {
        return (<MinRepsInput values={values} setValues={setValues} />)
      }
      case 'duration': {
        return (<TargetDurationInput values={values} setValues={setValues} />)
      }
      case 'distance': {
        return (<TargetDistanceInput values={values} setValues={setValues} />)
      }
    }
  }

  const secondInput = () => {
    switch (category.secondTargetInput) {
      case 'reps': {
        return (<MaxRepsInput values={values} setValues={setValues} />)
      }
      case 'duration': {
        return (<TargetDurationInput values={values} setValues={setValues} />)
      }
      case 'distance': {
        return (<TargetDistanceInput values={values} setValues={setValues} />)
      }
    }
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleCancel} disableRestoreFocus>
        <DialogContent>
          <form onSubmit={handleSubmit} id="exercise-set-input-form">
            <Stack spacing={2}>
              <FormLabel id="repetition-label">Targets</FormLabel>
              <Stack direction='row' spacing={2}>
                {firstInput()}
                {secondInput()}
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
            <Box>
              <VerticalIconMenu
                buttonId={`set-${set.key}-options`}
                menuItems={menuItems}
              />
            </Box>
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
            <Tooltip title={setTag?.name} placement="right">
              <Badge
                slotProps={{ badge: { sx: { ...badgeStyle(setTag) } } }}
                badgeContent={setTag?.name[0] ?? ''}
              >
                <Avatar sx={{
                  ...generalAvatarStyle,
                  bgcolor: bgDarkBlue,
                  color: 'gray',
                }}>
                  {set.sort + 1}
                </Avatar>
              </Badge>
            </Tooltip>
          </ListItemAvatar>
          <ListItemText slotProps={{ primary: { fontSize: 16 } }} primary={formattedRepsText(set)} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

type SetInputProps = {
  values: ExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ExerciseSet>>
}

function MinRepsInput({ values, setValues }: SetInputProps) {
  const handleMinRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minReps = Number(e.target.value);
    if (minReps < 0) return;
    const newSet = { ...values, minReps: minReps === 0 ? undefined : minReps }
    setValues(newSet);
  }

  return (
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
  )
}

function MaxRepsInput({ values, setValues }: SetInputProps) {
  const handleMaxRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxReps = Number(e.target.value);
    if (maxReps < 0) return;
    const newSet = { ...values, maxReps: maxReps === 0 ? undefined : maxReps }
    setValues(newSet);
  }

  return (
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
  )
}

function TargetDistanceInput({ values, setValues }: SetInputProps) {
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetDistance = Number(e.target.value);
    if (targetDistance < 0) return;
    const newSet = { ...values, targetDistance: targetDistance === 0 ? undefined : targetDistance }
    setValues(newSet);
  }

  return (
    <TextField
      id="targetDistance"
      name="targetDistance"
      label="Distance"
      type="number"
      fullWidth
      variant="standard"
      value={values.targetDistance ? values.targetDistance : ""}
      onChange={handleDistanceChange}
    />
  )
}

function TargetDurationInput({ values, setValues }: SetInputProps) {
  devConsole('values', values)
  const duration = values.targetDuration;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let duration = e.target.value;
    devConsole('non parsed', duration)
    const parsedText = duration.replaceAll(':', '');
    const newDuration = Number(parsedText);
    if (isNaN(newDuration)) return;
    if (newDuration < 0) return;

    if (parsedText.length > 2) {
      const durationArr = parsedText.split('');
      if (parsedText.length > 4) {
        durationArr.splice(-4, 0, ':');
      }
      durationArr.splice(-2, 0, ':');
      duration = durationArr.join('');
    } else {
      duration = parsedText;
    }

    devConsole('parsed duration', parsedText);
    devConsole('new duration', newDuration);
    const newSet = { ...values, targetDuration: duration === '' ? undefined : duration }
    devConsole('new set', newSet);
    setValues(newSet);
  }

  devConsole('duration', duration);

  const handleBlur = () => {
    if (!duration) return '';
    let updated = false;

    const durationNum = Number(duration.replaceAll(':', ''));
    let hours = Math.floor(durationNum / 10_000)
    let minutes = Math.floor(durationNum / 100) - hours * 100;
    let seconds = Math.floor(durationNum % 100);

    if (seconds > 59) {
      const mins = Math.floor(seconds / 60);
      minutes += mins;
      seconds = Math.floor(seconds % 60);
      updated = true;
    }

    if (minutes > 59) {
      const hrs = Math.floor(minutes / 60);
      hours += hrs;
      minutes = Math.floor(minutes % 60);
      updated = true;
    }

    if (updated) {
      const minutesText = hours > 0 && minutes < 10 ? `0${minutes}` : `${minutes}`
      const updatedDuration = `${hours ?? ''}:${minutesText}:${seconds < 10 ? `0${seconds}` : seconds}`;
      const newSet = { ...values, targetDuration: updatedDuration === '' ? undefined : updatedDuration }
      setValues(newSet);
    }
  }

  return (
    <TextField
      id="duration"
      name="duration"
      label="Duration"
      type="text"
      fullWidth
      variant="standard"
      value={duration ?? ''}
      inputMode="numeric"
      slotProps={{ htmlInput: { style: { textAlign: 'end' } }, inputLabel: { style: { textAlign: 'end' } } }}
      onChange={handleDurationChange}
      onBlur={handleBlur}
    />
  )
}