import { useMutation, useQueryClient, useSuspenseQuery, type MutateOptions, type UseMutateFunction } from "@tanstack/react-query";
import type CompletedWorkout from "../types/completedWorkout";
import { createCompletedWorkout, deleteCompletedWorkout, getCompletedWorkouts } from "../requests/completedWorkouts";
import type ActiveWorkout from "../types/activeWorkout";
import { durationToSeconds, msToDuration, secondsToDuration } from "../utils/formatters";
import { numberOfDaysKeys, queryKey as userStatsQueryKey } from "./useUserStats";
import type UserStats from "../types/userStats";
import { calculateNumberOfReps, calculateVolume } from "../utils/charts";
import cacheTimes from "../utils/cacheTimes";
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import { queryKey as historyQueryKey } from "./useExerciseHistory";
import { devConsole } from "../utils/debugLogger";

const queryKey = 'completedWorkouts';

export interface CompletedWorkoutServices {
  create: UseMutateFunction<CompletedWorkout, Error, CompletedWorkout, unknown>;
  remove: UseMutateFunction<number, Error, number, unknown>;
  createFromActiveWorkout: (activeWorkout: ActiveWorkout, options?: MutateOptions<CompletedWorkout, Error, CompletedWorkout, unknown>) => void;
  getCompletedWorkoutById: (id: number) => CompletedWorkout;
}

export function useCompletedWorkouts() {
  const queryClient = useQueryClient();
  const { data: completedWorkouts, isError } = useSuspenseQuery<CompletedWorkout[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week,
    gcTime: cacheTimes.week * 2,
    queryFn: getCompletedWorkouts
  });

  const getCompletedWorkoutById = (id: number) => {
    const workouts = queryClient.getQueryData([queryKey]) as CompletedWorkout[];
    const workout = workouts.find(ex => ex.id === id);

    if (!workout) {
      throw new Error(`Unable to find completed workout with id: ${id}.`);
    }

    return workout;
  }

  const updateHistories = (completedWorkout: CompletedWorkout) => {
    for (const group of completedWorkout.completedExerciseGroups) {
      const key = [historyQueryKey, group.exerciseId]
      try {
        const prevHistory = queryClient.getQueryData(key) as CompletedExerciseGroup[];
        queryClient.setQueryData(key, [{ ...group }, ...prevHistory]);
      } catch {
        queryClient.invalidateQueries({ queryKey: key });
      }
    }
  }

  const removeHistories = (completedWorkout: CompletedWorkout) => {
    for (const group of completedWorkout.completedExerciseGroups) {
      const key = [historyQueryKey, group.exerciseId]
      try {
        const prevHistory = queryClient.getQueryData(key) as CompletedExerciseGroup[];
        queryClient.setQueryData(key, prevHistory.filter(h => h.id !== group.id));
      } catch {
        queryClient.invalidateQueries({ queryKey: key });
      }
    }
  }

  const removeStats = () => {
    for (const option of numberOfDaysKeys) {
      const key = [userStatsQueryKey, option.numberOfDays];
      queryClient.invalidateQueries({ queryKey: key });
    }
  }

  const updateStats = (completedWorkout: CompletedWorkout) => {
    for (const option of numberOfDaysKeys) {
      const key = [userStatsQueryKey, option.numberOfDays];
      try {
        const userStats = queryClient.getQueryData(key) as UserStats | undefined;
        if (userStats) {
          const numberOfWorkouts = userStats.numberOfWorkouts + 1;
          const numberOfReps = userStats.numberOfReps + completedWorkout.completedExerciseGroups
            .reduce((acc, curr) => acc + calculateNumberOfReps(curr), 0);
          const numberOfSets = userStats.numberOfSets + completedWorkout.completedExerciseGroups
            .reduce((acc, curr) => acc + curr.completedExerciseSets.length, 0);
          const totalVolume = userStats.totalVolume + completedWorkout.completedExerciseGroups
            .reduce((acc, curr) => acc + calculateVolume(curr), 0);
          const durationInSeconds = userStats.durationInSeconds + durationToSeconds(completedWorkout.duration);
          const duration = secondsToDuration(durationInSeconds);
          const updatedStats: UserStats = {
            numberOfWorkouts,
            numberOfDays: option.numberOfDays,
            numberOfReps,
            numberOfSets,
            duration,
            durationInSeconds,
            totalVolume
          }
          queryClient.setQueryData(key, updatedStats);
        }
      } catch {
        queryClient.invalidateQueries({ queryKey: key });
      }
    }
  }

  function convertActiveWorkout(activeWorkout: ActiveWorkout): CompletedWorkout {
    return {
      // convert top level fields
      id: activeWorkout.id,
      name: activeWorkout.name,
      description: activeWorkout.description,
      note: activeWorkout.note,
      duration: msToDuration(Date.now() - activeWorkout.startTime),
      // convert exercise groups
      completedExerciseGroups: activeWorkout.exerciseGroups.map((g, index) => {
        return {
          id: 0,
          completedWorkoutId: activeWorkout.id,
          exerciseId: g.exerciseId,
          sort: index,
          note: g.note,
          comment: g.comment,
          restTime: g.restTime,
          // convert exercise sets for each exercise group
          completedExerciseSets: g.exerciseSets
            .filter(s => s.completed) // filter out uncompleted sets
            .map((s, index) => {
              return {
                id: 0,
                completedExerciseGroupId: g.id,
                reps: s.reps ?? 0,
                weight: s.weight,
                minReps: s.minReps,
                maxReps: s.maxReps,
                setTagId: s.setTagId,
                sort: index,
              };
            })
        };
      })
        .filter(g => g.completedExerciseSets.length > 0)
    };
  }

  const createFromActiveWorkout = (
    activeWorkout: ActiveWorkout,
    options?: MutateOptions<CompletedWorkout, Error, CompletedWorkout, unknown>
  ) => {
    const convertedWorkout = convertActiveWorkout(activeWorkout);
    create(convertedWorkout, options);
  }

  const create = useMutation({
    mutationFn: async (newWorkout: CompletedWorkout) => createCompletedWorkout(newWorkout),
    onSuccess: (savedWorkout: CompletedWorkout) => {
      try {
        const prevWorkouts: CompletedWorkout[] = queryClient.getQueryData([queryKey]) as CompletedWorkout[];
        queryClient.setQueryData([queryKey], [savedWorkout, ...prevWorkouts]); // put it at the top of the list
        updateHistories(savedWorkout);
        updateStats(savedWorkout);
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const remove = useMutation({
    mutationFn: async (workoutId: number) => deleteCompletedWorkout(workoutId),
    onSuccess: (deletedId: number) => {
        try {
          const prevWorkouts: CompletedWorkout[] = queryClient.getQueryData([queryKey]) as CompletedWorkout[];
          const workout = prevWorkouts.find(w => w.id === deletedId);
          queryClient.setQueryData([queryKey], prevWorkouts.filter(ex => ex.id !== deletedId));
          if (workout) {
            devConsole(`deleted workout: ${deletedId}`)
            removeHistories(workout);
          }
          removeStats();
        } catch {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      }
  }).mutate;

  return {
    completedWorkouts,
    isError,
    convertActiveWorkout,
    services: {
      create,
      remove,
      createFromActiveWorkout,
      getCompletedWorkoutById
    }
  }
}