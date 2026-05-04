import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TimelineIcon from '@mui/icons-material/Timeline';
import { blue, cyan, green, grey, pink } from "@mui/material/colors";
import { calculateEstimatedOneRepMax, calculateVolume } from "../../../utils/charts";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import { formatLargeNumber } from "../../../utils/formatters";

type Props = {
  history: CompletedExerciseGroup[]
}

export default function ExerciseStatsBar({ history }: Props) {
  const totalSets = history.reduce((acc, group) => acc + group.completedExerciseSets.length, 0);
  const totalReps = history.reduce((acc, group) => (
    acc + group.completedExerciseSets.reduce((acc, set) => acc + set.reps, 0)
  ), 0);
  const totalVolume = history.reduce((acc, group) => acc + calculateVolume(group), 0);
  const oneRepMax = history.reduce((acc, group) => {
    const oneRep = calculateEstimatedOneRepMax(group);
    return oneRep > acc ? oneRep : acc;
  }, 0);

  return (
    <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', justifyContent: 'space-around' }}>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: blue[700] }}>
          <TimelineIcon />
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
          {formatLargeNumber(totalSets, totalSets >= 10_000)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Sets</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: green[700] }}>
          <DoneAllIcon />
        </Avatar>
        <Typography variant="body1">
          {formatLargeNumber(totalReps, totalReps >= 10_000)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Reps</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: pink[700] }}>
          <DownloadDoneIcon />
        </Avatar>
        <Typography variant="body1">
          {Math.round(oneRepMax)} lbs
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Est. 1RM</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: cyan[700] }}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography variant="body1">
          {formatLargeNumber(totalVolume, totalVolume >= 10_000)} lbs
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }} textAlign='center'>Volume</Typography>
      </Stack>
    </Stack>
  );
}