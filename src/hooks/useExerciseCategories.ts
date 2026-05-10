import { useSuspenseQuery } from "@tanstack/react-query";
import cacheTimes from "../utils/cacheTimes";
import type ExerciseCategoryOption from "../types/exerciseCategoryOption";
import { getExerciseCategories } from "../requests/exerciseCategories";

const queryKey = 'exerciseCategories';

export default function useExerciseCategories() {
  const { data: categories, isError } = useSuspenseQuery<ExerciseCategoryOption[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week, // 7 days
    gcTime: cacheTimes.week * 2, // 14 days
    queryFn: getExerciseCategories
  });

  const getCategoryById = (id: number): ExerciseCategoryOption | null => {
    return categories.find(c => c.id === id) ?? null;
  }

  return {
    categories,
    isError,
    services: {
      getCategoryById
    }
  };
}