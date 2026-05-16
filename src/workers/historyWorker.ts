import { expose } from 'comlink';
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type CompletedWorkout from "../types/completedWorkout";
import type { ExerciseCategory } from "../types/exerciseCategory";
import type { ExerciseHistory } from "../types/exerciseHistory";
import { calculateLiftStats, calculateStretchStats, calculateTimedStats } from "../utils/exerciseStats";

function getCompletedGroupsByExerciseId(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory
): ExerciseHistory[] {
  return completedWorkouts.map(w =>
    w.completedExerciseGroups.filter(group =>
      group.exerciseId === exerciseId))
    .flat()
    .map(g => calculateHistory(g, category));
}

export function calculateHistory(group: CompletedExerciseGroup, category: ExerciseCategory): ExerciseHistory {
  switch (category) {
    case 'lift':
      return {
        group: { ...group },
        category: category,
        stats: calculateLiftStats(group)
      };
    case 'timed':
      return {
        group: { ...group },
        category: category,
        stats: calculateTimedStats(group)
      };
    case 'stretch':
    case 'conditioning': {
      return {
        group: { ...group },
        category: category,
        stats: calculateStretchStats(group)
      };
    }
  }
}

const exports = {
  getCompletedGroupsByExerciseId
}

export type HistoryWorker = typeof exports;
expose(exports);