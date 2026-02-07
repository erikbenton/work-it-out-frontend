import type ExerciseSet from "./exerciseSet";
import type KeyId from "./keyId";

export default interface ExerciseGroup extends KeyId {
  id: number,
  workoutId: number,
  note?: string,
  restTime?: string,
  sort: number,
  exerciseId: number,
  exerciseSets: ExerciseSet[]
}