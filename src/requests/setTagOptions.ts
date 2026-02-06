import type SetTagOption from "../types/setTagOption";

const baseUrl = 'https://localhost:7185/api';

export async function getSetTagOptions(): Promise<SetTagOption[]> {
  console.log('fetching set tag options.', Date.now());
  const response = await fetch(`${baseUrl}/workouts/setTagOptions`);
  if (!response.ok) {
    throw new Error('Failed to fetch set tag options.');
  }
  return await response.json() as SetTagOption[];
}