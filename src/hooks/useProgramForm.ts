import { useContext } from "react";
import WorkoutProgramFormContext from "../contexts/programFormContext";

export default function useProgramForm() {
  const context = useContext(WorkoutProgramFormContext);
  if (!context) {
    throw new Error('Unable to create context for the Workout Program Form');
  }

  return {
    ...context
  };
}