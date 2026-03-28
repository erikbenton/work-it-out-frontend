import { Box, Button, Stack, Typography } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";
import ElapsedTimer from "./components/ElapsedTimer";
import { useNavigate } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { devConsole } from "../../utils/debugLogger";
import ActiveWorkoutsList from "./components/ActiveWorkoutsList";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import { useState } from "react";
import WorkoutExerciseSelection from "../workouts/components/WorkoutExerciseSelection";
import CountdownTimer from "./components/CountdownTimer";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch, complete } = useActiveWorkout();
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
    <Box className="w-full md:w-2/3" sx={{ mt: 1 }} role='form'>
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        <Stack
          direction='row'
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography sx={{ pl: 1 }} variant="h5" component="h2">
            {workout.name}
          </Typography>
          {workout &&
            <Box sx={{ mr: 1 }}>
              <Stack direction='row' spacing={2}>
                {workout && workout.currentRestStart && workout.currentRestTime &&
                  <CountdownTimer
                    key={workout.currentRestStart}
                    startTime={workout.currentRestStart}
                    duration={workout.currentRestTime}
                  />
                }
                <ElapsedTimer startTime={workout.startTime} />
              </Stack>
            </Box>
          }
          <VerticalIconMenu
            buttonId={"active-workout-options"}
            menuItems={menuItems}
            size="medium"
          />
        </Stack>
        <WorkoutExerciseSelection
          open={selectingExercises}
          setOpen={setSelectingExercises}
          addExercises={addExercises}
        />
        {workout.exerciseGroups.map(group => (
          <ActiveWorkoutGroupCard key={group.key} exerciseGroup={group} />
        ))}
        {complete &&
          <Button
            sx={{ textTransform: 'none', borderRadius: 5 }}
            variant="contained"
            onClick={handleFinishWorkout}
          >
            Finish Workout
          </Button>
        }
      </Stack>
    </Box>
  );
}