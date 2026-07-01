import { blue, cyan, green, grey, purple, red } from "@mui/material/colors";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import TimerIcon from '@mui/icons-material/Timer';
import useUserStats from "../../../hooks/useUserStats";
import { Grid } from "@mui/material";
import StatIcon from "../../layout/StatIcon";
import { checkPluralization, formatLargeNumber } from "../../../utils/formatters";
import useUser from "../../../hooks/useUser";
import type UserInfo from "../../../types/userInfo";

type Props = {
  numberOfDays: number
}

const getUserWeightKg = (userInfo: UserInfo) => {
  const defaultKgWeight = 68;
  const { bodyWeight, weightUnit } = userInfo;
  if (!bodyWeight) return defaultKgWeight;

  if (weightUnit === 'kg') {
    return bodyWeight;
  }

  if (weightUnit === 'lb') {
    return bodyWeight / 2.205;
  }

  return defaultKgWeight;
}

export default function UserStatsIcons({ numberOfDays }: Props) {
  const { user, defaultUserInfo } = useUser();
  const { userInfo = defaultUserInfo } = user;
  const { userStats } = useUserStats(numberOfDays);
  const met = 3;
  const weightInKg = getUserWeightKg(userInfo)
  const calories = Math.floor((userStats.durationInSeconds + numberOfDays) * met * weightInKg / (60 * 60));

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={4}>
        <StatIcon
          icon={<DownloadDoneIcon />}
          color={purple[700]}
          text={userStats.numberOfWorkouts}
          label={checkPluralization('Workout', userStats.numberOfWorkouts)}
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
          text={formatLargeNumber(calories, calories >= 10_000)}
          label="Calories"
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<FormatListBulletedIcon />}
          color={grey[700]}
          text={formatLargeNumber(userStats.numberOfSets, userStats.numberOfSets >= 10_000)}
          label={checkPluralization('Set', userStats.numberOfSets)}
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<DoneAllIcon />}
          color={green[700]}
          text={formatLargeNumber(userStats.numberOfReps, userStats.numberOfReps >= 10_000)}
          label={checkPluralization('Rep', userStats.numberOfReps)}
        />
      </Grid>
      <Grid size={4}>
        <StatIcon
          icon={<FitnessCenterIcon />}
          color={cyan[700]}
          text={`${formatLargeNumber(userStats.totalVolume, userStats.totalVolume >= 10_000)} ${userInfo.weightUnit}`}
          label="Volume"
        />
      </Grid>
    </Grid>
  )
}