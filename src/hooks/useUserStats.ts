import { useSuspenseQuery } from "@tanstack/react-query";
import type UserStats from "../types/userStats";
import cacheTimes from "../utils/cacheTimes";
import type CompletedWorkout from "../types/completedWorkout";
import { initialStats } from "../types/userStats";
import { calculateNumberOfReps, calculateVolume } from "../utils/charts";
import { durationToSeconds, secondsToDuration } from "../utils/formatters";
import { useCompletedWorkouts } from "./useCompletedWorkouts";
import { devConsole } from "../utils/debugLogger";

export const queryKey = "userStats";

export const numberOfDaysKeys = [
  { numberOfDays: 7, label: "1 Week" },
  { numberOfDays: 14, label: "2 Weeks" },
  { numberOfDays: 28, label: "4 Weeks" },
];

function calculateGroupStats(workout: CompletedWorkout): UserStats {
  return workout.completedExerciseGroups.reduce((acc, curr) => {
    const numberOfSets = curr.completedExerciseSets.length;
    const numberOfReps = calculateNumberOfReps(curr);
    const totalVolume = calculateVolume(curr);
    return {
      ...acc,
      numberOfSets: acc.numberOfSets + numberOfSets,
      numberOfReps: acc.numberOfReps + numberOfReps,
      totalVolume: acc.totalVolume + totalVolume
    }
  }, initialStats);
}

function calculateUserStats(
  numberOfDays: number,
  completedWorkouts: CompletedWorkout[]
): UserStats {
  // figure out the end date
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - numberOfDays);

  devConsole('end date', endDate);

  // get the workouts before the end date
  const workouts = completedWorkouts.filter(w => new Date(w.createdAt ?? '') > endDate);

  // iterate through the Exercise Groups
  // calculate the stats
  const stats = workouts.reduce((acc, curr) => {
    const groupStats = calculateGroupStats(curr);
    const durationInSeconds = durationToSeconds(curr.duration);
    const totalDurationSeconds = acc.durationInSeconds + durationInSeconds;
    return {
      numberOfDays: numberOfDays,
      numberOfWorkouts: acc.numberOfWorkouts + 1,
      durationInSeconds: totalDurationSeconds,
      duration: secondsToDuration(totalDurationSeconds),
      numberOfSets: acc.numberOfSets + groupStats.numberOfSets,
      numberOfReps: acc.numberOfReps + groupStats.numberOfReps,
      totalVolume: acc.totalVolume + groupStats.totalVolume
    }
  }, initialStats);

  // return the stats
  return stats;
}

export default function useUserStats(numberOfDays: number) {
  const { completedWorkouts } = useCompletedWorkouts();
  const { data: userStats, isError } = useSuspenseQuery<UserStats>({
    queryKey: [queryKey, numberOfDays],
    staleTime: cacheTimes.day,
    gcTime: cacheTimes.day * 2,
    queryFn: () => calculateUserStats(numberOfDays, completedWorkouts)
  });

  return {
    userStats,
    isError
  }
}