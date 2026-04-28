import WorkoutForm from "./components/WorkoutForm";
import { WorkoutFormProvider } from "../../contexts/WorkoutFormProvider";
import type Workout from "../../types/workout";
import { useLocation } from "react-router-dom";

const newWorkout: Workout = {
  id: 0,
  name: 'New Workout',
  exerciseGroups: []
}

export default function WorkoutCreate() {
  const location = useLocation();
  const workout: Workout = location.state
    ? location.state as Workout
    : newWorkout;

  return (
    <WorkoutFormProvider initWorkout={workout}>
      <WorkoutForm />
    </WorkoutFormProvider>
  );
}