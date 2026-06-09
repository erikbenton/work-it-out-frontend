import { useParams } from "react-router-dom";
import { useWorkouts } from "../../hooks/useWorkouts";
import WorkoutForm from "./components/WorkoutForm";
import { WorkoutFormProvider } from "../../contexts/WorkoutFormProvider";
import NoItemSelected from "../layout/NoItemSelected";

export default function WorkoutDetails() {
  const id = Number(useParams().id)
  const { services } = useWorkouts();
  const workout = services.getWorkoutByIdUnsafe(id, true);

  if (!workout) {
    return (<NoItemSelected label="No Workout selected." />)
  }

  return (
    <WorkoutFormProvider initWorkout={workout}>
      <WorkoutForm />
    </WorkoutFormProvider>
  );
}