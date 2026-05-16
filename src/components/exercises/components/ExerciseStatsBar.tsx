import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import TimerIcon from '@mui/icons-material/Timer';
import { blue, cyan, green, grey, pink, purple, teal } from "@mui/material/colors";
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';
import { durationToHhMmSs, formatLargeNumber, secondsToDuration } from "../../../utils/formatters";
import type { ExerciseHistory } from "../../../types/exerciseHistory";

type Props = {
  history: ExerciseHistory[]
}

type ExerciseStats = {
  sets: number,
  reps?: number,
  oneRepMax?: number,
  volume?: number,
  distance?: number,
  seconds?: number,
  bestPaceSeconds?: number,
  time?: string,
  bestPace?: string
}

export default function ExerciseStatsBar({ history }: Props) {
  const stats: ExerciseStats = { sets: 0 };

  history.forEach(h => {
    stats.sets += h.group.completedExerciseSets.length;
    if (h.category === 'lift') {
      const { totalReps, totalVolume, oneRepMax } = h.stats;
      stats.reps = totalReps
        ? (stats.reps ?? 0) + totalReps
        : stats.reps;
      stats.oneRepMax = oneRepMax
        ? oneRepMax > (stats.oneRepMax ?? 0) ? oneRepMax : stats.oneRepMax
        : stats.oneRepMax;
      stats.volume = totalVolume
        ? (stats.volume ?? 0) + totalVolume
        : stats.volume;
    } else if (h.category === 'timed') {
      const { totalDistance, totalSeconds, bestPaceSeconds } = h.stats;
      stats.distance = totalDistance
        ? (stats.distance ?? 0) + totalDistance
        : stats.distance;
      stats.seconds = totalSeconds
        ? (stats.seconds ?? 0) + totalSeconds
        : stats.seconds;
      stats.bestPaceSeconds = bestPaceSeconds
        ? bestPaceSeconds <= (stats.bestPaceSeconds ?? bestPaceSeconds) ? bestPaceSeconds : stats.bestPaceSeconds
        : stats.bestPaceSeconds;
    } else if (h.category === 'stretch' || h.category === 'conditioning') {
      const { totalReps } = h.stats;
      stats.reps = totalReps
        ? (stats.reps ?? 0) + totalReps
        : stats.reps;
    }
  });

  stats.time = stats.seconds && stats.seconds > 0 ? secondsToDuration(stats.seconds) : undefined;
  stats.bestPace = stats.bestPaceSeconds && stats.bestPaceSeconds > 0 ? secondsToDuration(stats.bestPaceSeconds) : undefined;

  return (
    <Stack direction='row' sx={{ overflowX: 'auto', justifyContent: 'space-around' }}>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: purple[700] }}>
          <DownloadDoneIcon />
        </Avatar>
        <Typography variant="body1">
          {history.length}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Workouts</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: grey[700] }}>
          <FormatListBulletedIcon />
        </Avatar>
        <Typography variant="body1">
          {formatLargeNumber(stats.sets, stats.sets >= 10_000)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Sets</Typography>
      </Stack>
      {stats.reps && stats.reps > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: green[700] }}>
            <DoneAllIcon />
          </Avatar>
          <Typography variant="body1">
            {formatLargeNumber(stats.reps, stats.reps >= 10_000)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Reps</Typography>
        </Stack>
      }
      {stats.oneRepMax && stats.oneRepMax > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: pink[700] }}>
            <EmojiEventsSharpIcon />
          </Avatar>
          <Typography variant="body1">
            {Math.round(stats.oneRepMax)} lbs
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Est. 1RM</Typography>
        </Stack>
      }
      {stats.volume && stats.volume > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: cyan[700] }}>
            <FitnessCenterIcon />
          </Avatar>
          <Typography variant="body1">
            {formatLargeNumber(stats.volume, stats.volume >= 10_000)} lbs
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Volume</Typography>
        </Stack>
      }
      {stats.distance !== undefined && stats.distance > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: teal[700] }}>
            <RoomSharpIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{stats.distance} mi</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>Distance</Typography>
        </Stack>
      }
      {stats.time !== undefined &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: blue[700] }}>
            <TimerIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{durationToHhMmSs(stats.time, 'short')}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>Time</Typography>
        </Stack>
      }
      {stats.bestPace !== undefined &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: pink[700] }}>
            <WatchLaterRoundedIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{durationToHhMmSs(stats.bestPace)}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>Best Pace</Typography>
        </Stack>
      }
    </Stack>
  );
}