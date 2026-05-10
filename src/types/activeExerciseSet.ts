import type KeyId from "./keyId";

export default interface ActiveExerciseSet extends KeyId {
  id: number,
  reps: number | null,
  weight?: number,
  duration?: string,
  distance?: number,
  minReps?: number,
  maxReps?: number,
  targetDuration?: string,
  targetDistance?: number,
  setTagId?: number,
  sort: number,
  completed?: boolean,
  activeExerciseGroupId: number
}