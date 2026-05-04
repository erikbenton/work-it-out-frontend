import { blue, cyan, green, grey, purple, red } from "@mui/material/colors";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TimelineIcon from '@mui/icons-material/Timeline';
import TimerIcon from '@mui/icons-material/Timer';
import useUserStats from "../../../hooks/useUserStats";
import { Grid } from "@mui/material";
import StatIcon from "../../layout/StatIcon";
import { formatLargeNumber } from "../../../utils/formatters";

type Props = {
  numberOfDays: number
}

export default function UserStatsIcons({ numberOfDays }: Props) {
  const { userStats } = useUserStats(numberOfDays);
  const met = 3;
  const avgWeightKg = 68;
  const calories = Math.floor((userStats.durationInSeconds + numberOfDays) * met * avgWeightKg / (60 * 60));

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
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
          icon={<WhatshotIcon />}
          color={red[700]}
          text={calories}
          label="Calories"
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
          text={`${formatLargeNumber(userStats.totalVolume, userStats.totalVolume > 10_000)} lbs`}
          label="Volume"
        />
      </Grid>
    </Grid>
  )
}