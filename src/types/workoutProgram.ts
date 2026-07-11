export default interface WorkoutProgram {
  id?: number,
  name: string,
  description?: string,
  colorRgb: string,
  tag?: string,
  workoutIds: number[]
}