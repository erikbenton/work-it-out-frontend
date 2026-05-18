import { createContext } from "react"
import type WorkoutProgram from "../types/workoutProgram"
import type { WorkoutProgramAction } from "../reducers/workoutProgramReducer";

export type WorkoutProgramFormContext = {
  program: WorkoutProgram,
  dispatch: React.ActionDispatch<[action: WorkoutProgramAction]>,
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  saving: boolean,
  setSaving: React.Dispatch<React.SetStateAction<boolean>>,
}

export const WorkoutProgramFormContext = createContext<WorkoutProgramFormContext | null>(null);

export default WorkoutProgramFormContext;