import { createContext } from "react";
import type ActiveWorkout from "../types/activeWorkout";
import type SetTagOption from "../types/setTagOption";
import type { ActiveWorkoutAction } from "../reducers/activeWorkoutReducer";

export type ActiveWorkoutContext = {
    workout: ActiveWorkout | null,
    setTags: SetTagOption[] | undefined,
    emptyWorkout: boolean,
    expanded: boolean[],
    handleExpandClick: (expanded: boolean, index: number) => () => void,
    dispatch: React.ActionDispatch<[action: ActiveWorkoutAction]>
}

const ActiveWorkoutContext = createContext<ActiveWorkoutContext | null>(null);

export default ActiveWorkoutContext;