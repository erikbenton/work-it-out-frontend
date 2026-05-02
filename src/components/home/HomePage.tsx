import useUser from '../../hooks/useUser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoginRegister from './components/LoginRegister';
import Stack from '@mui/material/Stack';
import UserStats from './components/UserStats';
import UserTraining from './components/UserTraining';
import useActiveWorkout from '../../hooks/useActiveWorkout';
import { useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingIcon from '../layout/LoadingIcon';
import HomePageTitle from './components/HomePageTitle';
import UserCalendar from './components/UserCalendar';

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
              : <UserTraining />}
          </Stack>
          : <Suspense fallback={<LoadingIcon label='Workout Histories' />}>
            <LoginRegister />
          </Suspense>
      }
    </Box>
  );
}