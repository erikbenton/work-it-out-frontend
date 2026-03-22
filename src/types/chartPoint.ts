import type ExerciseHistory from "./exerciseHistory";

export default interface ChartPoint {
  date: string,
  value: ExerciseHistory | null
}