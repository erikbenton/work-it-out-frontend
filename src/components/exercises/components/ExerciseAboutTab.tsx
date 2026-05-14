import { Box, Typography } from "@mui/material";
import type Exercise from "../../../types/exercise";
import { PieChart } from '@mui/x-charts/PieChart';
import { capitalize } from "../../../utils/formatters";

type Props = {
  exercise: Exercise
}

export default function ExerciseAboutTab({ exercise }: Props) {
  let totalWeight = 0;
  const muscleData = exercise.muscles?.map(muscle => {
    totalWeight += muscle.weight;
    return {
      label: capitalize(muscle.name),
      value: muscle.weight,
      color: muscle.colorRgb
    }
  }) ?? [];

  return (
    <Box className="pt-2 px-3">
      <Typography variant="h6" sx={{ mb: 1, mr: 1, display: 'inline-block', textTransform: "capitalize" }}>
        {exercise.category}{exercise.equipment ? ` - ${exercise.equipment}` : ''}
      </Typography>
      {exercise.instructions &&
        <Box>
          <Typography variant="h6" sx={{ mr: 1, display: 'block' }}>
            Instructions
          </Typography>
          <Typography variant="body1" sx={{ display: 'block' }}>
            {exercise.instructions}
          </Typography>
        </Box>
      }
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