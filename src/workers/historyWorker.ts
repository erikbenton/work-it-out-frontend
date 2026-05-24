import { expose } from 'comlink';
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type CompletedWorkout from "../types/completedWorkout";
import type { ExerciseCategory } from "../types/exerciseCategory";
import type { ExerciseHistory } from "../types/exerciseHistory";
import { calculateLiftStats, calculateStretchStats, calculateTimedStats } from "../utils/exerciseStats";
import { sleep } from '../utils/workerSleep';

// Options to (try to) control the time taken,
// useful for waiting for UI transitions to finish
// without getting interrupted by large data changes
export type HistoryWorkerTimeOptions = {
  preDelay?: number,
  postDelay?: number,
  totalTime?: number
}

async function getCompletedGroupsByExerciseId(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory,
  timeOptions?: HistoryWorkerTimeOptions
): Promise<ExerciseHistory[]> {
  const start = Date.now();

  if (timeOptions && timeOptions.preDelay) {
    await sleep(timeOptions.preDelay);
  }

  const histories = completedWorkouts.map(w =>
    w.completedExerciseGroups.filter(group =>
      group.exerciseId === exerciseId))
    .flat()
    .map(g => calculateHistory(g, category));

  if (timeOptions && timeOptions.totalTime) {
    const now = Date.now();
    const timeLeft = timeOptions.totalTime - (now - start);
    if (timeLeft > 0) await sleep(timeLeft);
  }

  if (timeOptions && timeOptions.postDelay) {
    await sleep(timeOptions.postDelay);
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