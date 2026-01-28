import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type WorkoutSummary from '../../types/workoutSummary';
import WorkoutListCard from './components/WorkoutListCard';
import { useQuery } from '@tanstack/react-query';
import { getWorkoutList } from '../../requests/workouts';

const WorkoutList = () => {
  const result = useQuery<WorkoutSummary[]>({
    queryKey: ['workouts'],
    queryFn: getWorkoutList
  });

  const navigate = useNavigate();

  const navigateToNewWorkoutForm = () => {
    //dispatch(resetWorkout());
    navigate('/workouts/create');
  };

  if (result.isLoading) {
    return (
      <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
        Loading workouts...
      </Typography>
    );
  }

  const workouts: WorkoutSummary[] = result.data ?? [];

  return (
    <>
      <Typography variant="h4" component="h2">
        Workouts
      </Typography>
      {workouts.map((workout) => (
         <WorkoutListCard key={workout.id} workout={workout} />
      ))}
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
    </>
  );
};

export default WorkoutList;
