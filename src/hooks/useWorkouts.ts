import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type Workout from "../types/workout";
import { createWorkout, getWorkouts, updateWorkout } from "../requests/workouts";
import { mapKeys, populateKey } from "../types/keyId";

const queryKey = 'workouts';

export function useWorkouts() {
  const queryClient = useQueryClient();
  const { data: workouts, isError } = useSuspenseQuery<Workout[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getWorkouts
  });

  const getWorkoutById = (id: number, populateKeys = false) => {
    const workouts = queryClient.getQueryData([queryKey]) as Workout[];
    const workout = workouts.find(ex => ex.id === id);

    if (!workout) {
      throw new Error(`Unable to find workout with id: ${id}.`);
    }

    // populate keys for exercise groups & sets
    if (populateKeys) {
      workout.exerciseGroups = workout.exerciseGroups.map(g => {
        g.exerciseSets = mapKeys(g.exerciseSets);
        return populateKey(g);
      });
    }

    return workout;
  }

  const create = useMutation({
    mutationFn: async (newWorkout: Workout) => createWorkout(newWorkout),
    onSuccess: (savedWorkout: Workout) => {
      try {
        const prevWorkouts: Workout[] = queryClient.getQueryData([queryKey]) as Workout[];
        queryClient.setQueryData(
          [queryKey],
          prevWorkouts
            ?.concat(savedWorkout)
            .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")));
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const update = useMutation({
    mutationFn: async (workout: Workout) => updateWorkout(workout),
    onSuccess: (updatedWorkout: Workout) => {
      try {
        const prevWorkouts: Workout[] = queryClient.getQueryData([queryKey]) as Workout[];
        queryClient.setQueryData([queryKey], prevWorkouts?.map(ex => (
          ex.id === updatedWorkout.id
            ? updatedWorkout
            : ex)));
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  return {
    workouts,
    isError,
    services: {
      getWorkoutById,
      create,
      update
    }
  }
}