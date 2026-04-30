import Box from "@mui/material/Box";
import ActiveWorkoutsList from "../../activeWorkout/components/ActiveWorkoutsList";



export default function UserTraining() {

  return (
    <Box sx={{ width: '100%' }}>
      <ActiveWorkoutsList titleVariant="h6" titleComponent="h3" titlePaddingX={1} />
    </Box>
  )
}