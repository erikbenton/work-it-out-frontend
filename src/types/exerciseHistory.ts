import type { CompletedExerciseSet } from "./completedExerciseSet";

export default interface ExerciseHistory {
  completedExerciseGroupId: number,
  createdAt: string,
  comment?: string,
  exerciseId: number,
  completedExerciseSets: CompletedExerciseSet[]
}