import type CompletedExerciseSet from "./activeExerciseSet";

export default interface ExerciseHistory {
  completedExerciseGroupId: number,
  year: number,
  month: number,
  day: number,
  comment?: string,
  exerciseId: number,
  completedExerciseSets: CompletedExerciseSet[]
}