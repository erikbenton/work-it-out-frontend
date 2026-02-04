import type ExerciseGroup from "../types/exerciseGroup";
import type ExerciseSet from "../types/exerciseSet";
import type Workout from "../types/workout";

export type WorkoutAction =
  { type: string, payload: never }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setDescription', payload: { description: string | undefined } }
  | { type: 'updateGroup', payload: { group: ExerciseGroup } }
  | { type: 'updateSet', payload: { groupKey: string, set: ExerciseSet } };

export default function workoutReducer(workout: Workout, action: WorkoutAction): Workout {
  switch (action.type) {
    case 'setName':
      return { ...workout, name: action.payload.name.trim() };

    case 'setDescription':
      return {
        ...workout,
        description: action.payload.description === ''
          ? undefined
          : action.payload.description?.trim() ?? undefined
      };

    case 'updateGroup': {
      const { group } = action.payload;
      const validGroup: ExerciseGroup = {
        id: group.id,
        key: group.key,
        restTime: group.restTime,
        note: group.note === '' ? undefined : group.note?.trim() ?? undefined,
        sort: group.sort,
        exerciseId: group.exerciseId,
        exerciseSets: [ ...group.exerciseSets ],
        workoutId: group.workoutId
      }
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? validGroup : g);
      return { ...workout, exerciseGroups: exerciseGroups };
    }

    case 'updateSet': {
      const { groupKey, set } = action.payload;
      const exerciseGroup = workout.exerciseGroups.find(g => g.key === groupKey);
      if (!exerciseGroup) {
        throw new Error('Unable to exercise group with key: ' + groupKey);
      }
      // do simple validations here 
      const validSet: ExerciseSet = {
        id: set.id,
        key: set.key,
        minReps: set.minReps,
        maxReps: set.maxReps,
        sort: set.sort,
        exerciseGroupId: set.exerciseGroupId
      }
      const exerciseSets = exerciseGroup?.exerciseSets.map(s => s.key === set.key ? validSet : s) ?? [];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === groupKey ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}