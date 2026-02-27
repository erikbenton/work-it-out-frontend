import { Chip, ListItemText, Stack } from "@mui/material";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";

type Props = {
  id: number,
  completedSets: CompletedExerciseSet[]
}

const totalReps = (sets: CompletedExerciseSet[]) => {
  return sets.reduce((acc, curr) => acc + curr.reps, 0)
}
const totalWeight = (sets: CompletedExerciseSet[]) => {
  return sets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0)
};

export default function ExerciseHistoryItemStats({ id, completedSets }: Props) {
  const reps = totalReps(completedSets);
  const weight = totalWeight(completedSets);

  return (
    <ListItemText id={`list-label-${id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip size="small" label={`Reps: ${reps}`} variant='filled' color='success' />
        <Chip size="small" label={`Weight: ${weight} lbs`} variant='filled' color='primary' />
      </Stack>
    } />
  );
}