import { useParams } from "react-router-dom";
import { useWorkouts } from "../../hooks/useWorkouts";
import WorkoutForm from "./components/WorkoutForm";

export default function WorkoutDetails() {
  const id = Number(useParams().id)
  const { services } = useWorkouts();
  const workout = services.getWorkoutById(id, true);

  return (
    <WorkoutForm initWorkout={workout} />
  );
}