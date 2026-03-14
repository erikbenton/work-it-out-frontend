import Card from "@mui/material/Card";
import { useExercises } from "../../../hooks/useExercises";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import type CompletedWorkout from "../../../types/completedWorkout";
import { getMaxMuscleGroup } from "../../../utils/muscles";

type Props = {
  workout: CompletedWorkout
}

export default function CompletedWorkoutListCard({ workout }: Props) {
  const { services } = useExercises();
  const exercises = workout.completedExerciseGroups
    .map(group => services.getExerciseById(group.exerciseId).name)
    .join(', ');
  const maxMuscle = getMaxMuscleGroup(workout.completedExerciseGroups, services);

  return (
    <Card sx={{ width: '100%', bgcolor: '#F5FBFF', borderRadius: 5 }}>
      <CardHeader
        sx={{ overflow: 'hidden' }}
        avatar={
          <Avatar sx={{ bgcolor: maxMuscle.colorRgb }} aria-label="exercise group">
            {maxMuscle.name[0].toUpperCase()}
          </Avatar>
        }
        title={workout.name}
        subheader={exercises}
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}