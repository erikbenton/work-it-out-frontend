import useUser from '../../hooks/useUser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginRegister from './components/LoginRegister';
import Stack from '@mui/material/Stack';
import UserStats from './components/UserStats';
import UserTraining from './components/UserTraining';
import useActiveWorkout from '../../hooks/useActiveWorkout';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { userInfo, services } = useUser();
  const { workout } = useActiveWorkout();
  const navigate = useNavigate();

  const handleLogoutAttempt = async () => {
    services.logoutUser(undefined);
  }

  const handleResumeWorkout = () => {
    if (workout) {
      navigate('/activeWorkout');
    }
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: 'center',
          my: 1
        }}
      >
        <Typography variant="h4" component="h2">
          Work-It-Out
        </Typography>
        {userInfo.isLoggedIn && <Button onClick={handleLogoutAttempt}>Logout</Button>}
      </Stack>
      {userInfo.isLoggedIn
        ? <Stack spacing={2}>
          <UserStats />
          {workout
            ? <Button
              fullWidth
              type='button'
              variant='contained'
              sx={{ borderRadius: 5, textTransform: 'none' }}
              onClick={handleResumeWorkout}
            >
              Resume Workout
            </Button>
            : <UserTraining />}
        </Stack>
        : <LoginRegister />
      }
    </Box>
  );
}