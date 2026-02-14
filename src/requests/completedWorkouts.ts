import type CompletedWorkout from "../types/completedWorkout";

const baseUrl = 'https://localhost:7185/api';

export async function getCompletedWorkouts(): Promise<CompletedWorkout[]> {
  console.log('fetching completed workouts', Date.now());
  const response = await fetch(`${baseUrl}/completedWorkouts`);
  if (!response.ok) {
    throw new Error('Failed to fetch completed workouts');
  }
  return await response.json() as CompletedWorkout[];
}

export async function createCompletedWorkout(newWorkout: CompletedWorkout): Promise<CompletedWorkout> {
  console.log('Creating completed workout ' + newWorkout.name);

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newWorkout),
  };

  const response = await fetch(`${baseUrl}/completedWorkouts`, config);

  if (!response.ok) {
    throw new Error('Failed to create new completed workout with name: ' + (newWorkout.name ?? "(no name given)"));
  }

  return (await response.json()) as CompletedWorkout;
}