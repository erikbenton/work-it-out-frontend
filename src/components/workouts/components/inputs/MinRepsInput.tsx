import TextField from "@mui/material/TextField";
import type { SetInputProps } from "../ExerciseGroupSetInput";

export default function MinRepsInput({ values, setValues, label }: SetInputProps) {
  const handleMinRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minReps = Number(e.target.value);
    if (minReps < 0) return;
    const newSet = { ...values, minReps: minReps === 0 ? undefined : minReps }
    setValues(newSet);
  }

  return (
    <TextField
      autoFocus
      id="minReps"
      name="minReps"
      label={label ?? 'Reps'}
      type="number"
      fullWidth
      variant="standard"
      value={values.minReps ? values.minReps : ""}
      onChange={handleMinRepsChange}
    />
  );
}