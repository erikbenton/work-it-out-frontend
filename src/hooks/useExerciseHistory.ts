import { useSuspenseQuery } from "@tanstack/react-query";
import type ExerciseHistory from "../types/exerciseHistory";
import { getExerciseHistoryById } from "../requests/exercises";

const queryKey = 'exerciseHistory';

export function useExerciseHistory(id: number) {
    const { data, isError } = useSuspenseQuery<ExerciseHistory[]>({
    queryKey: [queryKey, id],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => getExerciseHistoryById(id)
  });

  return {
    data,
    isError
  };
}