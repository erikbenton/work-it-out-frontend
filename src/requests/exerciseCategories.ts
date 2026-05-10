import type ExerciseCategoryOption from "../types/exerciseCategoryOption";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";


export async function getExerciseCategories(): Promise<ExerciseCategoryOption[]> {
  devConsole('fetching exercise categories');
  const response = await fetch(`${baseUrl}/exercises/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise categories.');
  }
  return await response.json() as ExerciseCategoryOption[];
}