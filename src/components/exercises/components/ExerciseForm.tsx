import { Box, Button, Stack } from "@mui/material";
import { type ExerciseAction } from "../../../reducers/exerciseReducer";
import ExerciseFormTextFields from "../components/ExerciseFormTextFields";
import ExerciseFormCategory from "../components/ExerciseFormCategory";
import ExerciseFormMuscles from "../components/ExerciseFormMuscles";
import ExerciseFormEquipment from "../components/ExerciseFormEquipment";
import type Exercise from "../../../types/exercise";

type Props = {
  exercise: Exercise,
  dispatch: React.ActionDispatch<[action: ExerciseAction]>,
  handleSubmit: () => void
}

export default function ExerciseForm({ exercise, dispatch, handleSubmit }: Props) {

  return (
    <Box component="form" className="w-full md:w-2/3 p-3">
      <Stack spacing={1}>
        <ExerciseFormTextFields name={exercise.name} instructions={exercise.instructions} dispatch={dispatch} />
        <ExerciseFormCategory category={exercise.category} dispatch={dispatch} />
        <ExerciseFormMuscles muscles={exercise.muscles} dispatch={dispatch} />
        <ExerciseFormEquipment equipment={exercise.equipment} dispatch={dispatch} />
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </Stack>
    </Box>
  );
}