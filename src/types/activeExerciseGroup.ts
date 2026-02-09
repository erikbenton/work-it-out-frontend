import type ActiveExerciseSet from "./activeExerciseSet"

export default interface ActiveExerciseGroup {
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