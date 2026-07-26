import Stack from "@mui/material/Stack";
import type { ExerciseCategory } from "../../../types/exerciseCategory";
import { DistanceInput, DurationInput, RepInput, WeightInput } from "../../activeWorkout/components/LiftingInputs";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import useCompletedWorkoutForm from "../../../hooks/useCompletedWorkoutForm";

export type CompletedSetInputProps = {
  values?: CompletedExerciseSet,
  setValues: React.Dispatch<React.SetStateAction<CompletedExerciseSet>>,
  size?: 'small' | 'large',
  label?: string,
  category: ExerciseCategory,
}

export default function CompletedSetInputs({ category, size, values, setValues }: CompletedSetInputProps) {
  const { saving } = useCompletedWorkoutForm();
  const variant = "standard";

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = Number(e.target.value);
    if (!values || weight < 0) return;
    const newSet = { ...values, weight }
    setValues(newSet);
  }

  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reps = Number(e.target.value);
    if (!values || reps < 0) return;
    const newSet = { ...values, reps }
    setValues(newSet);
  }

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    if (!values || distance < 0) return;
    const newSet = { ...values, distance: distance === 0 ? undefined : distance }
    setValues(newSet);
  }

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

  const handleDurationBlur = () => {
    if (!values?.duration) return '';
    let updated = false;

    const durationNum = Number(values.duration.replaceAll(':', ''));
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
      const minutesText = hours > 0 && minutes < 10
        ? `0${minutes}:`
        : `${minutes}:`
      const updatedDuration = `${hours ? `${hours}:` : ''}${minutesText}${seconds < 10 ? `0${seconds}` : seconds}`;
      const newSet = { ...values, duration: updatedDuration === '' ? undefined : updatedDuration }
      setValues(newSet);
    }
  }

  const getFirstInput = (category: ExerciseCategory) => {
    switch (category) {
      case 'lift': {
        return (<WeightInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleWeightChange}
          saving={saving}
        />);
      }

      case 'timed': {
        return (<DistanceInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleDistanceChange}
          saving={saving}
        />);
      }

      case 'stretch':
      case 'conditioning': {
        return (<RepInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleRepsChange}
          saving={saving}
        />);
      }

      default: {
        return (<>{`No input was found for exercise category ${category}`}</>)
      }
    }
  }

  const getSecondInput = (category: ExerciseCategory) => {
    switch (category) {
      case 'lift': {
        return (<RepInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleRepsChange}
          saving={saving}
        />);
      }

      case 'timed': {
        return (<DurationInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleDurationChange}
          saving={saving}
          onBlur={handleDurationBlur}
        />);
      }

      case 'stretch':
      case 'conditioning': {
        return (<DurationInput
          values={values}
          variant={variant}
          size={size}
          onChange={handleDurationChange}
          saving={saving}
          onBlur={handleDurationBlur}
        />);
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
  );
}