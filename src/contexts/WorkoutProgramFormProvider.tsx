import { useReducer, useState, type ReactNode } from "react";
import type WorkoutProgram from "../types/workoutProgram";
import workoutProgramReducer from "../reducers/workoutProgramReducer";
import WorkoutProgramFormContext from "./programFormContext";

type Props = {
  initProgram: WorkoutProgram,
  children: ReactNode
}

export default function WorktouProgramFormProvider({ initProgram, children }: Props) {
  const [program, dispatch] = useReducer(workoutProgramReducer, initProgram);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const workoutProgramContext = {
    program,
    dispatch,
    saving,
    editing,
    setSaving,
    setEditing
  }

  return (
    <WorkoutProgramFormContext.Provider value={workoutProgramContext}>
      {children}
    </WorkoutProgramFormContext.Provider>
  )
}