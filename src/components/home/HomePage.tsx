import useUser from '../../hooks/useUser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginRegister from './components/LoginRegister';
import Stack from '@mui/material/Stack';
import UserStats from './components/UserStats';
import UserTraining from './components/UserTraining';

export default function HomePage() {
  const { userInfo, services } = useUser();

  const handleLogoutAttempt = async () => {
    services.logoutUser(undefined);
  }

  return (
    <Box className="w-full md:w-2/3 px-3">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: 'center',
          px: 1,
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
          <UserTraining />
        </Stack>
        : <LoginRegister />
      }
    </Box>
  );
}