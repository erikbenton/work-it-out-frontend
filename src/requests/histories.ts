import type CompletedWorkout from '../types/completedWorkout';
import type { ExerciseCategory } from '../types/exerciseCategory';
import { wrap } from 'comlink';

export function getCompletedExerciseHistoryById(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[],
  category: ExerciseCategory
) {
  const worker = new Worker(new URL('../workers/historyWorker', import.meta.url))
  const historyWorker = wrap<import('../workers/historyWorker').HistoryWorker>(worker);
  return historyWorker.getCompletedGroupsByExerciseId(exerciseId, completedWorkouts, category);
}