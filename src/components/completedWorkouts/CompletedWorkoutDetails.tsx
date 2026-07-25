import { useParams } from "react-router-dom";
import { useCompletedWorkouts } from "../../hooks/useCompletedWorkouts";
import { CompletedWorkoutFormProvider } from "../../contexts/completedWorkoutFormProvider";
import CompletedWorkoutForm from "./components/CompletedWorkoutForm";

export default function CompletedWorkoutDetails() {
  const id = Number(useParams().id);
  const { services } = useCompletedWorkouts();
  const workout = services.getCompletedWorkoutById(id);

  return (
    <CompletedWorkoutFormProvider initWorkout={workout}>
      <CompletedWorkoutForm />
    </CompletedWorkoutFormProvider>
  );
}