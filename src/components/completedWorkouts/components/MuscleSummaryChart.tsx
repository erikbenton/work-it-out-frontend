import { PieChart } from '@mui/x-charts/PieChart';
import { useExercises } from "../../../hooks/useExercises";
import useMuscleOptions from "../../../hooks/useMuscleOptions";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup"
import { capitalize } from "../../../utils/formatters";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type Props = {
  groups: CompletedExerciseGroup[]
}

const avgBodyWeight = 150;

export default function MuscleSummaryChart({ groups }: Props) {
  const { services: muscleServices } = useMuscleOptions();
  const { services: exerciseServices } = useExercises();
  let hasLifts = false;

  // Create map for summing up volume for each muscle
  const muscleVolumes = new Map<string, number>();

  const totalVolume = groups.reduce((volume, group) => {
    const exercise = exerciseServices.getExerciseById(group.exerciseId);
    let groupVolume = 0;
    // only calculate if the exercise is a lift
    if (exercise.category === 'lift') {
      hasLifts = true;
      groupVolume = group.completedExerciseSets
        .reduce((acc, curr) => ((curr.weight ?? (avgBodyWeight / 4)) * (curr.reps ?? 0)) + acc, 0);
      const totalMuscleWeights = (exercise.muscles ?? []).reduce((acc, curr) => acc + curr.weight, 0);
      for (const muscle of exercise.muscles ?? []) {
        const muscleVolume = (muscle.weight / totalMuscleWeights) * groupVolume;
        muscleVolumes.set(muscle.name, (muscleVolumes.get(muscle.name) ?? 0) + muscleVolume);
      }
    }

    return volume + groupVolume;
  }, 0);

  const muscleSummary = Array.from(muscleVolumes).map(([name, volume]) => ({
    label: capitalize(name),
    value: (volume / totalVolume) * 100,
    color: muscleServices.getColorByName(name),
  }));

  if (!hasLifts) {
    return (<></>);
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h6' sx={{ mb: 1 }}>Lifting Muscles by Volume</Typography>
      <PieChart
        sx={{ height: '200px' }}
        series={[{
          data: muscleSummary,
          valueFormatter: (item: { value: number }) => `${item.value.toFixed(1)}%`
        }]}
      />
    </Box>
  )
}