import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useUser from "../../../hooks/useUser";


export default function HomePageTitle() {
  const { userInfo, handleLogoutAttempt } = useUser();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: 'center',
        my: 1
      }}
    >
      <Typography variant="h4" component="h2" sx={{ cursor: 'pointer' }}>
        Work-It-Out
      </Typography>
      {userInfo.isLoggedIn &&
        <Button
          onClick={() => handleLogoutAttempt()}
          sx={{ borderRadius: 5 }}
        >
          Logout
        </Button>
      }
    </Stack>
  )
}