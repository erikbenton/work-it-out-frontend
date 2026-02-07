import WorkoutForm from "./components/WorkoutForm";
import { WorkoutFormProvider } from "./components/WorkoutFormProvider";
import type Workout from "../../types/workout";

export default function WorkoutCreate() {
  const workout: Workout = {
    id: 0,
    name: 'New Workout',
    exerciseGroups: []
  }

  return (
    <WorkoutFormProvider initWorkout={workout}>
      <WorkoutForm />
    </WorkoutFormProvider>
  );
}