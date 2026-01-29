import type CompletedExerciseSet from "./completedExerciseSet";

export default interface ExerciseHistory {
  completedExerciseGroupId: number,
  year: number,
  month: number,
  day: number,
  comment?: string,
  exerciseId: number,
  completedExerciseSets: CompletedExerciseSet[]
}