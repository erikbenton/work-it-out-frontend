import { createContext } from "react";
import type CompletedWorkout from "../types/completedWorkout";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";

export type CompletedWorkoutFormContext = {
  workout: CompletedWorkout,
  saving: boolean,
  setSaving: (value: React.SetStateAction<boolean>) => void,
  menuItems: VerticalMenuItemProps[]
}

export const CompletedWorkoutFormContext = createContext<CompletedWorkoutFormContext | null>(null);

export default CompletedWorkoutFormContext;