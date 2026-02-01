import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExercise, getExerciseList } from "../requests/exercises";
import type Exercise from "../types/exercise";

export function useExercises() {
  const queryClient = useQueryClient();
  const { data: exercises, isLoading, isError } = useQuery<Exercise[]>({
    queryKey: ['exercises'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: getExerciseList
  });

  const create = useMutation({
    mutationFn: async (newExercise: Exercise) => createExercise(newExercise),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    }
  })
  .mutate;

  return {
    exercises,
    isLoading,
    isError,
    services: {
      create
    }
  };
}