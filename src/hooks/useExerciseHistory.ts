import { useQuery } from "@tanstack/react-query";
import { useCompletedWorkouts } from "./useCompletedWorkouts";
import cacheTimes from "../utils/cacheTimes";
import type { ExerciseHistory } from "../types/exerciseHistory";
import type { ExerciseCategory } from "../types/exerciseCategory";
import { getCompletedExerciseHistoryById } from "../requests/histories";

export const queryKey = 'exerciseHistory';

export function useExerciseHistory(id: number, category: ExerciseCategory) {
  const { completedWorkouts } = useCompletedWorkouts();
  const { data, isLoading, isError } = useQuery<ExerciseHistory[]>({
    queryKey: [queryKey, id],
    staleTime: cacheTimes.day, // 1 day,
    gcTime: cacheTimes.day * 2, // 2 days
    queryFn: () => getCompletedExerciseHistoryById(id, completedWorkouts, category)
  });

  return {
    data,
    isLoading,
    isError
  };
}