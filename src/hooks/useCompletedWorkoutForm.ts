import { useContext } from "react";
import CompletedWorkoutFormContext from "../contexts/completedWorkoutFormContext";


export default function useCompletedWorkoutForm() {
  const context = useContext(CompletedWorkoutFormContext);
  if (!context) {
    throw new Error("Unable to create context for Completed Workout Form");
  }

  return {
    ...context
  }
}