import type KeyId from "./keyId";

export default interface ActiveExerciseSet extends KeyId {
  id: number,
  reps: number | null,
  weight?: number,
  minReps?: number,
  maxReps?: number,
  setTagId?: number,
  sort: number,
  completed?: boolean,
  activeExerciseGroupId: number
}