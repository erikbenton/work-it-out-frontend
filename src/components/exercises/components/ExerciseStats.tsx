import ExerciseChart from "./ExerciseCharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExerciseStatsBar from "./ExerciseStatsBar";
import { useExerciseHistory } from "../../../hooks/useExerciseHistory";

type Props = {
  exerciseId: number,
  period: number,
  setPeriod: React.Dispatch<React.SetStateAction<number>>
}

export default function ExerciseStats({ exerciseId, period, setPeriod }: Props) {
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
    <>
      <ExerciseStatsBar history={history} />
      <ExerciseChart history={history} period={period} setPeriod={setPeriod} />
    </>
  )
}