import { useContext } from "react";
import ActiveWorkoutContext from "../contexts/activeWorkoutContext";

export default function useActiveWorkout() {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error('Unable to create context for Active Workout');
  }

  return {
    ...context
  };
}