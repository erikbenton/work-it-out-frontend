import type MuscleOption from "../types/muscleOption";
import { baseUrl } from "../utils/config";

export async function getMuscles(): Promise<MuscleOption[]> {
  console.log('fetching muscles');
  const response = await fetch(`${baseUrl}/exercises/muscles`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise muscles.');
  }
  return await response.json() as MuscleOption[];
}