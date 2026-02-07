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

export async function createWorkout(newWorkout: Workout): Promise<Workout> {
  console.log('Creating workout ' + newWorkout.name);
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newWorkout),
  };

  const response = await fetch(`${baseUrl}/workouts`, config);

  if (!response.ok) {
    throw new Error('Failed to create new workout with name: ' + (newWorkout.name ?? "(no name given)"));
  }

  return (await response.json()) as Workout;
}

export async function updateWorkout(workout: Workout): Promise<Workout> {
  console.log('Updating workout ' + workout.id);
  const config = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workout),
  };

  const response = await fetch(`${baseUrl}/workouts/${workout.id}`, config);

  if (!response.ok) {
    throw new Error('Failed to update workout with id: ' + workout.id);
  }

  return (await response.json()) as Workout;
}

export async function deleteWorkout(workout: Workout): Promise<void> {
  console.log('Deleting workout ' + workout.id);
  const config = { method: 'DELETE' };

  const response = await fetch(`${baseUrl}/workouts/${workout.id}`, config);

  if (!response.ok) {
    throw new Error('Failed to delete workout with id: ' + workout.id);
  }
}