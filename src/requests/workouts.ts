import type Workout from '../types/workout';
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

export async function getWorkouts(): Promise<Workout[]> {
  console.log('fetching workouts', Date.now());
  const response = await fetch(`${baseUrl}/workouts`);
  if (!response.ok) {
    throw new Error('Failed to fetch workouts');
  }
  return await response.json() as Workout[];
}

export async function getWorkoutById(id: number): Promise<Workout> {
  console.log('fetching workout ' + id.toString(), Date.now());
  const response = await fetch(`${baseUrl}/workouts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch workout with id: ' + id.toString());
  }
  return (await response.json()) as Workout;
}