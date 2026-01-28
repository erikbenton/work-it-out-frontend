import type WorkoutSummary from '../types/workoutSummary';

const baseUrl = 'https://localhost:7185/api';

export async function getWorkoutList(): Promise<WorkoutSummary[]> {
  console.log('fetching workouts', Date.now());
  const response = await fetch(`${baseUrl}/workouts`);
  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }
  return await response.json() as WorkoutSummary[];
}