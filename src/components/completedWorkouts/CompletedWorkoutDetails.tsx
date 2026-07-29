import { useParams } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { CompletedWorkoutFormProvider } from "../../contexts/completedWorkoutFormProvider";
import CompletedWorkoutForm from "./components/CompletedWorkoutForm";
import NoItemSelected from "../layout/NoItemSelected";

export default function CompletedWorkoutDetails() {
  const id = Number(useParams().id);
  const { services } = useCompletedWorkouts();
  const workout = services.getCompletedWorkoutByIdUnsafe(id);

  if (!workout) {
    return (<NoItemSelected label="No workout history selected." />)
  }

  return (
    <CompletedWorkoutFormProvider initWorkout={workout}>
      <CompletedWorkoutForm />
    </CompletedWorkoutFormProvider>
  );
}