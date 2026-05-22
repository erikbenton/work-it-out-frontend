import { expose } from 'comlink';
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type CompletedWorkout from "../types/completedWorkout";
import type { ExerciseCategory } from "../types/exerciseCategory";
import type { ExerciseHistory } from "../types/exerciseHistory";
import { calculateLiftStats, calculateStretchStats, calculateTimedStats } from "../utils/exerciseStats";
import { sleep } from '../utils/workerSleep';

async function getCompletedGroupsByExerciseId(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory,
  waitMs?: number
): Promise<ExerciseHistory[]> {
  const histories = completedWorkouts.map(w =>
    w.completedExerciseGroups.filter(group =>
      group.exerciseId === exerciseId))
    .flat()
    .map(g => calculateHistory(g, category));

  // adding optional sleep to help with UI transitions when loading
  if (waitMs) {
    await sleep(waitMs);
  }

  return histories;
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