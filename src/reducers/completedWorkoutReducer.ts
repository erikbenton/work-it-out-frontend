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
  | { type: 'updateSet', payload: { group: CompletedExerciseGroup, set: CompletedExerciseSet } };

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

    default:
      throw new Error("Unhandled action " + action.type);
  }
}