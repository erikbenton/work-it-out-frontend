import { Box, Button, Stack, Typography } from "@mui/material";
import useActiveWorkout from "../../hooks/useActiveWorkout";
import WorkoutList from "../workouts/WorkoutList";
import ActiveWorkoutGroupCard from "./components/ActiveWorkoutGroupCard";
import ElapsedTimer from "./components/ElapsedTimer";

export default function ActiveWorkoutSummary() {
  const { workout, dispatch } = useActiveWorkout();

  const handleClearWorkout = () => {
    dispatch({ type: 'endWorkout' })
  }

  if (workout === null) { return <WorkoutList /> }

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 2 }} role='form'>
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        <Stack direction='row'
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography sx={{ pl: 1 }} variant="h5" component="h2">
            {workout?.name}
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
      </Stack>
      <Button onClick={handleClearWorkout}>Clear Workout</Button>
    </Box>
  );
}