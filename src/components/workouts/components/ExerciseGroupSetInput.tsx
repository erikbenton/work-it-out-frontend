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
import useExerciseCategories from "../../../hooks/useExerciseCategories";
import type ExerciseCategoryOption from "../../../types/exerciseCategoryOption";
import { formattedDistanceText, formattedRepsText, formattedStretchText } from "../../../utils/formatters";
import { Typography } from "@mui/material";
import MinRepsInput from "./inputs/MinRepsInput";
import MaxRepsInput from "./inputs/MaxRepsInput";
import TargetDurationInput from "./inputs/TargetDurationInput";
import TargetDistanceInput from "./inputs/TargetDistanceInput";

function formattedSetText(set: ExerciseSet, category: ExerciseCategoryOption): string {
  const key = `${category.firstTargetInput}_${category.secondTargetInput}`
  switch (key) {
    case 'reps_reps': {
      return formattedRepsText(set);
    }

    case 'distance_duration': {
      return formattedDistanceText(set);
    }

    case 'reps_duration': {
      return formattedStretchText(set);
    }

    default:
      return 'No set formatter found';
  }
}

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
        return (<MinRepsInput
          values={values}
          setValues={setValues}
          label={category.secondTargetInput === 'reps' ? 'Min Reps' : undefined}
        />);
      }
      case 'duration': {
        return (<TargetDurationInput
          values={values}
          setValues={setValues}
        />);
      }
      case 'distance': {
        return (<TargetDistanceInput
          values={values}
          setValues={setValues}
        />);
      }
    }
  }

  const secondInput = () => {
    switch (category.secondTargetInput) {
      case 'reps': {
        return (<MaxRepsInput
          values={values}
          setValues={setValues}
          label='Max Reps'
        />);
      }
      case 'duration': {
        return (<TargetDurationInput
          values={values}
          setValues={setValues}
        />);
      }
      case 'distance': {
        return (<TargetDistanceInput
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
                {formattedSetText(set, category)}
              </Typography>
            }
            slotProps={{ primary: { fontSize: 16 } }}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}