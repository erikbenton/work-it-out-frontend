import { useReducer, useState, type ReactNode } from "react";
import type WorkoutProgram from "../types/workoutProgram";
import workoutProgramReducer from "../reducers/workoutProgramReducer";
import WorkoutProgramFormContext from "./programFormContext";
import { useWorkouts } from "../hooks/useWorkouts";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";
import { usePrograms } from "../hooks/usePrograms";
import { useNavigate } from "react-router-dom";
import type Workout from "../types/workout";
import useActiveWorkout from "../hooks/useActiveWorkout";

type Props = {
  initProgram: WorkoutProgram,
  children: ReactNode
}

export default function WorktouProgramFormProvider({ initProgram, children }: Props) {
  const [program, dispatch] = useReducer(workoutProgramReducer, initProgram);
  const newProgram = Boolean(program.id) !== true;
  const { dispatch: activeDispatch } = useActiveWorkout();
  const { services: programServices } = usePrograms();
  const { services: workoutServices } = useWorkouts();
  const navigate = useNavigate();
  const [selectingWorkouts, setSelectingWorkouts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(newProgram);
  const [expanded, setExpanded] = useState<Map<number, boolean>>(() => {
    const expandedMap = new Map<number, boolean>();
    for (const workoutId of initProgram.workoutIds) {
      expandedMap.set(workoutId, false);
    }
    return expandedMap;
  });
  const workouts = program.workoutIds.map(p => workoutServices.getWorkoutById(p));

  const handleExpandClick = (currentValue: boolean, workoutId: number) => {
    return () => {
      expanded.set(workoutId, !currentValue);
      setExpanded(new Map(expanded));
    };
  }

  const addWorkouts = (newWorkoutIds: number[]) => {
    const updatedWorkoutIds = program.workoutIds.concat(newWorkoutIds)
    dispatch({
      type: 'setWorkouts',
      payload: { workoutIds: updatedWorkoutIds }
    });
  }

  const getProgramOptions = (): VerticalMenuItemProps[] => {
    const options: VerticalMenuItemProps[] = [
      {
        label: editing ? "Cancel" : "Edit",
        handleClick: () => {
          setEditing(!editing);
          if (editing) {
            if (program.id) {
              dispatch({
                type: 'setProgram',
                payload: {
                  program: programServices.getProgramById(program.id)
                }
              });
            } else {
              navigate('/programs');
            }
          }
        },
      },
    ];

    if (!newProgram) {
      options.push({
        label: "Delete", handleClick: () => {
          if (saving) return;
          setSaving(true);
          programServices.remove(program.id ?? 0, {
            onSuccess: () => {
              navigate('/programs');
            }
          })
        }, sx: { color: 'error.main' }
      });
    }

    return options;
  }

  const getProgramWorkoutOptions = (workout: Workout): VerticalMenuItemProps[] => {
    const notEditingOptions = [
      {
        label: "View",
        handleClick: () => navigate(`/workouts/${workout.id}`)
      },
      {
        label: "Start",
        handleClick: () => {
          activeDispatch({
            type: 'initializeWorkout',
            payload: { initialWorkout: workout }
          });
          navigate('/training');
        }
      }
    ];

    const editingOptions = [
      {
        label: "Shift up",
        handleClick: () => {
          dispatch({ type: 'shiftWorkout', payload: { workoutId: workout.id, shift: -1 } });
        },
      },
      {
        label: "Shift down",
        handleClick: () => {
          dispatch({ type: 'shiftWorkout', payload: { workoutId: workout.id, shift: 1 } });
        },
      },
      {
        label: "Remove",
        handleClick: () => {
          dispatch({ type: 'removeWorkout', payload: { workoutId: workout.id } });
        },
        sx: { color: 'error.main' }
      },
    ]

    return editing ? editingOptions : notEditingOptions;
  }

  const handleEditSaveClick = () => {
    if (editing) {
      setSaving(true);
      if (newProgram) {
        programServices.create(program, {
          onSuccess: (savedProgram) => {
            setEditing(!editing);
            navigate(`/programs/${savedProgram.id}`);
          },
          onSettled: () => {
            setSaving(false);
          }
        });
      } else {
        programServices.update(program, {
          onSuccess: (savedProgram) => {
            setEditing(!editing);
            navigate(`/programs/${savedProgram.id}`);
          },
          onSettled: () => {
            setSaving(false);
          }
        });
      }
    } else {
      setEditing(!editing);
    }
  }

  const handleStartSelectingWorkouts = () => {
    setSelectingWorkouts(true);
  };

  const handleStopSelectingWorkouts = () => {
    setSelectingWorkouts(false);
  }

  const workoutProgramContext = {
    program,
    workouts,
    dispatch,
    saving,
    editing,
    expanded,
    selectingWorkouts,
    setSaving,
    setEditing,
    handleExpandClick,
    handleEditSaveClick,
    handleStartSelectingWorkouts,
    handleStopSelectingWorkouts,
    getProgramOptions,
    getProgramWorkoutOptions,
    addWorkouts
  }

  return (
    <WorkoutProgramFormContext.Provider value={workoutProgramContext}>
      {children}
    </WorkoutProgramFormContext.Provider>
  )
}