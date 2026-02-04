import { Box, Stack } from "@mui/material";
import ExerciseGroupCard from "../components/ExerciseGroupCard";
import WorkoutDetailsTitle from "../components/WorkoutDetailsTitle";
import useWorkoutForm from "../../../hooks/useWorkoutForm";

export default function WorkoutForm() {
  const { workout, editing } = useWorkoutForm();

  return (
    <Box className="w-full md:w-2/3 px-3" role={editing ? 'form' : 'div'}>
      <WorkoutDetailsTitle />
      <Stack spacing={1} className="pb-3" >
        {workout.exerciseGroups.map((group, index) => (
          <ExerciseGroupCard
            key={group.id}
            exerciseGroup={group}
            index={index}
          />
        ))}
      </Stack>
    </Box>
  );
}