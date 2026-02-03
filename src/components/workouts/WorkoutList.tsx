import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type WorkoutSummary from '../../types/workoutSummary';
import WorkoutListCard from './components/WorkoutListCard';
import { useQuery } from '@tanstack/react-query';
import { getWorkoutList } from '../../requests/workouts';
import LoadingMessage from '../layout/LoadingMessage';

const WorkoutList = () => {
  const { data: workouts, isLoading } = useQuery<WorkoutSummary[]>({
    queryKey: ['workouts'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getWorkoutList
  });

  const navigate = useNavigate();

  const navigateToNewWorkoutForm = () => {
    //dispatch(resetWorkout());
    navigate('/workouts/create');
  };

  if (isLoading) {
    return (<LoadingMessage dataName='workouts' />);
  }

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
