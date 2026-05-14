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
import { formattedSetTargetsText } from "../../../utils/formatters";
import { Typography } from "@mui/material";
import MinRepsInput from "./inputs/MinRepsInput";
import MaxRepsInput from "./inputs/MaxRepsInput";
import TargetDurationInput from "./inputs/TargetDurationInput";
import TargetDistanceInput from "./inputs/TargetDistanceInput";

type Props = {
  exerciseGroup: ExerciseGroup,
  set: ExerciseSet
};

export type SetInputProps = {
  values: ExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ExerciseSet>>,
  label?: string
}

export default function ExerciseGroupSetInput({ exerciseGroup, set }: Props) {
  const { editing, dispatch, setTags = [] } = useWorkoutForm();
  const { services } = useExercises();
  const [values, setValues] = useState<ExerciseSet>(set);
  const [open, setOpen] = useState(false);
  const setTag = setTags?.find(tag => tag.id === set.setTagId);
  const exercise = services.getExerciseById(exerciseGroup.exerciseId);

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
    switch (exercise.category) {
      case 'lift':
      case 'stretch':
      case 'conditioning': {
        return (<MinRepsInput
          values={values}
          setValues={setValues}
          label={exercise.category === 'lift' ? 'Min Reps' : undefined}
        />);
      }
      case 'timed': {
        return (<TargetDistanceInput
          values={values}
          setValues={setValues}
        />);
      }
    }
  }

  const secondInput = () => {
    switch (exercise.category) {
      case 'lift': {
        return (<MaxRepsInput
          values={values}
          setValues={setValues}
          label='Max Reps'
        />);
      }
      case 'timed':
      case 'stretch':
      case 'conditioning': {
        return (<TargetDurationInput
          values={values}
          setValues={setValues}
        />);
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
          <ListItemText
            primary={
              <Typography>
                {formattedSetTargetsText(set, exercise.category)}
              </Typography>
            }
            slotProps={{ primary: { fontSize: 16 } }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}