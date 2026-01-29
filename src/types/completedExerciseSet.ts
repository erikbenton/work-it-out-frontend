export default interface CompletedExerciseSet {
  id: number,
  reps: number,
  weight?: number,
  minReps?: number,
  maxReps?: number,
  setType?: string,
  sort: number,
  createdAt: Date,
  completedExerciseGroupId: number
}