import type CompletedWorkout from "../types/completedWorkout";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";

export async function getCompletedWorkouts(): Promise<CompletedWorkout[]> {
  devConsole('fetching completed workouts', Date.now());
  const response = await fetch(`${baseUrl}/completedWorkouts`);
  if (!response.ok) {
    throw new Error('Failed to fetch completed workouts');
  }
  return await response.json() as CompletedWorkout[];
}

export async function createCompletedWorkout(newWorkout: CompletedWorkout): Promise<CompletedWorkout> {
  devConsole('Creating completed workout ' + newWorkout.name);

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

export async function deleteCompletedWorkout(workoutId: number): Promise<number> {
  devConsole('Deleting completed workout ' + workoutId);
  const config = { method: 'DELETE' };

  const response = await fetch(`${baseUrl}/completedWorkouts/${workoutId}`, config);

  if (!response.ok) {
    throw new Error('Failed to delete workout with id: ' + workoutId);
  }

  return workoutId;
}