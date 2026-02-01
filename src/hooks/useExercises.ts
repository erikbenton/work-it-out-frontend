import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createExercise, deleteExercise, getExerciseList, updateExercise } from "../requests/exercises";
import type Exercise from "../types/exercise";

const queryKey = 'exercises';

export function useExercises() {
  const queryClient = useQueryClient();
  const { data: exercises, isError } = useSuspenseQuery<Exercise[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getExerciseList
  });

  const getExerciseById = (id: number) => {
    const exercises = queryClient.getQueryData([queryKey]) as Exercise[];
    const exercise = exercises.find(ex => ex.id === id);

    if (!exercise) {
      throw new Error(`Unable to find exercise with id: ${id}.`);
    }

    return exercise;
  }

  const create = useMutation({
    mutationFn: async (newExercise: Exercise) => createExercise(newExercise),
    onSuccess: (savedExercise: Exercise) => {
      try {
        const prevExercises: Exercise[] = queryClient.getQueryData([queryKey]) as Exercise[];
        queryClient.setQueryData(
          [queryKey],
          prevExercises
          ?.concat(savedExercise)
          .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")));
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const update = useMutation({
    mutationFn: async (exercise: Exercise) => updateExercise(exercise),
    onSuccess: (updatedExercise: Exercise) => {
      try {
        const prevExercises: Exercise[] = queryClient.getQueryData([queryKey]) as Exercise[];
        queryClient.setQueryData([queryKey], prevExercises?.map(ex => (
          ex.id === updatedExercise.id
            ? updatedExercise
            : ex)));
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
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
          const prevExercises: Exercise[] = queryClient.getQueryData([queryKey]) as Exercise[];
          queryClient.setQueryData([queryKey], prevExercises.filter(ex => ex.id !== exercise.id))
        } catch {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
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
      remove,
      getExerciseById
    }
  };
}