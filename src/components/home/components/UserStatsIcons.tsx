import { blue, cyan, green, grey, pink, purple } from "@mui/material/colors";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TimelineIcon from '@mui/icons-material/Timeline';
import TimerIcon from '@mui/icons-material/Timer';
import useUserStats from "../../../hooks/useUserStats";
import { Grid } from "@mui/material";
import StatIcon from "../../layout/StatIcon";

type Props = {
  numberOfDays: number
}

export default function UserStatsIcons({ numberOfDays }: Props) {
  const { userStats } = useUserStats(numberOfDays);

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <StatIcon
          icon={<TimelineIcon />}
          color={purple[700]}
          text={userStats.numberOfWorkouts}
          label="Workouts"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<TimerIcon />}
          color={blue[700]}
          text={userStats.duration}
          label="Duration"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<DownloadDoneIcon />}
          color={pink[700]}
          text={userStats.numberOfExercises}
          label="Exercises"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<FormatListBulletedIcon />}
          color={grey[700]}
          text={userStats.numberOfSets}
          label="Sets"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<DoneAllIcon />}
          color={green[700]}
          text={userStats.numberOfReps}
          label="Reps"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<FitnessCenterIcon />}
          color={cyan[700]}
          text={`${userStats.totalVolume} lbs`}
          label="Volume"
        />
      </Grid>
    </Grid>
  )
}