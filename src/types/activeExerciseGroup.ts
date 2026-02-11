import type ActiveExerciseSet from "./activeExerciseSet"
import type KeyId from "./keyId"

export default interface ActiveExerciseGroup extends KeyId {
  id: number,
  workoutId: number,
  note?: string,
  comment?: string,
  restTime?: string,
  sort: number,
  exerciseId: number,
  activeWorkoutId: number
  exerciseSets: ActiveExerciseSet[]
}