import { useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import ActiveWorkoutContext from "../../../contexts/activeWorkoutContext";
import activeWorkoutReducer from "../../../reducers/activeWorkoutReducer";
import useSetTags from "../../../hooks/useSetTags";
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
  const { setTags } = useSetTags();
  const [ activeGroupKey, setActiveGroupKey ] = useState<string | undefined>(undefined);
    const [ editing, setEditing ] = useState(true);
  const complete = useMemo(
    () => workout?.exerciseGroups.every(g => g.exerciseSets.every(s => s.completed)) ?? false,
    [workout]
  );

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
    complete,
    setTags,
    editing,
    setEditing,
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