import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type { CompletedExerciseSet } from "../types/completedExerciseSet";
import type CompletedWorkout from "../types/completedWorkout";
import { devConsole } from "../utils/debugLogger";
import { formatDuration } from "../utils/formatters";

export type CompletedWorkoutAction =
  { type: string, payload: never }
  | { type: 'setWorkout', payload: { workout: CompletedWorkout } }
  | { type: 'setName', payload: { name: string } }
  | { type: 'updateGroup', payload: { group: CompletedExerciseGroup } }
  | { type: 'updateSet', payload: { group: CompletedExerciseGroup, set: CompletedExerciseSet } }
  | { type: 'shiftGroup', payload: { group: CompletedExerciseGroup, shift: number } }
  | { type: 'removeGroup', payload: { group: CompletedExerciseGroup } }
  | { type: 'addExercises', payload: { newExercises: number[] } };

export default function completedWorkoutReducer(workout: CompletedWorkout, action: CompletedWorkoutAction) {
  switch (action.type) {
    case 'setWorkout':
      return { ...action.payload.workout };

    case 'setName':
      return { ...workout, name: action.payload.name.trim() };

    case 'updateGroup': {
      const { group } = action.payload;
      // do simple validations here
      const validGroup: CompletedExerciseGroup = {
        ...group,
        note: group.note === '' ? undefined : group.note?.trim() ?? undefined,
        completedExerciseSets: [...group.completedExerciseSets],
      }
      const completedExerciseGroups = workout.completedExerciseGroups.map(g => g.id === group.id ? validGroup : g);
      return { ...workout, completedExerciseGroups };
    }

    case 'updateSet': {
      const { group, set } = action.payload;
      const exerciseGroup = workout.completedExerciseGroups.find(g => g.id === group.id);
      if (!exerciseGroup) {
        throw new Error('Unable to find exercise group with id: ' + group.id);
      }
      // do simple validations here 
      const validSet: CompletedExerciseSet = {
        ...set,
        duration: formatDuration(set.duration)
      }
      const completedExerciseSets = exerciseGroup?.completedExerciseSets.map(s => s.id === set.id ? validSet : s) ?? [];
      const updatedGroup = { ...exerciseGroup, completedExerciseSets };
      const completedExerciseGroups = workout.completedExerciseGroups.map(g => g.id === group.id ? updatedGroup : g);
      devConsole('updated groups', completedExerciseGroups);
      return { ...workout, completedExerciseGroups };
    }

    case 'shiftGroup': {
      const { group, shift } = action.payload;
      const groupIndex = workout.completedExerciseGroups.findIndex(g => g.id === group.id);
      const newIndex = groupIndex + shift;

      if (newIndex < 0 || newIndex >= workout.completedExerciseGroups.length) {
        return { ...workout };
      }

      const shiftGroups = [...workout.completedExerciseGroups];
      const tempGroup = { ...shiftGroups[newIndex] };
      shiftGroups[newIndex] = { ...group };
      shiftGroups[groupIndex] = tempGroup;

      const completedExerciseGroups = shiftGroups.map((g, index) => ({ ...g, sort: index }));

      return { ...workout, completedExerciseGroups };
    }

    case 'addExercises': {
      const { newExercises } = action.payload;

      const numberOfExistingGroups = workout.completedExerciseGroups.length;

      const newGroups: CompletedExerciseGroup[] = newExercises.map((exId, index) => {
        return {
          id: 0,
          sort: numberOfExistingGroups + index,
          exerciseId: exId,
          completedExerciseSets: [],
          completedWorkoutId: workout.id ?? 0
        };
      });

      const completedExerciseGroups = workout.completedExerciseGroups.concat(newGroups);
      return { ...workout, completedExerciseGroups };
    }

    case 'removeGroup': {
      const { group } = action.payload;
      const completedExerciseGroups = workout.completedExerciseGroups.filter(g => g.id !== group.id);
      return { ...workout, completedExerciseGroups };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}