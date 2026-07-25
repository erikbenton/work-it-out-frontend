import { useState, type ReactNode } from "react";
import type CompletedWorkout from "../types/completedWorkout";
import CompletedWorkoutFormContext from "./completedWorkoutFormContext";
import { useCompletedWorkouts } from "../hooks/useCompletedWorkouts";
import { useNavigate } from "react-router-dom";
import useActiveWorkout from "../hooks/useActiveWorkout";
import type Workout from "../types/workout";
import type ExerciseSet from "../types/exerciseSet";
import { populateKey } from "../types/keyId";
import type { VerticalMenuItemProps } from "../components/layout/VerticalIconMenu";

type Props = {
  initWorkout: CompletedWorkout,
  children: ReactNode
};

export function CompletedWorkoutFormProvider({ initWorkout, children }: Props) {
  const { services } = useCompletedWorkouts();
  const { dispatch, workout: activeWorkout } = useActiveWorkout();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const workout = initWorkout;

  const menuItems: VerticalMenuItemProps[] = [
    {
      label: "Redo",
      handleClick: () => {
        if (!workout) return;
        dispatch({
          type: 'redoWorkout',
          payload: { completedWorkout: workout }
        });
        navigate('/training');
      },
      disabled: (activeWorkout !== null)
    },
    {
      label: "Save as...",
      handleClick: () => {
        if (!workout) return;
        const copiedWorkout: Workout = {
          id: 0,
          name: workout.name + ' (Copy)',
          description: workout.description,
          colorRgb: workout.colorRgb,
          tag: workout.tag,
          exerciseGroups: workout.completedExerciseGroups.map((g, i) => {
            const exerciseSets: ExerciseSet[] = g.completedExerciseSets.map((s, i) => {
              s = populateKey(s)
              return {
                id: 0,
                key: s.key,
                minReps: s.minReps,
                maxReps: s.maxReps,
                sort: i,
                setTagId: s.setTagId,
                exerciseGroupId: 0,
              }
            });
            g = populateKey(g);
            return {
              id: 0,
              exerciseId: g.exerciseId,
              sort: i,
              key: g.key,
              restTime: g.restTime,
              note: g.note,
              workoutId: 0,
              exerciseSets
            };
          })
        }
        navigate('/workouts/create', { state: copiedWorkout });
      },
    },
    {
      label: "Delete",
      handleClick: () => {
        if (!workout || !workout.id) {
          return;
        }
        setSaving(true);
        services.remove(workout.id, {
          onSuccess: () => {
            navigate('/history');
          },
          onSettled: () => {
            setSaving(false);
          }
        });
      },
      sx: { color: 'error.main' }
    },
  ];

  const completedWorkoutContext = {
    workout,
    saving,
    setSaving,
    menuItems
  }

  return (
    <CompletedWorkoutFormContext.Provider value={completedWorkoutContext} >
      {children}
    </CompletedWorkoutFormContext.Provider>
  )
}

