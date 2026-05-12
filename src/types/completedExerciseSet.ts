import type KeyId from "./keyId";

export interface CompletedExerciseSet extends KeyId {
  id: number;
  completedExerciseGroupId: number;
  reps?: number;
  weight?: number;
  duration?: string;
  distance?: number;
  minReps?: number;
  maxReps?: number;
  targetDuration?: string;
  targetDistance?: number;
  setTagId?: number;
  sort: number;
  createdAt?: string;
}
