import { Chip, ListItemText, Stack } from "@mui/material";
import type ExerciseHistory from "../../../types/exerciseHistory";

type Props = {
  group: ExerciseHistory
}

const totalReps = (group: ExerciseHistory) => {
  return group.completedExerciseSets.reduce((acc, curr) => acc + curr.reps, 0)
}
const totalWeight = (group: ExerciseHistory) => {
  return group.completedExerciseSets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0)
};

export default function ExerciseHistoryItemStats({ group }: Props) {

  return (
    <ListItemText id={`list-label-${group.completedExerciseGroupId}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip size="small" label={`Reps: ${totalReps(group)}`} variant='filled' color='success' />
        <Chip size="small" label={totalWeight(group) === 0 ? "" : `Weight: ${totalWeight(group)} lbs`} variant='filled' color='primary' />
      </Stack>
    } />
  );
}