import { Chip, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import { teal, green, cyan, pink } from "@mui/material/colors";
import { durationToHhMmSs, secondsToDuration } from "../../../utils/formatters";
import TimerIcon from '@mui/icons-material/Timer';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import { calculateLiftStats, calculateStretchStats, calculateTimedStats } from "../../../utils/exerciseStats";
import type { ExerciseCategory } from "../../../types/exerciseCategory";
import { devConsole } from "../../../utils/debugLogger";

type Props = {
  group: CompletedExerciseGroup,
  category: ExerciseCategory
}

const statsChipStyle = {
  color: '#fff', py: 1.75, pr: 0.75, cursor: 'pointer'
};

export default function ExerciseHistoryItemStats({ group, category }: Props) {
  switch (category) {
    case 'lift': {
      return (<ExerciseHistoryLiftGroupStats group={group} />)
    }
    case 'timed': {
      return (<ExerciseHistoryTimedGroupStats group={group} />)
    }
    case 'conditioning': {
      return (<ExerciseHistoryStretchGroupStats group={group} />)
    }
    case 'stretch': {
      return (<ExerciseHistoryStretchGroupStats group={group} />)
    }
    default:
      return (<>No Stats available for exercise category: {category}</>);
  }
}

type HistoryStatProps = {
  group: CompletedExerciseGroup
}

const touchDelay = 250;

export function ExerciseHistoryLiftGroupStats({ group }: HistoryStatProps) {
  const { totalReps, totalVolume, oneRepMax } = calculateLiftStats(group);
  devConsole('total vol', totalVolume)
  devConsole('one rep max', oneRepMax)

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalReps &&
          <Tooltip title="Total Reps" enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <DoneAllIcon fontSize="small" sx={{ mr: 0.75 }} />{totalReps}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: green[700] }}
            />
          </Tooltip>
        }
        {totalVolume !== undefined && totalVolume > 0 &&
          <Tooltip title="Total Volume" enterTouchDelay={0}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <FitnessCenterIcon fontSize="small" sx={{ mr: 0.75 }} />{`${Math.round(totalVolume)} lbs`}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: cyan[700] }}
            />
          </Tooltip>
        }
        {oneRepMax !== undefined && oneRepMax > 0 &&
          <Tooltip title='Estimated 1 Rep Max' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <EmojiEventsSharpIcon fontSize="small" sx={{ mr: 0.5 }} />{`${Math.round(oneRepMax)} lbs`}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: pink[700] }}
            />
          </Tooltip>
        }
      </Stack>
    } />
  );
}

export function ExerciseHistoryTimedGroupStats({ group }: HistoryStatProps) {
  const { totalDistance, totalSeconds, bestPaceSeconds} = calculateTimedStats(group);
  const totalTime = totalSeconds ? secondsToDuration(totalSeconds) : undefined;
  const bestPace = bestPaceSeconds ? secondsToDuration(bestPaceSeconds) : undefined;

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalDistance !== undefined && totalDistance > 0 &&
          <Tooltip title='Total Distance' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <RoomSharpIcon fontSize="small" sx={{ mr: 0.5 }} />{`${totalDistance.toFixed(2)} mi`}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: teal[600] }}
            />
          </Tooltip>
        }
        {totalTime !== undefined &&
          <Tooltip title='Total Duration' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <WatchLaterRoundedIcon fontSize="small" sx={{ mr: 0.33 }} />{durationToHhMmSs(totalTime, 'short')}
                </Typography>
              }
              variant='filled'
              color="primary"
              sx={{ ...statsChipStyle }}
            />
          </Tooltip>
        }
        {bestPace &&
          <Tooltip title='Fastest Pace' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <TimerIcon fontSize="small" sx={{ mr: 0.25 }} />{`${durationToHhMmSs(bestPace)} / mi`}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: pink[700] }}
            />
          </Tooltip>
        }
      </Stack>
    } />
  );
}

export function ExerciseHistoryStretchGroupStats({ group }: HistoryStatProps) {
  const { totalReps, totalSeconds } = calculateStretchStats(group);
  const totalTime = totalSeconds ? secondsToDuration(totalSeconds) : undefined;

  return (
    <ListItemText id={`list-label-${group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalReps &&
          <Tooltip title='Total Reps' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <DoneAllIcon fontSize="small" sx={{ mr: 0.75 }} />{totalReps}
                </Typography>
              }
              variant='filled'
              sx={{ ...statsChipStyle, backgroundColor: green[700] }}
            />
          </Tooltip>
        }
        {totalTime &&
          <Tooltip title='Total Duration' enterTouchDelay={touchDelay}>
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <WatchLaterRoundedIcon fontSize="small" sx={{ mr: 0.33 }} />{durationToHhMmSs(totalTime, 'short')}
                </Typography>
              }
              variant='filled'
              color='primary'
              sx={{ py: 1.75, pr: 0.75 }}
            />
          </Tooltip>
        }
      </Stack>
    } />
  );
}