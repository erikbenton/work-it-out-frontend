import { useSuspenseQuery } from "@tanstack/react-query";
import { getMuscles } from "../requests/muscles";
import type MuscleOption from "../types/muscleOption";

const queryKey = 'muscleOptions';

export default function useMuscleOptions() {
    const { data: muscleOptions, isError } = useSuspenseQuery<MuscleOption[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getMuscles
  });

  return {
    muscleOptions,
    isError
  };
}