export default interface ActiveExerciseSet {
  id: number,
  reps?: number,
  weight?: number,
  minReps?: number,
  maxReps?: number,
  setType?: string,
  sort: number,
  completed?: boolean,
  activeExerciseGroupId: number
}