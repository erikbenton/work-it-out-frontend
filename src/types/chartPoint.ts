import type { CompletedExerciseGroup } from "./completedExerciseGroup";

export default interface ChartPoint {
  date: string,
  value: CompletedExerciseGroup | null
}