import { createContext } from "react";
import type CompletedWorkout from "../types/completedWorkout";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";
import type { CompletedWorkoutAction } from "../reducers/completedWorkoutReducer";
import type SetTagOption from "../types/setTagOption";

export type CompletedWorkoutFormContext = {
  workout: CompletedWorkout,
  dispatch: React.ActionDispatch<[action: CompletedWorkoutAction]>,
  saving: boolean,
  setSaving: (value: React.SetStateAction<boolean>) => void,
  editing: boolean,
  setEditing: (value: React.SetStateAction<boolean>) => void,
  handleSaveClick: () => void,
  handleEditClick: () => void,
  handleCancelClick: () => void,
  menuItems: VerticalMenuItemProps[],
  setTags?: SetTagOption[]
}

export const CompletedWorkoutFormContext = createContext<CompletedWorkoutFormContext | null>(null);

export default CompletedWorkoutFormContext;