import { useSuspenseQuery } from "@tanstack/react-query";
import { getMuscles } from "../requests/muscles";
import type MuscleOption from "../types/muscleOption";
import cacheTimes from "../utils/cacheTimes";

const queryKey = 'muscleOptions';

export default function useMuscleOptions() {
  const { data: muscleOptions, isError } = useSuspenseQuery<MuscleOption[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week,
    gcTime: cacheTimes.week * 2,
    queryFn: getMuscles
  });

  const getColorByName = (name: string): string | undefined => {
    return muscleOptions.find(
      m => m.name.toLocaleLowerCase() === name.toLocaleLowerCase())?.colorRgb;
  }

  return {
    muscleOptions,
    isError,
    services: {
      getColorByName
    }
  };
}