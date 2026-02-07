import { createContext } from "react";
import type Workout from "../types/workout";
import { type WorkoutAction } from "../reducers/workoutReducer";
import type SetTagOption from "../types/setTagOption";

export type WorkoutFormContext = {
  workout: Workout,
  setTags: SetTagOption[] | undefined,
  editing: boolean,
  newWorkout: boolean,
  expanded: boolean[],
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  handleExpandClick: (expanded: boolean, index: number) => () => void,
  dispatch: React.ActionDispatch<[action: WorkoutAction]>
}

export const WorkoutFormContext = createContext<WorkoutFormContext | null>(null);

export default WorkoutFormContext;
