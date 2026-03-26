import Button from '@mui/material/Button';
import StartWorkoutCard from '../../workouts/components/StartWorkoutCard';
import { useWorkouts } from '../../../hooks/useWorkouts';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useActiveWorkout from '../../../hooks/useActiveWorkout';
import { useNavigate } from 'react-router-dom';

type Props = {
  titleVariant?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'),
  titleComponent?: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'),
  titlePaddingX?: number
}

export default function ActiveWorkoutsList({ titleVariant = 'h4', titleComponent = 'h2', titlePaddingX = 0 }: Props) {
  const { workouts } = useWorkouts();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();

  const handleEmptyWorkout = () => {
    dispatch({ type: 'startEmptyWorkout', payload: null });
    navigate('/activeWorkout');
  }

  return (
    <>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography
          variant={titleVariant}
          component={titleComponent}
          sx={{ px: titlePaddingX }}
        >
          Training
        </Typography>
        <Button
          fullWidth
          type='button'
          variant='outlined'
          sx={{ borderRadius: 5, textTransform: 'none' }}
          onClick={handleEmptyWorkout}
        >
          Start Empty Workout
        </Button>
      </Stack>
      <Stack spacing={1}>
        {workouts.map((workout) => (
          <StartWorkoutCard key={workout.id} workout={workout} />
        ))}
      </Stack>
      <Box sx={{ height: '10vh' }}></Box>
    </>
  );
};
