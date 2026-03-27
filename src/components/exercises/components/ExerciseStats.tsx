import Stack from "@mui/material/Stack";
import ExerciseChart from "./ExerciseCharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExerciseStatsBar from "./ExerciseStatsBar";
import { useCompletedWorkouts } from "../../../hooks/useCompletedWorkouts";

type Props = {
  exerciseId: number
}

export default function ExerciseStats({ exerciseId }: Props) {
  const { services } = useCompletedWorkouts();
  const history = services.getCompletedGroupsByExerciseId(exerciseId);

  if (history.length === 0) {
    return (
      <Box>
        <Typography>
          No data was found for this exercise in the time period.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <ExerciseStatsBar history={history} />
      <ExerciseChart history={history} />
    </Stack>
  )
}