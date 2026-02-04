import { useReducer, useState, type ReactNode } from "react";
import type Workout from "../../../types/workout";
import WorkoutFormContext from "../../../contexts/workoutFormContext";
import workoutReducer from "../../../reducers/workoutReducer";

type Props = {
  initWorkout: Workout,
  children: ReactNode
};

export function WorkoutFormProvider({ initWorkout, children }: Props) {
  const [workout, dispatch] = useReducer(workoutReducer, initWorkout);
  const [ editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState<boolean[]>(
    new Array(workout.exerciseGroups.length).fill(false));

  const handleExpandClick = (currentValue: boolean, index: number) => {
    return () => {
      setExpanded(prev => {
        prev[index] = !currentValue;
        return [...prev];
      });
    };
  }

  const workoutContext = {
    workout,
    editing,
    setEditing,
    expanded,
    handleExpandClick,
    dispatch
  };

  return (
    <WorkoutFormContext.Provider value={workoutContext}>
      {children}
    </WorkoutFormContext.Provider>
  );
}