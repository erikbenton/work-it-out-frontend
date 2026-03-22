import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import Stack from "@mui/material/Stack";
import CompletedGroupCard from "./components/CompletedGroupCard";
import CompletedWorkoutStats from "./components/CompletedWorkoutStats";

export default function CompletedWorkoutDetails() {
  const id = Number(useParams().id);
  const { services } = useCompletedWorkouts();
  const workout = services.getCompletedWorkoutById(id);

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1, px: 1 }}>
      <Typography variant="h5" component="h2">
        {workout.name}
      </Typography>
      <CompletedWorkoutStats workout={workout} />
      <Stack spacing={0}>
        {workout.completedExerciseGroups.map(group => (
          <CompletedGroupCard key={group.id} group={group} />
        ))}
      </Stack>
    </Box>
  );
}