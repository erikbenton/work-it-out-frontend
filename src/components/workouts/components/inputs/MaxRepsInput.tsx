import TextField from "@mui/material/TextField";
import type { SetInputProps } from "../ExerciseGroupSetInput";

export default function MaxRepsInput({ values, setValues, label }: SetInputProps) {
  const handleMaxRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxReps = Number(e.target.value);
    if (maxReps < 0) return;
    const newSet = { ...values, maxReps: maxReps === 0 ? undefined : maxReps }
    setValues(newSet);
  }

  return (
    <TextField
      id="maxReps"
      name="maxReps"
      label={label ?? 'Reps'}
      type="number"
      fullWidth
      variant="standard"
      value={values.maxReps ? values.maxReps : ""}
      onChange={handleMaxRepsChange}
    />
  );
}