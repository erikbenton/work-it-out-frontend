import type ExerciseGroup from "../types/exerciseGroup";
import type ExerciseSet from "../types/exerciseSet";
import { populateKey } from "../types/keyId";
import type Workout from "../types/workout";

export type WorkoutAction =
  { type: string, payload: never }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setDescription', payload: { description: string | undefined } }
  | { type: 'addGroupSet', payload: { group: ExerciseGroup } }
  | { type: 'removeGroupSet', payload: { group: ExerciseGroup, set: ExerciseSet | undefined } }
  | { type: 'updateGroup', payload: { group: ExerciseGroup } }
  | { type: 'updateSet', payload: { group: ExerciseGroup, set: ExerciseSet } };

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
        exerciseSets: [...group.exerciseSets],
        workoutId: group.workoutId
      }
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? validGroup : g);
      return { ...workout, exerciseGroups: exerciseGroups };
    }

    case 'addGroupSet': {
      const { group } = action.payload;
      const numberOfSets = group.exerciseSets.length;
      const newSet: ExerciseSet = numberOfSets > 0
        ? populateKey({ ...group.exerciseSets[numberOfSets - 1], id: 0, sort: numberOfSets })
        : populateKey<ExerciseSet>({
          id: 0,
          exerciseGroupId: group.id,
          sort: numberOfSets
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
      const { group, set } = action.payload;
      if (!set || !group) return { ...workout };
      const updatedSets = group.exerciseSets.filter(s => s.key !== set.key);
      const updatedGroup = { ...group, exerciseSets: [...updatedSets] };
      const updatedGroups = workout.exerciseGroups
        .map(g => g.key === updatedGroup.key ? updatedGroup : g);
      return { ...workout, exerciseGroups: [...updatedGroups] };
    }

    case 'updateSet': {
      const { group, set } = action.payload;
      const exerciseGroup = workout.exerciseGroups.find(g => g.key === group.key);
      if (!exerciseGroup) {
        throw new Error('Unable to exercise group with key: ' + group.key);
      }
      // do simple validations here 
      const validSet: ExerciseSet = {
        id: set.id,
        key: set.key,
        minReps: set.minReps,
        maxReps: set.maxReps,
        sort: set.sort,
        setType: set.setType,
        exerciseGroupId: set.exerciseGroupId
      }
      const exerciseSets = exerciseGroup?.exerciseSets.map(s => s.key === set.key ? validSet : s) ?? [];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}