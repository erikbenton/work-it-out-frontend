import type KeyId from "./keyId";

export default interface ActiveExerciseSet extends KeyId {
  id: number,
  reps: number | null,
  weight?: number,
  minReps?: number,
  maxReps?: number,
  setType?: string,
  sort: number,
  completed?: boolean,
  activeExerciseGroupId: number
}