import { Chip, ListItemText, Stack, Typography } from "@mui/material";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import { calculateEstimatedOneRepMax } from "../../../utils/charts";
import { red } from "@mui/material/colors";
import { durationToHhMmSs, durationToSeconds, secondsToDuration } from "../../../utils/formatters";
import { useExercises } from "../../../hooks/useExercises";
import TimerIcon from '@mui/icons-material/Timer';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';

type Props = {
  group: CompletedExerciseGroup
}

const totalReps = (sets: CompletedExerciseSet[]) => {
  return sets.reduce((acc, curr) => acc + (curr.reps ?? 0), 0)
}
const totalVolume = (sets: CompletedExerciseSet[]) => {
  return sets.reduce((acc, curr) => acc + (curr.weight ?? 0) * (curr.reps ?? 0), 0)
};
const totalDistance = (sets: CompletedExerciseSet[]) => {
  return sets.reduce((acc, curr) => acc + (curr.distance ?? 0), 0);
}
const totalTime = (sets: CompletedExerciseSet[]) => {
  const totalSeconds = sets.reduce((acc, curr) => acc + durationToSeconds(curr.duration), 0);
  const duration = secondsToDuration(totalSeconds, { format: 'include-hours' });
  return durationToHhMmSs(duration, 'short');
}
const bestPace = (sets: CompletedExerciseSet[]): string | undefined => {
  const pace = sets.reduce((acc, curr) => {
    if (!curr.duration || !curr.distance) return acc;
    const seconds = durationToSeconds(curr.duration);
    const pace = seconds / curr.distance;
    return !acc || pace < acc ? pace : acc;
  }, undefined as (undefined | number));
  if (!pace) return undefined;
  const duration = secondsToDuration(pace);
  return durationToHhMmSs(duration);
}

export default function ExerciseHistoryItemStats({ group }: Props) {
  const { services: exerciseServices } = useExercises();
  const reps = totalReps(group.completedExerciseSets);
  const weight = totalVolume(group.completedExerciseSets);
  const oneRepMax = calculateEstimatedOneRepMax(group);
  const exercise = exerciseServices.getExerciseById(group.exerciseId);

  switch (exercise.categoryId) {
    case 1: {
      return (<ExerciseHistoryLiftGroupStats group={group} />)
    }
    case 2: {
      return (<ExerciseHistoryTimedGroupStats group={group} />)
    }
    case 3: {
      return (<ExerciseHistoryStretchGroupStats group={group} />)
    }
    case 4: {
      return (<ExerciseHistoryStretchGroupStats group={group} />)
    }
    default:
      return (<>No Stats available for exercise category: {exercise.categoryId}</>);
  }

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip
          size="small"
          label={`Reps: ${reps}`}
          variant='filled'
          color='success'
        />
        <Chip
          size="small"
          label={`Volume: ${weight} lbs`}
          variant='filled'
          color='primary'
        />
        <Chip
          size="small"
          label={`Est. 1RM: ${oneRepMax} lbs`}
          variant='filled' sx={{ backgroundColor: red[600], color: '#fff' }}
        />
      </Stack>
    } />
  );
}

export function ExerciseHistoryLiftGroupStats({ group }: Props) {
  const reps = totalReps(group.completedExerciseSets);
  const volume = totalVolume(group.completedExerciseSets);
  const oneRepMax = calculateEstimatedOneRepMax(group);

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip
          size="small"
          label={`Reps: ${reps}`}
          variant='filled'
          color='success'
        />
        <Chip
          size="small"
          label={`Volume: ${volume} lbs`}
          variant='filled'
          color='primary'
        />
        <Chip
          size="small"
          label={`Est. 1RM: ${oneRepMax} lbs`}
          variant='filled'
          sx={{ backgroundColor: red[600], color: '#fff' }}
        />
      </Stack>
    } />
  );
}

export function ExerciseHistoryTimedGroupStats({ group }: Props) {
  const distance = totalDistance(group.completedExerciseSets);
  const time = totalTime(group.completedExerciseSets);
  const pace = bestPace(group.completedExerciseSets);

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip
          size="small"
          label={
            <Typography variant="body2">
              <RoomSharpIcon fontSize="small" />{`${distance.toFixed(2)} mi`}
            </Typography>
          }
          variant='filled'
          color='success'
          sx={{ py: 1.75, pr: 0.75 }}
        />
        <Chip
          size="small"
          label={
            <Typography variant="body2">
              <TimerIcon fontSize="small" />{`${time}`}
            </Typography>
          }
          variant='filled'
          color="primary"
          sx={{ py: 1.75, pr: 0.75 }}
        />
        {pace &&
          <Chip
            size="small"
            label={
              <Typography variant="body2">
                <WatchLaterRoundedIcon fontSize="small" />{`${pace} / mi`}
              </Typography>
            }
            variant='filled'
            sx={{ backgroundColor: red[600], color: '#fff', py: 1.75, pr: 0.75 }}
          />
        }
      </Stack>
    } />
  );
}

export function ExerciseHistoryStretchGroupStats({ group }: Props) {
  const reps = totalReps(group.completedExerciseSets);
  const weight = totalVolume(group.completedExerciseSets);

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        <Chip
          size="small"
          label={`Reps: ${reps}`}
          variant='filled'
          color='success'
        />
        <Chip
          size="small"
          label={`Volume: ${weight} lbs`}
          variant='filled'
          color="primary"
        />
      </Stack>
    } />
  );
}