import TextField from "@mui/material/TextField";
import type { SetInputProps } from "../ExerciseGroupSetInput";

export default function TargetDistanceInput({ values, setValues, label }: SetInputProps) {
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetDistance = Number(e.target.value);
    if (targetDistance < 0) return;
    const newSet = { ...values, targetDistance: targetDistance === 0 ? undefined : targetDistance }
    setValues(newSet);
  }

  return (
    <TextField
      id="targetDistance"
      name="targetDistance"
      label={label ?? 'Distance (mi)'}
      type="number"
      fullWidth
      variant="standard"
      value={values.targetDistance ? values.targetDistance : ""}
      onChange={handleDistanceChange}
    />
  );
}