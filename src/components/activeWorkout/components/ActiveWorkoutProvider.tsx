import { useReducer, useState, type ReactNode } from "react";
import ActiveWorkoutContext from "../../../contexts/activeWorkoutContext";
import activeWorkoutReducer from "../../../reducers/activeWorkoutReducer";
import useSetTypes from "../../../hooks/useSetTypes";

type Props = {
  children: ReactNode
};

export default function ActiveWorkoutProvider({ children }: Props) {
  const [workout, dispatch] = useReducer(activeWorkoutReducer, null);
  const { setTags } = useSetTypes();
  const [expanded, setExpanded] = useState<boolean[]>(
    new Array((workout?.exerciseGroups.length) ?? 0).fill(false));

  const handleExpandClick = (currentValue: boolean, index: number) => {
    return () => {
      setExpanded(prev => {
        prev[index] = !currentValue;
        return [...prev];
      });
    };
  };

  const activeWorkoutContext = {
    workout,
    setTags,
    emptyWorkout: Boolean(workout?.workoutId),
    expanded,
    handleExpandClick,
    dispatch
  };

  return (
    <ActiveWorkoutContext.Provider value={activeWorkoutContext}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
}