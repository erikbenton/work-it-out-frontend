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
import { Grid, Typography } from '@mui/material';
import type ChartPoint from '../../types/chartPoint';
import demoChartPoints from "../../data/demoChartPoints.json";
import { LiftExerciseCharts } from '../exercises/components/ExerciseCharts';

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
    <Box className="w-full md:w-4/5 px-3" sx={{ pb: workout ? '10vh' : undefined }}>
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

function WelcomePage() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/register')
  }

  const miniHeaderFontSize = '1.125rem';

  return (
    <Stack spacing={3} sx={{ alignItems: 'center', display: 'flex', mt: 3 }}>
      <Typography variant='h4' textAlign='center'>
        Welcome to Work-It-Out!
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction='column' spacing={1} sx={{ width: '100%' }}>
            <Typography fontSize='1.5rem' variant='h6'>
              Work hard, see results
            </Typography>
            <Typography>
              Work-It-Out is a workout tracker built to help visualize an athlete's progress without adding work on top of their training.
              From stretches and lifts to cardio and conditioning, Work-It-Out is designed to track it all.
            </Typography>
            <Typography fontSize={miniHeaderFontSize}>
              Join today and Work-It-Out!
            </Typography>
            <Button
              onClick={handleJoinClick}
              variant='contained'
              sx={{ alignSelf: 'center', borderRadius: 5, width: '33%', maxWidth: '200px', minWidth: '100px', textTransform: 'none' }}
            >
              Join/Login
            </Button>
          </Stack>
          <Stack direction='column' spacing={1} sx={{ width: '100%', mt: 2 }}>
            <Typography fontSize={miniHeaderFontSize} variant='h6'>Let Work-It-Out replace your gym notebook</Typography>
            <Typography>Easily build your own personal Workouts</Typography>
            <Typography>Organize your workouts into Programs</Typography>
            <Typography>Track all of your workout sessions</Typography>
            <Typography>Create your own custom exercises</Typography>
            <Typography>View charts of your progress</Typography>
            <Typography>And more!</Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DemoLiftChart />
        </Grid>
      </Grid>
    </Stack>
  )
}

function DemoLiftChart() {
  const historyPoints = demoChartPoints as ChartPoint[];

  return (
    <LiftExerciseCharts historyPoints={historyPoints} />
  )
}