import { useContext } from "react";
import WorkoutFormContext from "../contexts/workoutFormContext";

export default function useWorkoutForm() {
  const context = useContext(WorkoutFormContext);
  if (!context) {
    throw new Error('Unable to create context for Workout Form');
  }

  return {
    ...context
  };
}