import ExerciseChart from "./ExerciseCharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExerciseStatsBar from "./ExerciseStatsBar";
import { useExerciseHistory } from "../../../hooks/useExerciseHistory";
import LoadingIcon from "../../layout/LoadingIcon";
import type { ExerciseCategory } from "../../../types/exerciseCategory";

type Props = {
  exerciseId: number,
  category: ExerciseCategory,
  period: number,
  setPeriod: React.Dispatch<React.SetStateAction<number>>
}

export default function ExerciseStats({ exerciseId, category, period, setPeriod }: Props) {
  const { data: history, isLoading } = useExerciseHistory(exerciseId, category);

  if (isLoading || !history) {
    return (<LoadingIcon label='Histories' />);
  }

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