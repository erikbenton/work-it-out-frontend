import Stack from "@mui/material/Stack";
import ExerciseChartTab from "./ExerciseChartsTab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExerciseStatsBar from "./ExerciseStatsBar";
import { useExerciseHistory } from "../../../hooks/useExerciseHistory";

type Props = {
  exerciseId: number
}

export default function ExerciseStats({ exerciseId }: Props) {
  const { data: history } = useExerciseHistory(exerciseId);

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
      <ExerciseChartTab history={history} />
    </Stack>
  )
}