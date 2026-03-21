import type ExerciseHistory from "../types/exerciseHistory";

export const calculateMaxWeight = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => (curr.weight ?? 0) > acc ? (curr.weight ?? 0) : acc, 0);
}

export const calculateMaxEstimatedPersonalRecord = (history: ExerciseHistory): number => {
  return history.completedExerciseSets.reduce(
    (max, curr) => {
      const weight = (curr.weight ?? 0);
      const personalRecord = weight * (1.0 + (curr.reps / 30.0))
      return personalRecord > max ? personalRecord : max
    }, 0);
}

export const calculateVolume = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => {
      const volume = curr.reps * (curr.weight ?? 1);
      return acc += volume;
    }, 0);
}