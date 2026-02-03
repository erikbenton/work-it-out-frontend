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
    //dispatch(resetWorkout());
    navigate('/workouts/create');
  };

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Typography variant="h4" component="h2">
        Workouts
      </Typography>
      <Stack spacing={1}>
        {workouts?.map((workout) => (
          <WorkoutListCard key={workout.id} workout={workout} />
        ))}
      </Stack>
      <Box className="flex flex-col items-center">
        <Button
          aria-label="start workout"
          className="mt-3"
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={navigateToNewWorkoutForm}
        >
          Add Workout
        </Button>
      </Box>
    </Box>
  );
};

export default WorkoutList;
