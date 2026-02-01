import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createExercise, deleteExercise, getExerciseList, updateExercise } from "../requests/exercises";
import type Exercise from "../types/exercise";

export function useSuspensefulExercises() {
  const queryClient = useQueryClient();
  const { data: exercises, isError } = useSuspenseQuery<Exercise[]>({
    queryKey: ['exercises'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getExerciseList
  });

  const create = useMutation({
    mutationFn: async (newExercise: Exercise) => createExercise(newExercise),
    onSuccess: (savedExercise: Exercise) => {
      try {
        const prevExercises: Exercise[] = queryClient.getQueryData(['exercises']) as Exercise[];
        // TODO: Re-sort the exercises?
        queryClient.setQueryData(['exercises'], prevExercises?.concat(savedExercise))
      } catch {
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
      }
    }
  }).mutate;

  const update = useMutation({
    mutationFn: async (exercise: Exercise) => updateExercise(exercise),
    onSuccess: (updatedExercise: Exercise) => {
      try {
        const prevExercises: Exercise[] = queryClient.getQueryData(['exercises']) as Exercise[];
        queryClient.setQueryData(['exercises'], prevExercises?.map(ex => (
          ex.id === updatedExercise.id
            ? updatedExercise
            : ex)));
      } catch {
        queryClient.invalidateQueries({ queryKey: ["exercises"] });
      }
    }
  }).mutate;

  const removeMutation = useMutation({
    mutationFn: async (exercise: Exercise) => deleteExercise(exercise)
  }).mutate;

  // wrap removeMutation so that we can use the
  // id to filter the deleted exercise onSuccess
  const remove = (exercise: Exercise) => {
    removeMutation(exercise, {
      onSuccess: () => {
        try {
          const prevExercises: Exercise[] = queryClient.getQueryData(['exercises']) as Exercise[];
          queryClient.setQueryData(['exercises'], prevExercises.filter(ex => ex.id !== exercise.id))
        } catch {
          queryClient.invalidateQueries({ queryKey: ["exercises"] });
        }
      }
    });
  }

  return {
    exercises,
    isError,
    services: {
      create,
      update,
      remove
    }
  };
}