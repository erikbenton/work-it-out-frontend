import { PieChart } from '@mui/x-charts/PieChart';
import { useExercises } from "../../../hooks/useExercises";
import useMuscleOptions from "../../../hooks/useMuscleOptions";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup"
import { capitalize } from "../../../utils/formatters";

type Props = {
  groups: CompletedExerciseGroup[]
}

export default function MuscleSummaryChart({ groups }: Props) {
  const { services: muscleServices } = useMuscleOptions();
  const { services: exerciseServices } = useExercises();

  // Create map for summing up volume for each muscle
  const muscleVolumes = new Map<string, number>();

  const totalVolume = groups.reduce((volume, group) => {
    const groupVolume = group.completedExerciseSets
      .reduce((acc, curr) => ((curr.weight ?? 150) * curr.reps) + acc, 0);

    // populate the muscleVolumes map
    const exercise = exerciseServices.getExerciseById(group.exerciseId);
    const totalMuscleWeights = (exercise.muscles ?? []).reduce((acc, curr) => acc + curr.weight, 0);
    for (const muscle of exercise.muscles ?? []) {
      const muscleVolume = (muscle.weight / totalMuscleWeights) * groupVolume;
      muscleVolumes.set(muscle.name, (muscleVolumes.get(muscle.name) ?? 0) + muscleVolume);
    }

    return volume + groupVolume;
  }, 0);

  const muscleSummary = Array.from(muscleVolumes).map(([name, volume]) => ({
    label: capitalize(name),
    value: (volume / totalVolume) * 100,
    color: muscleServices.getColorByName(name),
  }));

  return (
    <PieChart
      sx={{ mt: 5, height: '200px' }}
      series={[{
        data: muscleSummary,
        valueFormatter: (item: { value: number }) => `${item.value.toFixed(1)}%`
      }]}
    />
  )
}