import useUser from '../../hooks/useUser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import UserStats from './components/UserStats';
import { UserPrograms } from './components/UserTraining';
import useActiveWorkout from '../../hooks/useActiveWorkout';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingIcon from '../layout/LoadingIcon';
import HomePageTitle from './components/HomePageTitle';
import UserCalendar from './components/UserCalendar';
import { Typography } from '@mui/material';

export default function HomePage() {
  const { userInfo, loading: userLoading } = useUser();
  const { workout } = useActiveWorkout();
  const navigate = useNavigate();

  const handleResumeWorkout = () => {
    if (workout) {
      navigate('/training');
    }
  }

  return (
    <Box className="w-full md:w-2/3 px-3" sx={{ pb: workout ? '10vh' : undefined }}>
      <HomePageTitle />
      {userLoading
        ? <LoadingIcon />
        : userInfo.isLoggedIn
          ? <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <UserStats />
            <UserCalendar />
            {workout
              ? <Button
                fullWidth
                type='button'
                variant='contained'
                sx={{ borderRadius: 5, textTransform: 'none', mb: '10vh' }}
                onClick={handleResumeWorkout}
              >
                Resume Workout
              </Button>
              : <UserPrograms />}
          </Stack>
          : <Suspense fallback={<LoadingIcon />}>
            <WelcomePage />
          </Suspense>
      }
    </Box>
  );
}

function WelcomePage() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/register')
  }

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', display: 'flex' }}>
      <Stack direction='column' spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
        <Typography variant='h5'>Welcome to Work-It-Out!</Typography>
        <Typography variant='h6'>Need help tracking your workouts?</Typography>
        <Typography variant='h6'>Having trouble seeing your progress?</Typography>
        <Typography variant='h6'>Let us help you Work-It-Out today!</Typography>
        <Button
          onClick={handleJoinClick}
          variant='contained'
          sx={{ borderRadius: 5 }}
        >
          Join
        </Button>
      </Stack>
      <Stack direction='column' spacing={1} sx={{ width: '100%' }}>
        <Typography variant='h6'>Take control of your fitness:</Typography>
        <Typography>Build your own personal Workouts</Typography>
        <Typography>Organize workouts into Programs</Typography>
        <Typography>Easily track all your exercises</Typography>
        <Typography>View charts of your progress</Typography>
        <Typography>Create your own exercises</Typography>
        <Typography>And more!</Typography>
      </Stack>
    </Stack>
  )
}