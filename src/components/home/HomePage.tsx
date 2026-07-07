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
import WelcomePage from './components/WelcomePage';

export default function HomePage() {
  const { user, loading: userLoading } = useUser();
  const { workout } = useActiveWorkout();
  const navigate = useNavigate();

  const handleResumeWorkout = () => {
    if (workout) {
      navigate('/training');
    }
  }

  return (
    <Box
      className="px-3 border-x border-blue-100 h-full"
      sx={{ width: { xs: '100%', md: 'calc(4/5 * 100%)'}, minHeight: `calc(100dvh - 64px)`, pb: workout ? '10vh' : undefined }}
    >
      {userLoading
        ? <LoadingIcon />
        : user.isLoggedIn
          ? <>
            <HomePageTitle />
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
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
          </>
          : <Suspense fallback={<LoadingIcon />}>
            <WelcomePage />
          </Suspense>
      }
    </Box>
  );
}