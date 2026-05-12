import { Box, Typography } from "@mui/material";
import type Exercise from "../../../types/exercise";
import { PieChart } from '@mui/x-charts/PieChart';
import { capitalize } from "../../../utils/formatters";
import useExerciseCategories from "../../../hooks/useExerciseCategories";
import { useExercises } from "../../../hooks/useExercises";

type Props = {
  exercise: Exercise
}

export default function ExerciseAboutTab({ exercise }: Props) {
  const { categories } = useExerciseCategories();
  const { services: exerciseServices } = useExercises();
  const category = exerciseServices.getExerciseCategory(exercise.id) ?? categories[0];
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
        {category.name}{exercise.equipment ? ` - ${exercise.equipment}` : ''}
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