import Box from "@mui/material/Box";
import useProgramForm from "../../../hooks/useProgramForm";
import Stack from "@mui/material/Stack";
import LoadingIcon from "../../layout/LoadingIcon";
import ProgramWorkoutCard from "./ProgramWorkoutCard";
import { Suspense } from "react";
import WorkoutSelect from "./WorkoutSelect";
import ProgramFormTitle from "./ProgramFormTitle";
import ProgramFormDescriptionInput from "./ProgramFormDescription";


export default function ProgramForm() {
  const { saving, editing, workouts, selectingWorkouts } = useProgramForm();

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
        <ProgramFormTitle />
        <Suspense fallback={<LoadingIcon label='Exercises' />}>
          <ProgramFormDescriptionInput />
          <Stack spacing={1} sx={{ pb: 3, px: 1 }} >
            {workouts.map(workout => (
              <ProgramWorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </Stack>
          <WorkoutSelect open={selectingWorkouts} />
        </Suspense>
        <Box sx={{ height: '10vh', minHeight: '10vh' }}></Box>
      </Box>
    </>
  );
}