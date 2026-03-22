import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import type Workout from "../../../types/workout";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { useWorkouts } from "../../../hooks/useWorkouts";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useExercises } from "../../../hooks/useExercises";
import { getMaxMuscleGroup } from "../../../utils/muscles";

type Props = {
  workout: Workout
}

export default function WorkoutListCard({ workout }: Props) {
  const { services } = useWorkouts();
  const { services: exercises } = useExercises();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();
  const maxMuscle = getMaxMuscleGroup(workout.exerciseGroups, exercises);
  const exerciseNames = workout.exerciseGroups
    .map(group => exercises.getExerciseById(group.exerciseId).name)
    .join(', ');

  const menuItems = [
    {
      label: "Clone",
      handleClick: () => {
        services.clone(workout);
      },
    },
    {
      label: 'Start Workout',
      handleClick: () => {
        dispatch({
          type: 'initializeWorkout',
          payload: { initialWorkout: workout }
        });
        navigate(`/activeWorkout`);
      }
    },
    {
      label: "Delete",
      handleClick: () => {
        services.remove(workout);
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Card sx={{ bgcolor: '#F5FBFF', borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Link to={`/workouts/${workout.id}`}>
            <Avatar aria-label="workout" sx={{ bgcolor: maxMuscle.colorRgb }}>
              {maxMuscle.name[0].toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <Link to={`/workouts/${workout.id}`} className="inline-block w-full">
            {workout.name}
          </Link>
        }
        subheader={
          <Link to={`/workouts/${workout.id}`} className="inline-block w-full">
            {workout.description ?? exerciseNames}
          </Link>
        }
        action={
          <VerticalIconMenu
            buttonId={workout.name.split(' ').join('-').toLowerCase() + "-options"}
            menuItems={menuItems}
          />
        }
        slotProps={{ title: { variant: 'h6' } }}
      />
    </Card>
  );
}