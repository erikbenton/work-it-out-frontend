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
  | { type: 'shiftGroup', payload: { group: ExerciseGroup, shift: number } }
  | { type: 'updateSet', payload: { group: ExerciseGroup, set: ExerciseSet } }
  | { type: 'removeGroup', payload: { group: ExerciseGroup } }
  | { type: 'addExercises', payload: { newExercises: number[] } };

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
      // do simple validations here
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

    case 'shiftGroup': {
      const { group, shift } = action.payload;
      const groupIndex = workout.exerciseGroups.findIndex(g => g.key === group.key);
      const newIndex = groupIndex + shift;

      if (newIndex < 0 || newIndex >= workout.exerciseGroups.length) {
        return { ...workout };
      }

      const shiftGroups = [ ...workout.exerciseGroups ];
      const tempGroup = { ...shiftGroups[newIndex] };
      shiftGroups[newIndex] = { ...group };
      shiftGroups[groupIndex] = tempGroup;

      const exerciseGroups = shiftGroups.map((g, index) => ({ ...g, sort: index}));

      return { ...workout, exerciseGroups};
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
        setTagId: set.setTagId,
        exerciseGroupId: set.exerciseGroupId
      }
      const exerciseSets = exerciseGroup?.exerciseSets.map(s => s.key === set.key ? validSet : s) ?? [];
      const updatedGroup = { ...exerciseGroup, exerciseSets };
      const exerciseGroups = workout.exerciseGroups.map(g => g.key === group.key ? updatedGroup : g);
      return { ...workout, exerciseGroups };
    }

    case 'addExercises': {
      const { newExercises } = action.payload;

      const numberOfExistingGroups = workout.exerciseGroups.length;

      const newGroups = newExercises.map((exId, index) => {
        const newGroup: ExerciseGroup = {
          id: 0,
          sort: numberOfExistingGroups + index,
          exerciseId: exId,
          exerciseSets: [],
          workoutId: workout.id
        };
        return populateKey(newGroup);
      });

      const exerciseGroups = workout.exerciseGroups.concat(newGroups);
      return { ...workout, exerciseGroups };
    }

    case 'removeGroup': {
      const { group } = action.payload;
      const exerciseGroups = workout.exerciseGroups.filter(g => g.key !== group.key);
      return { ...workout, exerciseGroups };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}