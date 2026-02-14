import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import type Workout from "../../../types/workout";
import VerticalIconMenu from "../../layout/VerticalIconMenu";
import { useWorkouts } from "../../../hooks/useWorkouts";
import { Typography } from "@mui/material";
import useActiveWorkout from "../../../hooks/useActiveWorkout";

type Props = {
  workout: Workout
}

export default function WorkoutListCard({ workout }: Props) {
  const { services } = useWorkouts();
  const { dispatch } = useActiveWorkout();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Delete",
      handleClick: () => {
        services.remove(workout);
      },
      sx: { color: 'error.main' }
    },
  ];

  return (
    <Card sx={{bgcolor: '#F5FBFF'}}>
      <CardHeader
        avatar={
          <Link to={`/workouts/${workout.id}`}>
            <Avatar className="bg-neutral-300" aria-label="workout">
              R
            </Avatar>
          </Link>
        }
        title={
          <Link to={`/workouts/${workout.id}`}>
            <Typography>
              {workout.name}
            </Typography>
          </Link>
        }
        subheader={workout.description ?? ""}
        action={
          <VerticalIconMenu
            buttonId={workout.name.split(' ').join('-').toLowerCase() + "-options"}
            menuItems={menuItems}
          />
        }
      />
      <CardActions disableSpacing className="flex flex-col items-center">
        <Button
          aria-label="start workout"
          sx={{ textTransform: "none" }}
          variant="text"
          onClick={() => {
            dispatch({ type: 'initializeWorkout', payload: { initialWorkout: workout } });
            navigate('/activeWorkout');
          }}
        >
          Start Workout
        </Button>
      </CardActions>
    </Card>
  );
}