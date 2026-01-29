export default interface ExerciseSet {
  id: number,
  minReps?: number,
  maxReps?: number,
  setType?: string,
  sort: number,
  exerciseGroupId: number
}