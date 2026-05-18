import type WorkoutProgram from "../types/workoutProgram";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";


export async function getPrograms(): Promise<WorkoutProgram[]> {
  devConsole('fetching programs', Date.now());
  const response = await fetch(`${baseUrl}/programs`);
  if (!response.ok) {
    throw new Error('Failed to fetch programs');
  }
  return await response.json() as WorkoutProgram[];
}

export async function createProgram(newProgram: WorkoutProgram): Promise<WorkoutProgram> {
  devConsole('Creating program ' + newProgram.name);
  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProgram),
  };

  const response = await fetch(`${baseUrl}/programs`, config);

  if (!response.ok) {
    throw new Error('Failed to create new program with name: ' + (newProgram.name ?? "(no name given)"));
  }

  return (await response.json()) as WorkoutProgram;
}