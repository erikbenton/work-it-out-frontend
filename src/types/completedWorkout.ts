import type { CompletedExerciseGroup } from "./completedExerciseGroup";

export default interface CompletedWorkout {
  id?: number,
  name: string,
  description?: string,
  note?: string,
  duration: string,
  createdAt?: string,
  completedExerciseGroups: CompletedExerciseGroup[]
}