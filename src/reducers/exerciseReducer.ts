import type Exercise from "../types/exercise";
import type { ExerciseCategory } from "../types/exerciseCategory";
import type MuscleData from "../types/muscleData";

export type ExerciseAction =
  { type: string, payload: never }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setInstructions', payload: { instructions: string } }
  | { type: 'setCategory', payload: { category: ExerciseCategory } }
  | { type: 'setMuscles', payload: { muscles: MuscleData[] } }
  | { type: 'setEquipment', payload: { equipment: string } };

export default function exerciseReducer(exercise: Exercise, action: ExerciseAction) {
  switch (action.type) {
    case 'setName': {
      return {
        ...exercise,
        name: action.payload.name === ""
          ? null
          : action.payload.name
      };
    }

    case 'setInstructions': {
      return {
        ...exercise,
        instructions: action.payload.instructions === ""
          ? null
          : action.payload.instructions
      };
    }

    case 'setCategory': {
      const { category } = action.payload;
      return ({ ...exercise, category });
    }

    case 'setMuscles': {
      return ({ ...exercise, muscles: action.payload.muscles });
    }

    case 'setEquipment': {
      return ({ ...exercise, equipment: action.payload.equipment });
    }

    default:
      throw new Error("Unhandled action " + action.type)
  }
}

export const initialExercise: Exercise = {
  id: 0,
  name: null,
  instructions: null,
  equipment: 'assisted',
  muscles: [],
  category: 'lift',
  requestedByUser: false
};