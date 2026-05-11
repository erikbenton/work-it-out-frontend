import TextField from "@mui/material/TextField";
import type { SetInputProps } from "../ExerciseGroupSetInput";

export default function TargetDurationInput({ values, setValues, label }: SetInputProps) {
  const duration = values.targetDuration;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let duration = e.target.value;
    const parsedText = duration.replaceAll(':', '');
    const newDuration = Number(parsedText);
    if (isNaN(newDuration)) return;
    if (newDuration < 0) return;

    if (parsedText.length > 2) {
      const durationArr = parsedText.split('');
      if (parsedText.length > 4) {
        durationArr.splice(-4, 0, ':');
      }
      durationArr.splice(-2, 0, ':');
      duration = durationArr.join('');
    } else {
      duration = parsedText;
    }

    const newSet = { ...values, targetDuration: duration === '' ? undefined : duration }
    setValues(newSet);
  }

  const handleBlur = () => {
    if (!duration) return '';
    let updated = false;

    const durationNum = Number(duration.replaceAll(':', ''));
    let hours = Math.floor(durationNum / 10_000)
    let minutes = Math.floor(durationNum / 100) - hours * 100;
    let seconds = Math.floor(durationNum % 100);

    if (seconds > 59) {
      const mins = Math.floor(seconds / 60);
      minutes += mins;
      seconds = Math.floor(seconds % 60);
      updated = true;
    }

    if (minutes > 59) {
      const hrs = Math.floor(minutes / 60);
      hours += hrs;
      minutes = Math.floor(minutes % 60);
      updated = true;
    }

    if (updated) {
      const minutesText = hours > 0 && minutes < 10 ? `0${minutes}` : `${minutes}`
      const updatedDuration = `${hours ?? ''}:${minutesText}:${seconds < 10 ? `0${seconds}` : seconds}`;
      const newSet = { ...values, targetDuration: updatedDuration === '' ? undefined : updatedDuration }
      setValues(newSet);
    }
  }

  return (
    <TextField
      id="duration"
      name="duration"
      label={label ?? 'Duration'}
      type="text"
      fullWidth
      variant="standard"
      value={duration ?? ''}
      inputMode="numeric"
      slotProps={{ htmlInput: { style: { textAlign: 'end' } }, inputLabel: { style: { textAlign: 'end' } } }}
      onChange={handleDurationChange}
      onBlur={handleBlur}
    />
  );
}