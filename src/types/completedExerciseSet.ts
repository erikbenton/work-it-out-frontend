import type { DistanceUnit } from "./distanceUnit";
import type KeyId from "./keyId";
import type { WeightUnit } from "./weightUnit";

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
  weightUnit: WeightUnit,
  distanceUnit: DistanceUnit
}
