import type MuscleData from "./muscleData";

export default interface Exercise {
  id: number,
  name: string | null,
  instructions: string | null,
  equipment: string | null,
  muscles?: MuscleData[],
  category?: 'lift' | 'timed' | 'conditioning'
}