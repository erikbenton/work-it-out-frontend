import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import WorkoutFormNameInput from "./WorkoutFormNameInput";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ExerciseSelect from "../../exercises/components/ExerciseSelect";
import Collapse from "@mui/material/Collapse";

export default function WorkoutFormTitle() {
  const {
    workout,
    editing,
    handleSaveClick,
    handleEditClick,
    handleCancelClick,
    getTitleMenuOptions,
    addExercises,
    selectingExercises,
    setSelectingExercises,
    replacementKey,
    setReplacementKey,
    replaceExercise
  } = useWorkoutForm();

  const replacingExercise = Boolean(replacementKey);

  const handleClickOpen = () => {
    setSelectingExercises(true);
  };

  const handleClickClose = () => {
    setSelectingExercises(false);
  }

  const closeReplaceExercise = () => {
    setReplacementKey(undefined);
  }

  const menuItems = getTitleMenuOptions();

  return (
    <>
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <WorkoutFormNameInput />
        <Collapse in={editing} orientation="horizontal">
          <Stack direction='row' spacing={2} sx={{ alignItems: 'center', ml: 1 }}>
            <IconButton color="primary" onClick={handleSaveClick}>
              <CheckIcon fontSize="medium" sx={{ position: 'absolute' }} />
            </IconButton>
            <IconButton color="error" onClick={handleCancelClick}>
              <CloseIcon fontSize="medium" sx={{ position: 'absolute' }} />
            </IconButton>
          </Stack>
        </Collapse>
        <Collapse in={!editing} orientation="horizontal">
          <IconButton color="primary" sx={{ mx: 1 }} onClick={handleEditClick}>
            <EditIcon fontSize="medium" sx={{ position: 'absolute' }} />
          </IconButton>
        </Collapse>
        <VerticalIconMenu
          buttonId={"workout-options"}
          menuItems={menuItems}
          size="medium"
        />
      </Stack >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          px: 1
        }}
      >
        <Typography variant="body1" component="span">
          {workout?.exerciseGroups.length} Exercises
        </Typography>
        <Grow in={editing} >
          <IconButton color="primary" onClick={handleClickOpen}>
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Grow>
      </Stack>
      <ExerciseSelect
        open={(selectingExercises || replacingExercise) && editing}
        handleClose={replacingExercise ? closeReplaceExercise : handleClickClose}
        addExercises={replacingExercise ? replaceExercise : addExercises}
        limit={replacingExercise ? 1 : undefined}
      />
    </>
  );
}