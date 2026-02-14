import type KeyId from "./keyId";

export interface CompletedExerciseSet extends KeyId {
  id: number;
  completedExerciseGroupId: number;
  reps: number;
  weight?: number;
  minReps?: number;
  maxReps?: number;
  setTagId?: number;
  sort: number;
  createdAt?: string;
}
