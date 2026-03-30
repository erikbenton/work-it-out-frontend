import Card from "@mui/material/Card";
import { useExercises } from "../../../hooks/useExercises";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import type CompletedWorkout from "../../../types/completedWorkout";
import { getMaxMuscleGroup } from "../../../utils/muscles";
import { getDateTime } from "../../../utils/dateTime";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { bgBlue } from "../../../utils/styling";

type Props = {
  workout: CompletedWorkout
}

export default function CompletedWorkoutListRow({ workout }: Props) {
  const { services } = useExercises();
  const exercises = workout.completedExerciseGroups
    .map(group => services.getExerciseById(group.exerciseId).name)
    .join(', ');
  const maxMuscle = getMaxMuscleGroup(workout.completedExerciseGroups, services);
  const dateTime = getDateTime(workout.createdAt);

  return (
    <Stack spacing={2} direction='row' flex={1} flexGrow={1} alignItems='center' sx={{ px: 2 }}>
      <Stack sx={{ width: '32px' }}>
        <Typography variant="subtitle2">{dateTime.dayOfWeek}</Typography>
        <Typography variant="subtitle1">{dateTime.dayOfMonth}</Typography>
      </Stack>
      <Card sx={{ width: '100%', bgcolor: bgBlue, borderRadius: 5 }}>
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
    </Stack>
  );
}