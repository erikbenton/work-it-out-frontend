import { Box, Button, Stack, Typography } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";
import ElapsedTimer from "./components/ElapsedTimer";
import { useNavigate } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { devConsole } from "../../utils/debugLogger";
import ActiveWorkoutsList from "./components/ActiveWorkoutsList";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch, complete } = useActiveWorkout();
  const { services } = useCompletedWorkouts();
  const navigate = useNavigate();

  const handleClearWorkout = () => {
    dispatch({ type: 'endWorkout' })
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

  if (workout === null) {
    return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
      <ActiveWorkoutsList />
    </Box>
    );
  }

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1 }} role='form'>
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        <Stack direction='row'
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
              <ElapsedTimer startTime={workout.startTime} />
            </Box>
          }
        </Stack>
        {workout.exerciseGroups.map(group => (
          <ActiveWorkoutGroupCard key={group.key} exerciseGroup={group} />
        ))}
        {complete && <Button
          sx={{ textTransform: 'none', borderRadius: 5 }}
          variant="contained"
          onClick={handleFinishWorkout}
        >
          Finish Workout
        </Button>}
        <Button
          sx={{ textTransform: 'none', borderRadius: 5 }}
          variant="outlined"
          onClick={handleClearWorkout}
        >
          Clear Workout
        </Button>
      </Stack>
    </Box>
  );
}