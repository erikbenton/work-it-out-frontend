import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type Workout from "../../types/Workout";
import LoadingMessage from "../layout/LoadingMessage";
import { getWorkoutById } from "../../requests/workouts";

export default function WorkoutDetails() {
    const id = Number(useParams().id)
    const { data: workout, isLoading} = useQuery<Workout>({
    queryKey: ['workout'],
    queryFn: () => getWorkoutById(id)
  });

    if (isLoading) {
      return (<LoadingMessage dataName='workouts' />);
    }

  return (
    <Box>
      {workout?.name}
    </Box>
  )
}