import Stack from "@mui/material/Stack";
import type CompletedWorkout from "../../../types/completedWorkout";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { blue, cyan, green, grey, pink } from "@mui/material/colors";
import TimerIcon from '@mui/icons-material/Timer';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getShortDate } from "../../../utils/formatters";

type Props = {
  workout: CompletedWorkout
}

export default function CompletedWorkoutStats({ workout }: Props) {
  const stats = {
    createdAt: getShortDate(workout.createdAt),
    duration: workout.duration,
    sets: 0,
    reps: 0,
    volume: 0,
  };

  workout.completedExerciseGroups.forEach(group => {
    stats.sets += group.completedExerciseSets.length;
    stats.reps += group.completedExerciseSets.reduce((acc, curr) => curr.reps + acc, 0);
    stats.volume += group.completedExerciseSets.reduce((acc, curr) => ((curr.weight ?? 0) * curr.reps) + acc, 0);
  });

  return (
    <Stack direction='row' spacing={1} sx={{ overflowX: 'scroll' }}>
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
        <Typography variant="body1">{stats.duration}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Duration</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: grey[700] }}>
          <FormatListBulletedIcon />
        </Avatar>
        <Typography variant="body1">{stats.sets}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Sets</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: green[700] }}>
          <DoneAllIcon />
        </Avatar>
        <Typography variant="body1">{stats.reps}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Reps</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: cyan[700] }}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography variant="body1">{stats.volume} lbs</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Volume</Typography>
      </Stack>
    </Stack>
  );
}