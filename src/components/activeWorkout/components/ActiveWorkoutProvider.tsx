import { useEffect, useReducer, useState, type ReactNode } from "react";
import ActiveWorkoutContext from "../../../contexts/activeWorkoutContext";
import activeWorkoutReducer from "../../../reducers/activeWorkoutReducer";
import useSetTypes from "../../../hooks/useSetTypes";
import type ActiveWorkout from "../../../types/activeWorkout";

type Props = {
  children: ReactNode
};

export const activeWorkoutKey = 'activeWorkout';

function getInitialWorkout(): ActiveWorkout | null {
  let initialWorkout: ActiveWorkout | null;
  try {
    const storedWorkout = localStorage.getItem(activeWorkoutKey);
    initialWorkout = storedWorkout
      ? JSON.parse(storedWorkout) as ActiveWorkout
      : null;

  } catch {
    console.error("The active workout could not be parsed into JSON.");
    initialWorkout = null;
  }

  return initialWorkout;
}

export default function ActiveWorkoutProvider({ children }: Props) {
  const [workout, dispatch] = useReducer(activeWorkoutReducer, getInitialWorkout());
  const { setTags } = useSetTypes();
  const [ activeGroupKey, setActiveGroupKey ] = useState<string | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem(activeWorkoutKey, JSON.stringify(workout));
  }, [workout]);

  const handleSetActiveGroupKey = (newKey: string | undefined) => {
    return () => {
      setActiveGroupKey(newKey);
    }
  }

  const activeWorkoutContext = {
    workout,
    setTags,
    emptyWorkout: Boolean(workout?.workoutId),
    activeGroupKey,
    handleSetActiveGroupKey,
    dispatch
  };

  return (
    <ActiveWorkoutContext.Provider value={activeWorkoutContext}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}