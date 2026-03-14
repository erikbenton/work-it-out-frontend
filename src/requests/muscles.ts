import type MuscleOption from "../types/muscleOption";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";

export async function getMuscles(): Promise<MuscleOption[]> {
  devConsole('fetching muscles');
  const response = await fetch(`${baseUrl}/exercises/muscles`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise muscles.');
  }
  return await response.json() as MuscleOption[];
}