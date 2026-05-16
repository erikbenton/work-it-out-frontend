import type { LiftStats, StretchStats, TimedStats } from "../utils/exerciseStats";
import type { CompletedExerciseGroup } from "./completedExerciseGroup";

export type ExerciseHistory = {
  group: CompletedExerciseGroup,
  category: 'lift',
  stats: LiftStats
} | {
  group: CompletedExerciseGroup,
  category: 'timed',
  stats: TimedStats
} | {
  group: CompletedExerciseGroup,
  category: 'conditioning',
  stats: StretchStats
} | {
  group: CompletedExerciseGroup,
  category: 'stretch',
  stats: StretchStats
};