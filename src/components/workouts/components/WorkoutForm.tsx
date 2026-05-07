import { Box, Stack } from "@mui/material";
import ExerciseGroupCard from "../components/ExerciseGroupCard";
import WorkoutFormTitle from "./WorkoutFormTitle";
import useWorkoutForm from "../../../hooks/useWorkoutForm";
import LoadingIcon from "../../layout/LoadingIcon";

export default function WorkoutForm() {
  const { workout, editing, saving } = useWorkoutForm();

  return (
    <>
      {saving &&
        <Box position="fixed" sx={{ zIndex: 99, width: '100%', height: '100%' }}>
          <LoadingIcon />
        </Box>
      }
      <Box
        className="w-full md:w-2/3"
        sx={{ mt: 1, opacity: saving ? 0.5 : undefined }}
        role={editing ? 'form' : 'div'}
      >
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
    </>
  );
}