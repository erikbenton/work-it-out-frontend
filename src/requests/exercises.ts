import type Exercise from '../types/exercise';
import type ExerciseHistory from '../types/exerciseHistory';

const baseUrl = 'https://localhost:7185/api';

export async function getExerciseList(): Promise<Exercise[]> {
  console.log('fetching exercises', Date.now());
  const response = await fetch(`${baseUrl}/exercises`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercises');
  }
  return await response.json() as Exercise[];
}

export async function getExerciseById(id: number): Promise<Exercise> {
  console.log('fetching exercise ' + id.toString(), Date.now());
  const response = await fetch(`${baseUrl}/exercises/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch exercise with id: ' + id.toString());
  }
  return (await response.json()) as Exercise;
}

export async function getExerciseHistoryById(id: number): Promise<ExerciseHistory[]> {
  console.log('fetching exercise history', Date.now());
  const response = await fetch(`${baseUrl}/completedExerciseGroups/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch history for exercise with id: ' + id.toString());
  }
  return (await response.json()) as ExerciseHistory[];
}

export async function createExercise(newExercise: Exercise): Promise<Exercise> {
  console.log('Creating exercise ' + newExercise.name);
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newExercise),
  };

  const response = await fetch(`${baseUrl}/exercises`, config);

  if (!response.ok) {
    throw new Error('Failed to create new exercise with name: ' + (newExercise.name ?? "(no name given)"));
  }

  return (await response.json()) as Exercise;
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
  console.log('Updating exercise ' + exercise.id);
  const config = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exercise),
  };

  const response = await fetch(`${baseUrl}/exercises/${exercise.id}`, config);

  if (!response.ok) {
    throw new Error('Failed to update exercise with id: ' + exercise.id);
  }

  return (await response.json()) as Exercise;
}

export async function deleteExercise(exercise: Exercise): Promise<void> {
  console.log('Deleting exercise ' + exercise.id);
  const config = { method: 'DELETE' };

  const response = await fetch(`${baseUrl}/exercises/${exercise.id}`, config);

  if (!response.ok) {
    throw new Error('Failed to delete exercise with id: ' + exercise.id);
  }
}