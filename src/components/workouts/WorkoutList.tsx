import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import WorkoutListCard from './components/WorkoutListCard';
import { useWorkouts } from '../../hooks/useWorkouts';

const WorkoutList = () => {
  const { workouts } = useWorkouts();

  const navigate = useNavigate();

  const navigateToNewWorkoutForm = () => {
    navigate('/workouts/create');
  };

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
        Workouts
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Button
          fullWidth
          aria-label="start workout"
          sx={{ textTransform: "none", borderRadius: 5 }}
          variant="contained"
          onClick={navigateToNewWorkoutForm}
        >
          Add Workout
        </Button>
      </Box>
      <Stack spacing={1}>
        {workouts.map((workout) => (
          <WorkoutListCard key={workout.id} workout={workout} />
        ))}
      </Stack>
    </Box>
  );
};

export default WorkoutList;
