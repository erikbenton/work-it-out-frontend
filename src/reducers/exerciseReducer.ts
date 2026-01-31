import type Exercise from "../types/exercise";

type Action =
  { type: string, payload: never }
  | { type: 'setName', payload: { name: string } }
  | { type: 'setInstructions', payload: { instructions: string } }
  | { type: 'setCategory', payload: { category: string } }
  | { type: 'setMuscles', payload: { muscles: string[] } }
  | { type: 'setEquipment', payload: { equipment: string } };

export default function exerciseReducer(exercise: Exercise, action: Action) {
  switch (action.type) {
    case 'setName':
      return {
        ...exercise,
        name: action.payload.name === ""
          ? null
          : action.payload.name
      };

    case 'setInstructions':
      return {
        ...exercise,
        instructions: action.payload.instructions === ""
          ? null
          : action.payload.instructions
      };

    case 'setCategory': {
      const castedEquipment = action.payload.category as 'lift' | 'timed' | 'conditioning';
      return ({ ...exercise, category: castedEquipment });
    }

    case 'setMuscles':
      return ({ ...exercise, muscles: action.payload.muscles });

    case 'setEquipment':
      return ({ ...exercise, equipment: action.payload.equipment });

    default:
      throw new Error("Unhandled action " + action.type)
  }
}

export const initialExercise: Exercise = {
  id: 0,
  name: null,
  instructions: null,
  bodyPart: 'back',
  equipment: 'assisted',
  muscles: [],
  category: 'lift'
};