import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import type Workout from "../../../types/workout";

type Params = {
  workout: Workout
}

export default function WorkoutListCard({ workout }: Params) {
  return (
    <Card>
      <Link className="col-auto" to={`/workouts/${workout.id}`}>
        <CardHeader
          avatar={
            <Avatar className="bg-neutral-300" aria-label="workout">
              R
            </Avatar>
          }
          title={workout.name}
          subheader={workout.description ?? ""}
        />
      </Link>
      <CardActions disableSpacing className="flex flex-col items-center">
        <Button
          aria-label="start workout"
          sx={{ textTransform: "none" }}
          variant="text"
        >
          Start Workout
        </Button>
      </CardActions>
    </Card>
  );
}