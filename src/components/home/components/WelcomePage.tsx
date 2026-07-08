import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DemoImagesCarousel from "./DemoImagesCarousel";
import { useNavigate } from "react-router-dom";


export default function WelcomePage() {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/register')
  }

  const miniHeaderFontSize = '1.125rem';

  return (
    <Stack spacing={3} sx={{ alignItems: 'center', display: 'flex', mt: 3, pb: '10vh' }}>
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
              Join or Login
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
          <DemoImagesCarousel />
        </Grid>
      </Grid>
    </Stack>
  )
}