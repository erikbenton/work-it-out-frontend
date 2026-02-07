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
import WorkoutExerciseSelection from "./WorkoutExerciseSelection";
import { useState } from "react";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { useNavigate } from "react-router-dom";

export default function WorkoutFormTitle() {
  const { workout, editing, setEditing } = useWorkoutForm();
  const { services } = useWorkouts();
  const [selectingExercises, setSelectingExercises] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setSelectingExercises(true);
  };

  const handleEditSaveClick = () => {
    if (editing) {
      services.update(workout, {
        onSuccess: (savedWorkout) => {
          setEditing(!editing);
          navigate(`/workouts/${savedWorkout.id}`);
        }
      });
    } else {
      setEditing(!editing);
    }
  }

  const menuItems = [
    {
      label: editing ? "Cancel" : "Edit",
      handleClick: () => setEditing(!editing),
    },
    { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } },
  ];

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
        <IconButton color="primary" sx={{ mx: 1 }} onClick={handleEditSaveClick}>
          <Grow in={editing}>
            <CheckIcon fontSize="medium" sx={{ position: 'absolute' }} />
          </Grow>
          <Grow in={!editing}>
            <EditIcon fontSize="medium" sx={{ position: 'absolute' }} />
          </Grow>
        </IconButton>
        <VerticalIconMenu
          buttonId={"workout-options"}
          menuItems={menuItems}
          size="large"
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
      <WorkoutExerciseSelection
        open={selectingExercises && editing}
        setOpen={setSelectingExercises}
      />
    </>
  );
}