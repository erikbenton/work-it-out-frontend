import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type ActiveExerciseSet from "../../../types/activeExerciseSet";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import type { ExerciseCategory } from "../../../types/exerciseCategory";

export type ActiveSetInputProps = {
  values?: ActiveExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<ActiveExerciseSet | undefined>>,
  size?: 'small' | 'large',
  label?: string,
  category: ExerciseCategory
}

export default function LiftingInputs(inputProps: ActiveSetInputProps) {
  const { category } = inputProps;

  const getFirstInput = (category: ExerciseCategory) => {
    switch (category) {
      case 'lift': {
        return (<WeightInput {...inputProps} />);
      }

      case 'timed': {
        return (<DistanceInput {...inputProps} />);
      }

      case 'stretch':
      case 'conditioning': {
        return (<RepInput {...inputProps} />);
      }

      default: {
        return (<>{`No input was found for exercise category ${category}`}</>)
      }
    }
  }

  const getSecondInput = (category: ExerciseCategory) => {
    switch (category) {
      case 'lift': {
        return (<RepInput {...inputProps} />);
      }

      case 'timed': {
        return (<DurationInput {...inputProps} />);
      }

      case 'stretch':
      case 'conditioning': {
        return (<DurationInput {...inputProps} />);
      }

      default: {
        return (<>{`No input was found for exercise category ${category}`}</>)
      }
    }
  }

  return (
    <Stack direction='row' spacing={2} sx={{ px: 2 }}>
      {getFirstInput(category)}
      {getSecondInput(category)}
    </Stack>
  )
}

function WeightInput({ values, setValues, size }: ActiveSetInputProps) {
  const { saving } = useActiveWorkout();

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    if (!values || weight < 0) return;
    const newSet: ActiveExerciseSet = { ...values, weight }
    setValues(newSet);
  }

  return (
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
  );
}

function RepInput({ values, setValues, size }: ActiveSetInputProps) {
  const { saving } = useActiveWorkout();

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(e.target.value);
    if (!values || reps < 0) return;
    const newSet = { ...values, reps }
    setValues(newSet);
  }

  return (
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
  );
}

function DistanceInput({ values, setValues, size }: ActiveSetInputProps) {
  const distance = values?.distance;
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    if (!values || distance < 0) return;
    const newSet = { ...values, distance: distance === 0 ? undefined : distance }
    setValues(newSet);
  }

  return (
    <TextField
      id="distance"
      name="distance"
      label='Distance'
      type="number"
      fullWidth
      variant="filled"
      value={distance ?? ""}
      onChange={handleDistanceChange}
      slotProps={{
        input: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } },
        inputLabel: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' } }
      }}
    />
  );
}

function DurationInput({ values, setValues, size }: ActiveSetInputProps) {
  const duration = values?.duration;

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!values) return;
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

    const newSet = { ...values, duration: duration === '' ? undefined : duration }
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
      const newSet = { ...values, duration: updatedDuration === '' ? undefined : updatedDuration }
      setValues(newSet);
    }
  }

  return (
    <TextField
      id="duration"
      name="duration"
      label='Duration'
      type="text"
      fullWidth
      variant="filled"
      value={duration ?? ''}
      onChange={handleDurationChange}
      onBlur={handleBlur}
      slotProps={{
        htmlInput: { style: { textAlign: 'end' } },
        input: { sx: { fontSize: size === 'small' ? '1.25rem' : '1.5rem' }, inputMode: 'numeric' },
        inputLabel: { sx: { textAlign: 'end', fontSize: size === 'small' ? '1.25rem' : '1.5rem' } }
      }}
    />
  );
}