import type CompletedWorkout from '../types/completedWorkout';
import type { ExerciseCategory } from '../types/exerciseCategory';
import { wrap } from 'comlink';

export async function getCompletedExerciseHistoryById(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory,
  waitMs?: number
) {
  const worker = new Worker(new URL('../workers/historyWorker', import.meta.url))
  const historyWorker = wrap<import('../workers/historyWorker').HistoryWorker>(worker);
  return await historyWorker.getCompletedGroupsByExerciseId(exerciseId, completedWorkouts, category, waitMs);
}