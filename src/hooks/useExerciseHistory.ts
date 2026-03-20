import { useSuspenseQuery } from "@tanstack/react-query";
import type ExerciseHistory from "../types/exerciseHistory";
import { getExerciseHistoryById } from "../requests/exercises";

export const queryKey = 'exerciseHistory';

export function useExerciseHistory(id: number) {
  const { data, isError } = useSuspenseQuery<ExerciseHistory[]>({
    queryKey: [queryKey, id],
    staleTime: 1000 * 60 * 60 * 24 * 1, // 1 day,
    gcTime: 1000 * 60 * 60 * 24 * 2, // 2 days
    queryFn: async () => getExerciseHistoryById(id)
  });

  return {
    data,
    isError
  };
}