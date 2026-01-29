import type ExerciseGroup from "./exerciseGroup"

export default interface Workout {
  id: number,
  description?: string,
  workoutProgramId?: number,
  name: string,
  exerciseGroups: ExerciseGroup[]
}