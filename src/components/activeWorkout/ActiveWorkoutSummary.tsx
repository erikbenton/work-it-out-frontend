import { Box, Slide, Stack, useTheme } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";
import ElapsedTimer from "./components/ElapsedTimer";
import ActiveWorkoutsList from "./components/ActiveWorkoutsList";
import VerticalIconMenu from "../layout/VerticalIconMenu";
import { useEffect, useState } from "react";
import SummaryActionButtons from "./components/SummaryActionButtons";
import ExerciseSelect from "../exercises/components/ExerciseSelect";
import LoadingIcon from "../layout/LoadingIcon";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { useLocation, useNavigate } from "react-router-dom";
import type { SlideDirection } from "../../types/slideDirection";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch, saving, handleFinishWorkout } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const [selectingExercises, setSelectingExercises] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const slideDirection: SlideDirection = location.state?.slideDirection as SlideDirection;
  const [transitioning, setTransitioning] = useState(Boolean(slideDirection));
  const defaultTransitionTime = theme.transitions.duration.enteringScreen;

  // allows for resetting slide transition
  useEffect(() => {
    if (location.state) {
      // Clear the history state by replacing it with null
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const handleClearWorkout = () => {
    setTransitioning(false);
    dispatch({ type: 'endWorkout' });
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

  const menuItems = [
    {
      label: 'Add Exercises',
      handleClick: handleAddingExercises,
    },
    {
      label: 'Finish Workout',
      handleClick: () => handleFinishWorkout(services),
    },
    {
      label: "Cancel Workout",
      handleClick: handleClearWorkout,
      sx: { color: 'error.main' }
    },
  ];

  if (workout === null) {
    return (
      <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
        <ActiveWorkoutsList />
      </Box>
    );
  }

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Slide direction={slideDirection} in={true} unmountOnExit={true} timeout={{ enter: transitioning ? defaultTransitionTime : 0 }}>
        <Box className="w-full md:w-2/3" sx={{ mt: 2, opacity: saving ? 0.5 : undefined }} role='form'>
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
              handleClose={() => setSelectingExercises(false)}
              addExercises={addExercises}
            />
            {workout.exerciseGroups.map(group => (
              <ActiveWorkoutGroupCard key={group.key} exerciseGroup={group} />
            ))}
            <SummaryActionButtons
              workout={workout}
              handleAddingExercises={handleAddingExercises}
            />
          </Stack>
        </Box>
      </Slide>
    </>
  );
}