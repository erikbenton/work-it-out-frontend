import { Box, Stack } from "@mui/material";
import ExerciseGroupCard from "../components/ExerciseGroupCard";
import WorkoutFormTitle from "./WorkoutFormTitle";
import useWorkoutForm from "../../../hooks/useWorkoutForm";

export default function WorkoutForm() {
  const { workout, editing } = useWorkoutForm();

  return (
    <Box className="w-full md:w-2/3" sx={{ mt: 1 }} role={editing ? 'form' : 'div'}>
      <WorkoutFormTitle />
      <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
        {workout.exerciseGroups.map(group => (
          <ExerciseGroupCard
            key={group.key}
            exerciseGroup={group}
          />
        ))}
      </Stack>
    </Box>
  );
}