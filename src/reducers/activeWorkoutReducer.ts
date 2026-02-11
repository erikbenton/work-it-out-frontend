import type ActiveExerciseGroup from "../types/activeExerciseGroup";
import type ActiveExerciseSet from "../types/activeExerciseSet";
import type ActiveWorkout from "../types/activeWorkout";
import { populateKey } from "../types/keyId";
import type Workout from "../types/workout";

export type ActiveWorkoutAction =
  { type: string, payload: never }
  | { type: 'endWorkout' }
  | {
    type: 'startEmptyWorkout',
    payload: never
  }
  | {
    type: 'initializeWorkout',
    payload: { initialWorkout: Workout }
  }
  | {
    type: 'addGroupSet',
    payload: { group: ActiveExerciseGroup }
  }
  | {
    type: 'removeGroupSet',
    payload: { group: ActiveExerciseGroup, set: ActiveExerciseSet | undefined }
  }
  | {
    type: 'updateGroup',
    payload: { group: ActiveExerciseGroup }
  }
  | {
    type: 'shiftGroup',
    payload: { group: ActiveExerciseGroup, shift: number }
  }
  | {
    type: 'updateSet',
    payload: { group: ActiveExerciseGroup, set: ActiveExerciseSet }
  }
  | {
    type: 'removeGroup',
    payload: { group: ActiveExerciseGroup }
  }
  | {
    type: 'addExercises',
    payload: { newExercises: number[] }
  };

export default function activeWorkoutReducer(workout: ActiveWorkout | null, action: ActiveWorkoutAction) {
  switch (action.type) {
    case 'initializeWorkout': {

      const { initialWorkout } = action.payload;

      const initWorkout: ActiveWorkout = {
        ...initialWorkout,
        id: 0,
        workoutId: initialWorkout.id,
        // convert groups & sets to be active
        exerciseGroups: initialWorkout.exerciseGroups.map(g => {
          const exerciseSets = g.exerciseSets.map(s => {
            s = populateKey(s);
            return {
              ...s,
              reps: null,
              activeExerciseGroupId: g.id,
              completed: false
            };
          });
          g = populateKey(g);
          return { ...g, exerciseSets, activeWorkoutId: initialWorkout.id };
        })
      };

      return { ...initWorkout };
    }

    case 'startEmptyWorkout': {
      const initActiveWorkout: ActiveWorkout = {
        id: 0,
        name: 'Empty Workout',
        exerciseGroups: []
      }

      return { ...initActiveWorkout };
    }

    case 'endWorkout': {
      return null;
    }

    case 'updateSet': {
      const { group, set } = action.payload;
      if (!workout) return null;
      const exerciseGroup = workout.exerciseGroups.find(g => g.key === group.key);
      if (!exerciseGroup) {
        throw new Error('Unable to exercise group with key: ' + group.key);
      }
      // do simple validations here 
      const validSet: ActiveExerciseSet = {
        id: set.id,
        key: set.key,
        minReps: set.minReps,
        maxReps: set.maxReps,
        reps: set.reps,
        weight: set.weight,
        completed: set.completed,
        sort: set.sort,
        setTagId: set.setTagId,
        activeExerciseGroupId: set.activeExerciseGroupId
      }
      const exerciseSets = exerciseGroup?.exerciseSets.map(s => s.key === set.key ? validSet : s) ?? [];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    default:
      throw new Error("Unhandled active workout action " + action.type);
  }
}