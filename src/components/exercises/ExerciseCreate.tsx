import { Box, Stack } from "@mui/material";
import { useReducer } from "react";
import exerciseReducer, { initialExercise } from "../../reducers/exerciseReducer";
import ExerciseFormTextFields from "./components/ExerciseFormTextFields";
import ExerciseFormCategory from "./components/ExerciseFormCategory";
import ExerciseFormMuscles from "./components/ExerciseFormMuscles";
import ExerciseFormEquipment from "./components/ExerciseFormEquipment";

export default function ExerciseCreate() {
  const [exercise, dispatch] = useReducer(exerciseReducer, initialExercise);

  return (
    <Box className="w-full md:w-2/3 p-3">
      <form className="w-full">
        <Stack spacing={2}>
          <ExerciseFormTextFields name={exercise.name} instructions={exercise.instructions} dispatch={dispatch} />
          <ExerciseFormCategory category={exercise.category} dispatch={dispatch} />
          <ExerciseFormMuscles muscles={exercise.muscles} dispatch={dispatch} />
          <ExerciseFormEquipment equipment={exercise.equipment} dispatch={dispatch} />
        </Stack>
      </form>
    </Box>
  );
}