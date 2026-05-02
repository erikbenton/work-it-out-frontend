import { useReducer, useState, type ReactNode } from "react";
import type Workout from "../types/workout";
import WorkoutFormContext from "./workoutFormContext";
import workoutReducer from "../reducers/workoutReducer";
import useSetTags from "../hooks/useSetTags";
import { useWorkouts } from "../hooks/useWorkouts";
import { useNavigate } from "react-router-dom";
import useActiveWorkout from "../hooks/useActiveWorkout";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";

type Props = {
  initWorkout: Workout,
  children: ReactNode
};

export function WorkoutFormProvider({ initWorkout, children }: Props) {
  const [workout, dispatch] = useReducer(workoutReducer, initWorkout);
  const { services } = useWorkouts();
  const { dispatch: activeDispatch } = useActiveWorkout();
  const navigate = useNavigate();
  const newWorkout = initWorkout.id === 0;
  const { setTags } = useSetTags();
  const [editing, setEditing] = useState(newWorkout);
  const [expanded, setExpanded] = useState<Map<string, boolean>>(() => {
    const expandedMap = new Map<string, boolean>();
    for (const group of initWorkout.exerciseGroups) {
      expandedMap.set(group.key ?? '', false);
    }
    return expandedMap;
  });

  const handleExpandClick = (currentValue: boolean, key?: string) => {
    return () => {
      expanded.set(key ?? '', !currentValue);
      setExpanded(new Map(expanded));
    };
  }

  const handleEditSaveClick = () => {
    if (editing) {
      if (newWorkout) {
        services.create(workout, {
          onSuccess: (savedWorkout) => {
            setEditing(!editing);
            navigate(`/workouts/${savedWorkout.id}`);
          }
        });
      } else {
        services.update(workout, {
          onSuccess: (savedWorkout) => {
            setEditing(!editing);
            navigate(`/workouts/${savedWorkout.id}`);
          }
        });
      }
    } else {
      setEditing(!editing);
    }
  }

  const startWorkout = () => {
    activeDispatch({
      type: 'initializeWorkout',
      payload: { initialWorkout: workout }
    });
    navigate('/training');
  }

  const getTitleMenuOptions = (): VerticalMenuItemProps[] => {
    const menuOptions = [
      {
        label: editing ? "Cancel" : "Edit",
        handleClick: () => {
          setEditing(!editing);
          if (editing) {
            if (workout.id) {
              dispatch({
                type: 'setWorkout',
                payload: {
                  workout: services.getWorkoutById(workout.id)
                }
              });
            } else {
              navigate('/workouts');
            }
          }
        },
      },
      { label: "Delete", handleClick: () => { }, sx: { color: 'error.main' } }
    ];

    if (newWorkout) {
      menuOptions.pop();
    }

    if (!editing) {
      // put it 1st in the list
      menuOptions.unshift({ label: 'Start', handleClick: startWorkout })
      // put it 3rd in the list
      menuOptions.splice(2, 0, {
        label: "Clone",
        handleClick: () => {
          services.clone(workout, {
            onSuccess: (savedWorkout) => {
              setEditing(!editing);
              navigate(`/workouts/${savedWorkout.id}`);
            }
          });
        },
      });
    }

    return menuOptions;
  }

  const addExercises = (exercises: number[]) => {
    dispatch({
      type: 'addExercises',
      payload: { newExercises: exercises }
    });
  }

  const workoutContext = {
    workout,
    setTags,
    editing,
    newWorkout,
    setEditing,
    expanded,
    handleExpandClick,
    handleEditSaveClick,
    getTitleMenuOptions,
    addExercises,
    dispatch
  };

  return (
    <WorkoutFormContext.Provider value={workoutContext}>
      {children}
    </WorkoutFormContext.Provider>
  );
}