import { Box, Typography } from "@mui/material";
import type Exercise from "../../../types/exercise";
import { PieChart } from '@mui/x-charts/PieChart';
import { capitalize } from "../../../utils/formatters";

type Props = {
  exercise: Exercise | undefined
}

export default function ExerciseAboutTab({ exercise }: Props) {
  let totalWeight = 0;
  const muscleData = exercise?.muscles?.map(muscle => {
    totalWeight += muscle.weight;
    return {
      label: capitalize(muscle.name),
      value: muscle.weight,
      color: muscle.colorRgb
    }
  }) ?? [];

  return (
    <Box className="pt-2 px-3">
      <Typography variant="body1" className='capitalize mb-2'>Equipment: {exercise?.equipment}</Typography>
      <Typography variant="body1">Instructions: {exercise?.instructions ?? "No instructions"}</Typography>
      <PieChart
        sx={{ mt: 3, mx: 'auto', width: { xs: '100%', md: '66%' } }}
        series={[{
          data: muscleData,
          valueFormatter: (item: { value: number }) => `${Math.round(item.value * 100 / totalWeight)}%`
        }]}>
      </PieChart>
    </Box>
  );
}