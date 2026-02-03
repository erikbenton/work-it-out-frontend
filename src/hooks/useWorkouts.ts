import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type Workout from "../types/workout";
import { getWorkouts } from "../requests/workouts";

const queryKey = 'workouts';

export function useWorkouts() {
  const queryClient = useQueryClient();
  const { data: workouts, isError } = useSuspenseQuery<Workout[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getWorkouts
  });

  const getWorkoutById = (id: number) => {
    const workouts = queryClient.getQueryData([queryKey]) as Workout[];
    const workout = workouts.find(ex => ex.id === id);

    if (!workout) {
      throw new Error(`Unable to find workout with id: ${id}.`);
    }

    return workout;
  }

  return {
    workouts,
    isError,
    services: {
      getWorkoutById
    }
  }
}