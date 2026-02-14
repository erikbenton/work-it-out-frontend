import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type CompletedWorkout from "../types/completedWorkout";
import { createCompletedWorkout, getCompletedWorkouts } from "../requests/completedWorkouts";
import type ActiveWorkout from "../types/activeWorkout";

const queryKey = 'completedWorkouts';

export function useCompletedWorkouts() {
  const queryClient = useQueryClient();
  const { data: completedWorkouts, isError } = useSuspenseQuery<CompletedWorkout[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getCompletedWorkouts
  });

  function convertActiveWorkout(activeWorkout: ActiveWorkout): CompletedWorkout {
    return {
      // convert top level fields
      id: activeWorkout.id,
      name: activeWorkout.name,
      workoutId: activeWorkout.workoutId,
      description: activeWorkout.description,
      note: activeWorkout.note,
      duration: '01:23:45',
      // convert exercise groups
      completedExerciseGroups: activeWorkout.exerciseGroups.map((g, index) => {
        return {
          id: 0,
          workoutId: activeWorkout.workoutId,
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
    };
  }

  const create = useMutation({
    mutationFn: async (newWorkout: CompletedWorkout) => createCompletedWorkout(newWorkout),
    onSuccess: (savedWorkout: CompletedWorkout) => {
      try {
        const prevWorkouts: CompletedWorkout[] = queryClient.getQueryData([queryKey]) as CompletedWorkout[];
        queryClient.setQueryData([queryKey], [ savedWorkout, ...prevWorkouts ]); // put it at the top of the list
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
    }
  }
}