import { Box, Button, Stack } from "@mui/material";
import { useReducer } from "react";
import exerciseReducer, { initialExercise } from "../../reducers/exerciseReducer";
import ExerciseFormTextFields from "./components/ExerciseFormTextFields";
import ExerciseFormCategory from "./components/ExerciseFormCategory";
import ExerciseFormMuscles from "./components/ExerciseFormMuscles";
import ExerciseFormEquipment from "./components/ExerciseFormEquipment";
import { useExercises } from "../../hooks/useExercises";

export default function ExerciseCreate() {
  const [exercise, dispatch] = useReducer(exerciseReducer, initialExercise);
  const { services } = useExercises();

  return (
    <Box component="form" className="w-full md:w-2/3 p-3">
      <Stack spacing={1}>
        <ExerciseFormTextFields name={exercise.name} instructions={exercise.instructions} dispatch={dispatch} />
        <ExerciseFormCategory category={exercise.category} dispatch={dispatch} />
        <ExerciseFormMuscles muscles={exercise.muscles} dispatch={dispatch} />
        <ExerciseFormEquipment equipment={exercise.equipment} dispatch={dispatch} />
        <Button variant="contained" onClick={() => services.create({ ...exercise })}>Save</Button>
      </Stack>
    </Box>
  );
}