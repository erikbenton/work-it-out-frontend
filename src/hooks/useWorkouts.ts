import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type Workout from "../types/workout";
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout } from "../requests/workouts";
import { mapKeys, populateKey } from "../types/keyId";
import cacheTimes from "../utils/cacheTimes";

const queryKey = 'workouts';

export function useWorkouts() {
  const queryClient = useQueryClient();
  const { data: workouts, isError } = useSuspenseQuery<Workout[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week, // 7 days
    gcTime: cacheTimes.week * 2, // 14 days
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

  const createClone = (workout: Workout): Workout => {
    return {
      ...workout,
      id: 0,
      name: workout.name + ' (Clone)',
      exerciseGroups: workout.exerciseGroups.map(group => {
        return {
          ...group,
          id: 0,
          exerciseSets: group.exerciseSets.map(set => {
            return {
              ...set,
              id: 0
            }
          })
        }
      })
    };
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

  const clone = useMutation({
    mutationFn: async (workout: Workout) => createWorkout(createClone(workout)),
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

  const removeMutation = useMutation({
    mutationFn: async (workout: Workout) => deleteWorkout(workout)
  }).mutate;

  // wrap removeMutation so that we can use the
  // id to filter the deleted workout onSuccess
  const remove = (workout: Workout, callBackFn?: () => void) => {
    removeMutation(workout, {
      onSuccess: () => {
        try {
          const prevWorkouts: Workout[] = queryClient.getQueryData([queryKey]) as Workout[];
          queryClient.setQueryData([queryKey], prevWorkouts.filter(ex => ex.id !== workout.id));
          if (callBackFn) {
            callBackFn();
          }
        } catch {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      }
    });
  }

  return {
    workouts,
    isError,
    services: {
      getWorkoutById,
      create,
      clone,
      update,
      remove
    }
  }
}