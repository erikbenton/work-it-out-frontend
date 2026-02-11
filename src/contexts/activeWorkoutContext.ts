import { createContext } from "react";
import type ActiveWorkout from "../types/activeWorkout";
import type SetTagOption from "../types/setTagOption";
import type { ActiveWorkoutAction } from "../reducers/activeWorkoutReducer";

export type ActiveWorkoutContext = {
    workout: ActiveWorkout | null,
    setTags: SetTagOption[] | undefined,
    activeGroupKey: string | undefined,
    handleSetActiveGroupKey: (newKey: string | undefined) => () => void,
    emptyWorkout: boolean,
    dispatch: React.ActionDispatch<[action: ActiveWorkoutAction]>
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContext | null>(null);

export default ActiveWorkoutContext;