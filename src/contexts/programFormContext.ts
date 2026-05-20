import { createContext } from "react"
import type WorkoutProgram from "../types/workoutProgram"
import type { WorkoutProgramAction } from "../reducers/workoutProgramReducer";
import type Workout from "../types/workout";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";

export type WorkoutProgramFormContext = {
  program: WorkoutProgram,
  workouts: Workout[],
  dispatch: React.ActionDispatch<[action: WorkoutProgramAction]>,
  editing: boolean,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  saving: boolean,
  setSaving: React.Dispatch<React.SetStateAction<boolean>>,
  selectingWorkouts: boolean,
  expanded: Map<number, boolean>,
  handleExpandClick: (expanded: boolean, workoutId: number) => () => void,
  handleEditSaveClick: () => void,
  handleStartSelectingWorkouts: () => void,
  handleStopSelectingWorkouts: () => void,
  getProgramOptions: () => VerticalMenuItemProps[],
  getProgramWorkoutOptions: (workout: Workout) => VerticalMenuItemProps[],
  addWorkouts: (newWorkoutIds: number[]) => void
}

export const WorkoutProgramFormContext = createContext<WorkoutProgramFormContext | null>(null);

export default WorkoutProgramFormContext;