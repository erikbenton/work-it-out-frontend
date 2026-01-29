import type Exercise from "./exercise";
import type ExerciseSet from "./exerciseSet";

export default interface ExerciseGroup {
  id: number,
  workoutId: number,
  note?: string,
  restTime?: string,
  sort: number,
  exercise: Exercise,
  exerciseSets: ExerciseSet[]
}