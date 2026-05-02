import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type Workout from "../../../types/workout";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import useActiveWorkout from "../../../hooks/useActiveWorkout";
import { useExercises } from "../../../hooks/useExercises";
import { getMaxMuscleGroup } from "../../../utils/muscles";
import { bgBlue } from "../../../utils/styling";

type Props = {
  workout: Workout
}

export default function StartWorkoutCard({ workout }: Props) {
  const { services: exercises } = useExercises();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();
  const maxMuscle = getMaxMuscleGroup(workout.exerciseGroups, exercises);

  const menuItems = [
    {
      label: "View",
      handleClick: () => {
        navigate(`/workouts/${workout.id}`);
      },
    },
  ];

  return (
    <Card sx={{ bgcolor: bgBlue, borderRadius: 5 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="workout" sx={{ bgcolor: maxMuscle.colorRgb }}>
            {maxMuscle.name[0].toUpperCase()}
          </Avatar>
        }
        title={workout.name}
        subheader={workout.description ?? ""}
        action={
          <VerticalIconMenu
            buttonId={workout.name.split(' ').join('-').toLowerCase() + "-options"}
            menuItems={menuItems}
          />
        }
        slotProps={{ title: { variant: 'h6' } }}
        sx={{ pb: 0 }}
      />
      <CardActions disableSpacing className="flex flex-col items-center">
        <Button
          fullWidth
          aria-label="start workout"
          sx={{ textTransform: "none" }}
          variant="text"
          onClick={() => {
            dispatch({ type: 'initializeWorkout', payload: { initialWorkout: workout } });
            navigate('/training');
          }}
        >
          Start Workout
        </Button>
      </CardActions>
    </Card>
  );
}