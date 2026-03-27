import { useSuspenseQuery } from "@tanstack/react-query";
import { useCompletedWorkouts } from "./useCompletedWorkouts";
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import cacheTimes from "../utils/cacheTimes";
import type CompletedWorkout from "../types/completedWorkout";

export const queryKey = 'exerciseHistory';

function getCompletedGroupsByExerciseId(
  exerciseId: number,
  completedWorkouts: CompletedWorkout[]
): CompletedExerciseGroup[] {
  return completedWorkouts.map(w =>
    w.completedExerciseGroups.filter(group =>
      group.exerciseId === exerciseId))
    .flat();
}

export function useExerciseHistory(id: number) {
  const { completedWorkouts } = useCompletedWorkouts();
  const { data, isError } = useSuspenseQuery<CompletedExerciseGroup[]>({
    queryKey: [queryKey, id],
    staleTime: cacheTimes.day, // 1 day,
    gcTime: cacheTimes.day * 2, // 2 days
    queryFn: () => getCompletedGroupsByExerciseId(id, completedWorkouts)
  });

  return {
    data,
    isError
  };
}