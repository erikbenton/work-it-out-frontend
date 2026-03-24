import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function UserTraining() {

  return (
    <Stack spacing={1} sx={{ px: 1 }}>
      <Typography variant="h6" component="h3">
        Training
      </Typography>
      <Button
        fullWidth
        type='button'
        variant='outlined'
        sx={{ borderRadius: 5, textTransform: 'none' }}
      >
        Start Empty Workout
      </Button>
    </Stack>
  )
}