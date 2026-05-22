import { Chip, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { teal, green, cyan, pink } from "@mui/material/colors";
import { durationToHhMmSs, secondsToDuration } from "../../../utils/formatters";
import TimerIcon from '@mui/icons-material/Timer';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import { type LiftStats, type StretchStats, type TimedStats } from "../../../utils/exerciseStats";
import type { ExerciseHistory } from "../../../types/exerciseHistory";

type Props = {
  history: ExerciseHistory
}

const statsChipStyle = {
  color: '#fff', py: 1.75, pr: 0.75, cursor: 'pointer'
};

export default function ExerciseHistoryItemStats({ history }: Props) {
  switch (history.category) {
    case 'lift': {
      return (<ExerciseHistoryLiftGroupStats history={history} />)
    }
    case 'timed': {
      return (<ExerciseHistoryTimedGroupStats history={history} />)
    }
    case 'conditioning': {
      return (<ExerciseHistoryStretchGroupStats history={history} />)
    }
    case 'stretch': {
      return (<ExerciseHistoryStretchGroupStats history={history} />)
    }
    default:
      return (<>No Stats available for exercise category: {history}</>);
  }
}

type HistoryStatProps = {
  history: ExerciseHistory
}

const touchDelay = 0;

export function ExerciseHistoryLiftGroupStats({ history }: HistoryStatProps) {
  const { totalReps, totalVolume, oneRepMax } = history.stats as LiftStats;

  return (
    <ListItemText id={`list-label-${history.group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalReps &&
          <Tooltip
            title="Total Reps"
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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
          <Tooltip
            title="Total Volume"
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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
          <Tooltip
            title='Estimated 1 Rep Max'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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

export function ExerciseHistoryTimedGroupStats({ history }: HistoryStatProps) {
  const { totalDistance, totalSeconds, bestPaceSeconds } = history.stats as TimedStats;
  const totalTime = totalSeconds ? secondsToDuration(totalSeconds) : undefined;
  const bestPace = bestPaceSeconds ? secondsToDuration(bestPaceSeconds) : undefined;

  return (
    <ListItemText id={`list-label-${history.group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalDistance !== undefined && totalDistance > 0 &&
          <Tooltip
            title='Total Distance'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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
          <Tooltip
            title='Total Duration'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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
          <Tooltip
            title='Fastest Pace'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
            <Chip
              size="small"
              label={
                <Typography variant="body2">
                  <TimerIcon fontSize="small" sx={{ mr: 0.25 }} />{`${durationToHhMmSs(bestPace, 'short')} / mi`}
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

export function ExerciseHistoryStretchGroupStats({ history }: HistoryStatProps) {
  const { totalReps, totalSeconds } = history.stats as StretchStats;
  const totalTime = totalSeconds ? secondsToDuration(totalSeconds) : undefined;

  return (
    <ListItemText id={`list-label-${history.group.id}`} className='px-3' primary={
      <Stack direction='row' spacing={1}>
        {totalReps &&
          <Tooltip
            title='Total Reps'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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
          <Tooltip
            title='Total Duration'
            enterTouchDelay={touchDelay}
            slotProps={{ tooltip: { sx: { textTransform: 'capitalize' } } }}
          >
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