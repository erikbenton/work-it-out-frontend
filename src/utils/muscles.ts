import type { ExerciseServices } from "../hooks/useExercises";
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type ExerciseGroup from "../types/exerciseGroup";
import type MuscleData from "../types/muscleData";

export function getMaxMuscleGroup(exerciseGroups: ExerciseGroup[] | CompletedExerciseGroup[], exerciseService: ExerciseServices): MuscleData {
  const muscleWeights = new Map<string, MuscleData>();
  for (const group of exerciseGroups) {
    const exercise = exerciseService.getExerciseById(group.exerciseId);
    for (const muscleData of exercise.muscles ?? []) {
      const entry = muscleWeights.get(muscleData.name) ?? { ...muscleData, weight: 0 };
      muscleWeights.set(muscleData.name, { ...entry, weight: entry.weight + muscleData.weight });
    }
  }

  const defaultMuscle = { name: '?', weight: 0, colorRgb: 'gray ' }

  const maxMuscle = Array.from(muscleWeights).reduce((acc, curr) => {
    return curr[1].weight > acc[1].weight ? curr : acc;
  }, ['?', defaultMuscle]);

  return maxMuscle[1];
}