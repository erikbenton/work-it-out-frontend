import type MuscleOption from "../types/muscleOption";

const baseUrl = 'https://localhost:7185/api';

export async function getMuscles(): Promise<MuscleOption[]> {
  console.log('fetching muscles');
  const response = await fetch(`${baseUrl}/exercises/muscles`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise muscles.');
  }
  return await response.json() as MuscleOption[];
}