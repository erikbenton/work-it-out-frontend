import { Box, Button, Stack, Typography } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import WorkoutList from "../workouts/WorkoutList";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch } = useActiveWorkout();

  const handleClearWorkout = () => {
    dispatch({ type: 'endWorkout' })
  }

  if (workout === null) { return <WorkoutList /> }

  return (
    <Box className="w-full md:w-2/3" role='form'>
      <Typography variant="h5" component="h2">
        {workout?.name}
      </Typography>
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        {workout.exerciseGroups.map(group => (
          <ActiveWorkoutGroupCard key={group.key} exerciseGroup={group} />
        ))}
      </Stack>
      <Button onClick={handleClearWorkout}>Clear Workout</Button>
    </Box>
  );
}