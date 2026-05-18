import type WorkoutProgram from "../types/workoutProgram";

export type WorkoutProgramAction =
  { type: string, payload: never }
  | { type: 'setProgram', payload: { program: WorkoutProgram } }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setDescription', payload: { description: string | undefined } }
  | { type: 'addWorkouts', payload: { workoutIds: number[] } }
  | { type: 'removeWorkout', payload: { workoutId: number } }
  | { type: 'shiftWorkout', payload: { workoutId: number, shift: number } };

export default function workoutProgramReducer(program: WorkoutProgram, action: WorkoutProgramAction): WorkoutProgram {
  switch (action.type) {
    case 'setProgram': {
      const { program } = action.payload;
      return { ...program };
    }

    case 'setName': {
      const { name } = action.payload;
      return { ...program, name }
    }

    case 'setDescription': {
      const { description } = action.payload;
      return { ...program, description }
    }

    case 'addWorkouts': {
      const { workoutIds } = action.payload;
      return { ...program, workoutIds };
    }

    case 'removeWorkout': {
      const { workoutId } = action.payload;
      const workoutIds = program.workoutIds.filter(id => id !== workoutId);
      return { ...program, workoutIds };
    }

    case 'shiftWorkout': {
      const { workoutId, shift } = action.payload;
      const oldIndex = program.workoutIds.findIndex(id => id === workoutId);
      const newIndex = oldIndex + shift;
      if (newIndex < 0 || newIndex > program.workoutIds.length) {
        return { ...program };
      }

      program.workoutIds[oldIndex] = program.workoutIds[newIndex];
      program.workoutIds[newIndex] = workoutId;
      return { ...program, workoutIds: [...program.workoutIds] };
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}