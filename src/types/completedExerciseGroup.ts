import type { CompletedExerciseSet } from "./completedExerciseSet";
import type KeyId from "./keyId";

export interface CompletedExerciseGroup extends KeyId {
  id: number;
  completedWorkoutId: number;
  note?: string;
  comment?: string;
  restTime?: string;
  sort: number;
  exerciseId: number;
  createdAt?: string;
  completedExerciseSets: CompletedExerciseSet[];
}
