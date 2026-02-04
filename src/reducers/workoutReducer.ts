import type ExerciseGroup from "../types/exerciseGroup";
import type ExerciseSet from "../types/exerciseSet";
import type Workout from "../types/workout";

export type WorkoutAction =
  { type: string, payload: never }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setDescription', payload: { description: string } }
  | { type: 'updateGroup', payload: { group: ExerciseGroup } }
  | { type: 'updateSet', payload: { groupKey: string, set: ExerciseSet } };

export default function workoutReducer(workout: Workout, action: WorkoutAction): Workout {
  switch (action.type) {
    case 'setName':
      return { ...workout, name: action.payload.name };

    case 'setDescription':
      return { ...workout, description: action.payload.description };

    case 'updateGroup': {
      const { group } = action.payload;
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? group : g);
      return { ...workout, exerciseGroups: exerciseGroups };
    }

    case 'updateSet': {
      const { groupKey, set } = action.payload;
      const exerciseGroup = workout.exerciseGroups.find(g => g.key === groupKey);
      if (!exerciseGroup) {
        throw new Error('Unable to exercise group with key: ' + groupKey);
      }
      const exerciseSets = exerciseGroup?.exerciseSets.map(s => s.key === set.key ? set : s) ?? [];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === groupKey ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}