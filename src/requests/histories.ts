import type CompletedWorkout from '../types/completedWorkout';
import type { ExerciseCategory } from '../types/exerciseCategory';
import { wrap } from 'comlink';
import type { HistoryWorkerTimeOptions } from '../workers/historyWorker';

export async function getCompletedExerciseHistoryById(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory,
  timeOptions?: HistoryWorkerTimeOptions
) {
  const worker = new Worker(new URL('../workers/historyWorker', import.meta.url))
  const historyWorker = wrap<import('../workers/historyWorker').HistoryWorker>(worker);
  return await historyWorker.getCompletedGroupsByExerciseId(exerciseId, completedWorkouts, category, timeOptions);
}