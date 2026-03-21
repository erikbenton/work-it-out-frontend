import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import { cyan, green, indigo } from "@mui/material/colors";
import { calculateMaxEstimatedPersonalRecord, calculateVolume } from "../../../utils/charts";
import type ExerciseHistory from "../../../types/exerciseHistory";

type Props = {
  history: ExerciseHistory[]
}

export default function ExerciseStatsBar({ history }: Props) {
  const totalReps = history.reduce((acc, group) => (
    acc + group.completedExerciseSets.reduce((acc, set) => acc + set.reps, 0)
  ), 0);
  const totalVolume = history.reduce((acc, group) => acc + calculateVolume(group), 0);
  const maxPersonalRecord = history.reduce((acc, group) => {
    const personalRecord = calculateMaxEstimatedPersonalRecord(group);
    return personalRecord > acc ? personalRecord : acc;
  }, 0);

  return (
    <Stack direction='row' spacing={1} sx={{ overflowX: 'scroll' }}>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: green[700] }}>
          <DoneAllIcon />
        </Avatar>
        <Typography variant="body1">
          {Math.round(totalReps)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Total Reps</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: indigo[700] }}>
          <DownloadDoneIcon />
        </Avatar>
        <Typography variant="body1">
          {Math.round(maxPersonalRecord)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Max Est. PR</Typography>
      </Stack>
      <Stack alignItems='center' sx={{ p: 1, pb: 0 }}>
        <Avatar sx={{ bgcolor: cyan[700] }}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography variant="body1">
          {Math.round(totalVolume)} lbs
        </Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>Volume</Typography>
      </Stack>
    </Stack>
  );
}