import type AcitveExerciseGroup from "./activeExerciseGroup";

export default interface ActiveWorkout {
  id: number,
  workoutId?: number,
  name: string,
  description?: string,
  note?: string,
  duration?: string,
  exerciseGroups: AcitveExerciseGroup[]
}