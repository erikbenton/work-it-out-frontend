import type { ExerciseCategory } from "./exerciseCategory";
import type MuscleData from "./muscleData";

export default interface Exercise {
  id: number,
  name: string | null,
  instructions: string | null,
  equipment: string | null,
  muscles?: MuscleData[],
  category: ExerciseCategory
}