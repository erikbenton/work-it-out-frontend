import { createContext } from "react";
import type ActiveWorkout from "../types/activeWorkout";
import type SetTagOption from "../types/setTagOption";
import type { ActiveWorkoutAction } from "../reducers/activeWorkoutReducer";
import type { CompletedWorkoutServices } from "../hooks/useCompletedWorkouts";

export type ActiveWorkoutContext = {
    workout: ActiveWorkout | null,
    complete: boolean,
    setTags: SetTagOption[] | undefined,
    activeGroupKey: string | undefined,
    editing: boolean,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    saving: boolean,
    setSaving: React.Dispatch<React.SetStateAction<boolean>>,
    handleSetActiveGroupKey: (newKey: string | undefined) => () => void,
    emptyWorkout: boolean,
    dispatch: React.ActionDispatch<[action: ActiveWorkoutAction]>,
    timerAppeared: boolean,
    setTimerAppeared: React.Dispatch<React.SetStateAction<boolean>>,
    timerOffset: number,
    setTimerOffset: React.Dispatch<React.SetStateAction<number>>,
    handleFinishWorkout: (services: CompletedWorkoutServices) => void
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContext | null>(null);

export default ActiveWorkoutContext;