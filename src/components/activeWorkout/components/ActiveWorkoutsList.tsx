import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StartWorkoutCard from '../../workouts/components/StartWorkoutCard';
import { useWorkouts } from '../../../hooks/useWorkouts';

export default function ActiveWorkoutsList() {
  const { workouts } = useWorkouts();

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
      <Typography variant="h4" component="h2">
        Training
      </Typography>
      <Stack spacing={1}>
        {workouts.map((workout) => (
          <StartWorkoutCard key={workout.id} workout={workout} />
        ))}
      </Stack>
      <Box className="flex flex-col items-center">
        <Button
          fullWidth
          aria-label="start workout"
          className="mt-3"
          sx={{ textTransform: 'none', borderRadius: 5 }}
          variant="outlined"
        >
          Empty Workout
        </Button>
      </Box>
    </Box>
  );
};
