import Stack from "@mui/material/Stack";
import type CompletedWorkout from "../../../types/completedWorkout";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue, cyan, green, grey, pink, teal } from "@mui/material/colors";
import TimerIcon from '@mui/icons-material/Timer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import RoomSharpIcon from '@mui/icons-material/RoomSharp';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { checkPluralization, durationToHhMmSs, getShortDate, secondsToDuration } from "../../../utils/formatters";
import { calculateLiftStats, calculateStretchStats, calculateTimedStats } from "../../../utils/exerciseStats";
import { useExercises } from "../../../hooks/useExercises";

type Props = {
  workout: CompletedWorkout
}

type WorkoutStats = {
  createdAt: string,
  duration: string,
  sets: number,
  reps?: number,
  volume?: number,
  distance?: number,
  seconds?: number,
  time?: string
}

const initializeWorkoutStats = (workout: CompletedWorkout): WorkoutStats => {
  return {
    createdAt: getShortDate(workout.createdAt),
    duration: workout.duration,
    sets: 0
  }
}

export default function CompletedWorkoutStats({ workout }: Props) {
  const { services: exerciseServices } = useExercises();

  const stats = initializeWorkoutStats(workout);
  workout.completedExerciseGroups.forEach(group => {
    stats.sets += group.completedExerciseSets.length;
    const exercise = exerciseServices.getExerciseById(group.exerciseId);
    if (exercise.category === 'lift') {
      const { totalReps, totalVolume } = calculateLiftStats(group);
      stats.reps = totalReps
        ? (stats.reps ?? 0) + totalReps
        : stats.reps;
      stats.volume = totalVolume
        ? (stats.volume ?? 0) + totalVolume
        : stats.volume;
    } else if (exercise.category === 'timed') {
      const { totalDistance, totalSeconds } = calculateTimedStats(group);
      stats.distance = totalDistance
        ? (stats.distance ?? 0) + totalDistance
        : stats.distance;
      stats.seconds = totalSeconds
        ? (stats.seconds ?? 0) + totalSeconds
        : stats.seconds;
    } else if (exercise.category === 'stretch' || exercise.category === 'conditioning') {
      const { totalReps } = calculateStretchStats(group);
      stats.reps = totalReps
        ? (stats.reps ?? 0) + totalReps
        : stats.reps;
    }
  });

  stats.time = stats.seconds && stats.seconds > 0 ? secondsToDuration(stats.seconds) : undefined;

  return (
    <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', justifyContent: 'space-around' }}>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: pink[700] }}>
          <EventAvailableIcon />
        </Avatar>
        <Typography variant="body1">
          {stats.createdAt}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Date</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: blue[700] }}>
          <TimerIcon />
        </Avatar>
        <Typography variant="body1" noWrap>{stats.duration}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Duration</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: grey[700] }}>
          <FormatListBulletedIcon />
        </Avatar>
        <Typography variant="body1" noWrap>{stats.sets}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>{checkPluralization('Set', stats.sets)}</Typography>
      </Stack>
      {stats.reps !== undefined && stats.reps > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: green[700] }}>
            <DoneAllIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{stats.reps}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>{checkPluralization('Rep', stats.reps)}</Typography>
        </Stack>
      }
      {stats.volume !== undefined && stats.volume > 0 &&
        <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
          <Avatar sx={{ bgcolor: cyan[700] }}>
            <FitnessCenterIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{stats.volume} lbs</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>Volume</Typography>
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
            <WatchLaterRoundedIcon />
          </Avatar>
          <Typography variant="body1" noWrap>{durationToHhMmSs(stats.time, 'short')}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>Time</Typography>
        </Stack>
      }
    </Stack>
  );
}