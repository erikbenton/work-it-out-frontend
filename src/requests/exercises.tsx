import type Exercise from '../types/exercise';

const baseUrl = 'https://localhost:7185/api';

export async function getExerciseList(): Promise<Exercise[]> {
  console.log('fetching exercises', Date.now());
  const response = await fetch(`${baseUrl}/exercises`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return await response.json() as Exercise[];
}