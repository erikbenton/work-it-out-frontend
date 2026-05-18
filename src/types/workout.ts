import type ExerciseGroup from "./exerciseGroup"

export default interface Workout {
  id: number,
  description?: string,
  name: string,
  exerciseGroups: ExerciseGroup[]
}