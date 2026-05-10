import type KeyId from "./keyId";

export default interface ExerciseSet extends KeyId {
  id: number,
  minReps?: number,
  maxReps?: number,
  targetDuration?: string,
  targetDistance?: number,
  setTagId?: number,
  sort: number,
  exerciseGroupId: number,
}