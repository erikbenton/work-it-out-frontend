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
      {exercise?.equipment &&
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ mr: 1, display: 'inline-block' }}>Equipment:</Typography>
          <Typography variant="body1" sx={{ display: 'inline-block', fontSize: '1.25rem' }}>{capitalize(exercise.equipment)}</Typography>
        </Box>
      }
      {exercise?.instructions &&
        <Box>
          <Typography variant="h6" sx={{ mr: 1, display: 'block' }}>Instructions</Typography>
          <Typography variant="body1" sx={{ display: 'block' }}>{exercise.instructions}</Typography>
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