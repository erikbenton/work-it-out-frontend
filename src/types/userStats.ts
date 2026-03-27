export default interface UserStats {
  numberOfDays: number,
  numberOfWorkouts: number,
  duration: string,
  durationInSeconds: number,
  numberOfSets: number,
  numberOfReps: number,
  totalVolume: number
};

export const initialStats: UserStats = {
  numberOfDays: 0,
  numberOfWorkouts: 0,
  duration: '00:00:00',
  durationInSeconds: 0,
  numberOfSets: 0,
  numberOfReps: 0,
  totalVolume: 0,
};