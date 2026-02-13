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

    case 'updateGroup': {
      if (workout === null) return null;
      const { group } = action.payload;
      // do simple validations here
      const validGroup: ActiveExerciseGroup = {
        id: group.id,
        key: group.key,
        restTime: group.restTime,
        note: group.note === '' ? undefined : group.note?.trim() ?? undefined,
        sort: group.sort,
        exerciseId: group.exerciseId,
        exerciseSets: [...group.exerciseSets],
        workoutId: workout.id,
        activeWorkoutId: group.activeWorkoutId
      }
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? validGroup : g);
      return { ...workout, exerciseGroups: exerciseGroups };
    }

    case 'removeGroup': {
      if (workout === null) return null;
      const { group } = action.payload;
      const exerciseGroups = workout.exerciseGroups.filter(g => g.key !== group.key);
      return { ...workout, exerciseGroups };
    }

    case 'addGroupSet': {
      if (workout === null) return null;
      const { group } = action.payload;
      const numberOfSets = group.exerciseSets.length;
      const newSet: ActiveExerciseSet = numberOfSets > 0
        ? populateKey({
          ...group.exerciseSets[numberOfSets - 1],
          id: 0,
          reps: null,
          weight: undefined,
          completed: false,
          sort: numberOfSets
        })
        : populateKey<ActiveExerciseSet>({
          id: 0,
          activeExerciseGroupId: group.id,
          reps: null,
          weight: undefined,
          completed: false,
          sort: numberOfSets,
        });

      const exerciseGroup = workout.exerciseGroups.find(g => g.key === group.key);
      if (!exerciseGroup) {
        throw new Error('Unable to exercise group with key: ' + group.key);
      }
      const exerciseSets = exerciseGroup?.exerciseSets.concat(newSet) ?? [newSet];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    case 'removeGroupSet': {
      if (workout === null) return null;
      const { group, set } = action.payload;
      if (!set || !group) return { ...workout };
      const updatedSets = group.exerciseSets.filter(s => s.key !== set.key);
      const updatedGroup = { ...group, exerciseSets: [...updatedSets] };
      const updatedGroups = workout.exerciseGroups
        .map(g => g.key === updatedGroup.key ? updatedGroup : g);
      return { ...workout, exerciseGroups: [...updatedGroups] };
    }

    case 'shiftGroup': {
      if (workout === null) return null;
      const { group, shift } = action.payload;
      const groupIndex = workout.exerciseGroups.findIndex(g => g.key === group.key);
      const newIndex = groupIndex + shift;

      if (newIndex < 0 || newIndex >= workout.exerciseGroups.length) {
        return { ...workout };
      }

      const shiftGroups = [...workout.exerciseGroups];
      const tempGroup = { ...shiftGroups[newIndex] };
      shiftGroups[newIndex] = { ...group };
      shiftGroups[groupIndex] = tempGroup;

      const exerciseGroups = shiftGroups.map((g, index) => ({ ...g, sort: index }));

      return { ...workout, exerciseGroups };
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