import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import useActiveWorkout from "../../../hooks/useActiveWorkout";

type Props = {
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
  size: 'small' | 'large'
}

export default function LiftingInputs({ values, setValues, size }: Props) {
  const { saving } = useActiveWorkout();

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
        id="weight"
        name="weight"
        label="Weight (lbs)"
        type="number"
        disabled={saving}
        fullWidth
        variant="filled"
        value={values?.weight ? values.weight : ""}
        onChange={handleWeightChange}
        slotProps={{
          input: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } },
          inputLabel: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } }
        }}
      />
      <TextField
        id="reps"
        name="reps"
        label="Repetitions"
        type="number"
        disabled={saving}
        fullWidth
        variant="filled"
        value={values?.reps ? values.reps : ""}
        onChange={handleRepsChange}
        slotProps={{
          input: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } },
          inputLabel: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } }
        }}
      />
    </Stack>
  )
}