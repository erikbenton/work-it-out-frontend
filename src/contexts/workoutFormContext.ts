import { createContext } from "react";
import type Workout from "../types/workout";
import { type WorkoutAction } from "../reducers/workoutReducer";
import type SetTagOption from "../types/setTagOption";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";

export type WorkoutFormContext = {
  workout: Workout,
  setTags: SetTagOption[] | undefined,
  editing: boolean,
  newWorkout: boolean,
  expanded: Map<string, boolean>,
  setEditing: React.Dispatch<React.SetStateAction<boolean>>,
  selectingExercises: boolean,
  setSelectingExercises: React.Dispatch<React.SetStateAction<boolean>>,
  replacementKey?: string,
  setReplacementKey: React.Dispatch<React.SetStateAction<string | undefined>>,
  handleExpandClick: (expanded: boolean, key?: string) => () => void,
  handleEditSaveClick: () => void,
  dispatch: React.ActionDispatch<[action: WorkoutAction]>,
  getTitleMenuOptions: () => VerticalMenuItemProps[],
  addExercises: (exercises: number[]) => void,
  replaceExercise: (exerciseIds: number[]) => void
}

export const WorkoutFormContext = createContext<WorkoutFormContext | null>(null);

export default WorkoutFormContext;
