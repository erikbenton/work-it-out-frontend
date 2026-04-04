import { Box, Stack } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";
import ElapsedTimer from "./components/ElapsedTimer";
import { useNavigate } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { devConsole } from "../../utils/debugLogger";
import ActiveWorkoutsList from "./components/ActiveWorkoutsList";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import { useState } from "react";
import SummaryActionButtons from "./components/SummaryActionButtons";
import ExerciseSelect from "../exercises/components/ExerciseSelect";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const navigate = useNavigate();
  const [selectingExercises, setSelectingExercises] = useState(false);

  const handleClearWorkout = () => {
    dispatch({ type: 'endWorkout' });
  }

  const handleFinishWorkout = () => {
    if (workout) {
      services.createFromActiveWorkout(workout, {
        onSuccess: (savedCompletedWorkout) => {
          devConsole(savedCompletedWorkout);
          dispatch({ type: 'endWorkout' });
          navigate(`/completedWorkouts/${savedCompletedWorkout.id}`);
        }
      });
    }
  }

  const handleAddingExercises = () => {
    setSelectingExercises(true);
  };

  const addExercises = (exercises: number[]) => {
    dispatch({
      type: 'addExercises',
      payload: { newExercises: exercises }
    });
  }

  if (workout === null) {
    return (
      <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
        <ActiveWorkoutsList />
      </Box>
    );
  }

  const menuItems = [
    {
      label: 'Add Exercises',
      handleClick: handleAddingExercises,
    },
    {
      label: 'Finish Workout',
      handleClick: handleFinishWorkout,
    },
    {
      label: "Cancel Workout",
      handleClick: handleClearWorkout,
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 2 }} role='form'>
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        <Stack
          direction='row'
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            pl: 1
          }}
        >
          <ElapsedTimer startTime={workout.startTime} />
          <VerticalIconMenu
            buttonId={"active-workout-options"}
            menuItems={menuItems}
            size="medium"
          />
        </Stack>
        <ExerciseSelect
          open={selectingExercises}
          setOpen={setSelectingExercises}
          addExercises={addExercises}
        />
        {workout.exerciseGroups.map(group => (
          <ActiveWorkoutGroupCard key={group.key} exerciseGroup={group} />
        ))}
        <SummaryActionButtons
          workout={workout}
          handleAddingExercises={handleAddingExercises}
          handleFinishWorkout={handleFinishWorkout}
        />
      </Stack>
    </Box>
  );
}