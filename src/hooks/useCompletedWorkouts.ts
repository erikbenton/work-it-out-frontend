import { useMutation, useQueryClient, useSuspenseQuery, type MutateOptions } from "@tanstack/react-query";
import type CompletedWorkout from "../types/completedWorkout";
import { createCompletedWorkout, getCompletedWorkouts } from "../requests/completedWorkouts";
import type ActiveWorkout from "../types/activeWorkout";
import { durationToSeconds, msToDuration, secondsToDuration } from "../utils/formatters";
import type ExerciseHistory from "../types/exerciseHistory";
import { queryKey as historyQueryKey } from "./useExerciseHistory";
import { numberOfDaysKeys, queryKey as userStatsQueryKey } from "./useUserStats";
import type UserStats from "../types/userStats";
import { calculateNumberOfReps, calculateVolume } from "../utils/charts";

const queryKey = 'completedWorkouts';

export function useCompletedWorkouts() {
  const queryClient = useQueryClient();
  const { data: completedWorkouts, isError } = useSuspenseQuery<CompletedWorkout[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    gcTime: 1000 * 60 * 60 * 24 * 14, // 14 days
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
      const history: ExerciseHistory = {
        completedExerciseGroupId: group.id,
        createdAt: completedWorkout.createdAt!,
        comment: group.comment,
        exerciseId: group.exerciseId,
        completedExerciseSets: group.completedExerciseSets
      }
      const key = [historyQueryKey, history.exerciseId]
      try {
        const prevHistory = queryClient.getQueryData(key) as ExerciseHistory[];
        queryClient.setQueryData(key, [history, ...prevHistory]);
      } catch {
        queryClient.invalidateQueries({ queryKey: key });
      }
    }
  }

  const updateStats = (completedWorkout: CompletedWorkout) => {
    for (const numberOfDays of numberOfDaysKeys) {
      const key = [userStatsQueryKey, numberOfDays];
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
            numberOfDays,
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

  return {
    completedWorkouts,
    isError,
    convertActiveWorkout,
    services: {
      create,
      createFromActiveWorkout,
      getCompletedWorkoutById
    }
  }
}