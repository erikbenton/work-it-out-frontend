import Card from "@mui/material/Card";
import { useExercises } from "../../../hooks/useExercises";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import type CompletedWorkout from "../../../types/completedWorkout";

type Props = {
  workout: CompletedWorkout
}

export default function CompletedWorkoutListCard({ workout }: Props) {
  const { services } = useExercises();
  const exercises = workout.completedExerciseGroups
    .map(group => services.getExerciseById(group.exerciseId).name)
    .join(', ');

  return (
    <Card sx={{ width: '100%', bgcolor: '#F5FBFF' }}>
      <CardHeader
        sx={{ overflow: 'hidden' }}
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="exercise group">
            B
          </Avatar>
        }
        title={workout.name}
        subheader={exercises}
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}