export default interface ExerciseCategoryOption {
  id: number,
  name: string,
  colorRgb: string,
  firstTargetInput: ('weight' | 'reps' | 'duration' | 'distance'),
  secondTargetInput: ('weight' | 'reps' | 'duration' | 'distance'),
  firstInput: ('weight' | 'reps' | 'duration' | 'distance'),
  secondInput: ('weight' | 'reps' | 'duration' | 'distance')
}