import type KeyId from "./keyId";

export default interface ExerciseSet extends KeyId {
  id: number,
  minReps?: number,
  maxReps?: number,
  setType?: string,
  sort: number,
  exerciseGroupId: number,
  //key?: number
}