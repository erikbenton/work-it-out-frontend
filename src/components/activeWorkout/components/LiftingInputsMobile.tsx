import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";

type Props = {
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
}

export default function LiftingInputsMobile({ values, setValues }: Props) {

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    if (!values || weight < 0) return;
    const newSet: ActiveExerciseSet = { ...values, weight }
    setValues(newSet);
  }

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(e.target.value);
    if (!values || reps < 0) return;
    const newSet = { ...values, reps }
    setValues(newSet);
  }

  return (
    <Stack direction='row' spacing={2} sx={{ px: 2 }}>
      <TextField
        autoFocus
        id="weight"
        name="weight"
        label="Weight (lbs)"
        type="number"
        fullWidth
        variant="filled"
        value={values?.weight ? values.weight : ""}
        onChange={handleWeightChange}
      />
      <TextField
        id="reps"
        name="reps"
        label="Repetitions"
        type="number"
        fullWidth
        variant="filled"
        value={values?.reps ? values.reps : ""}
        onChange={handleRepsChange}
      />
    </Stack>
  )
}