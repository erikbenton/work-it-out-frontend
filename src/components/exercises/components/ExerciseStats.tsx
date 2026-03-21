import Stack from "@mui/material/Stack";
import type ExerciseHistory from "../../../types/exerciseHistory";
import ExerciseChartTab from "./ExerciseChartsTab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExerciseStatsBar from "./ExerciseStatsBar";

type Props = {
  history: ExerciseHistory[]
}

export default function ExerciseStats({ history }: Props) {
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