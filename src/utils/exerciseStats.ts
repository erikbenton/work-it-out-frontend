import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import { calculateEstimatedOneRepMax } from "./charts";
import { durationToSeconds } from "./formatters";

type LiftStats = {
  totalReps?: number,
  totalVolume?: number,
  oneRepMax?: number
}

type TimedStats = {
  totalDistance?: number,
  totalSeconds?: number,
  bestPaceSeconds?: number
}

type StretchStats = {
  totalReps?: number,
  totalSeconds?: number
}

const initLiftStats: LiftStats = {
  totalReps: undefined,
  totalVolume: undefined,
  oneRepMax: undefined
};

const initTimedStats: TimedStats = {
  totalDistance: undefined,
  totalSeconds: undefined,
  bestPaceSeconds: undefined
};

const initStretchStats: StretchStats = {
  totalReps: undefined,
  totalSeconds: undefined
};

export const calculateLiftStats = (group: CompletedExerciseGroup) => {
  const stats = group.completedExerciseSets.reduce((acc, curr) => {
    const newStats = { ...initLiftStats };
    newStats.totalReps = curr.reps === undefined
      ? acc.totalReps
      : (acc.totalReps ?? 0) + curr.reps;

    newStats.totalVolume = (curr.weight === undefined || curr.reps === undefined)
      ? acc.totalVolume
      : (acc.totalVolume ?? 0) + (curr.reps * curr.weight);

    return newStats;
  }, initLiftStats);
  stats.oneRepMax = calculateEstimatedOneRepMax(group);
  return stats;
}

export const calculateTimedStats = (group: CompletedExerciseGroup) => {
  const stats = group.completedExerciseSets.reduce((acc, curr) => {
    const newStats = { ...initTimedStats };
    newStats.totalDistance = curr.distance === undefined
      ? acc.totalDistance
      : (acc.totalDistance ?? 0) + curr.distance;

    newStats.totalSeconds = !curr.duration
      ? acc.totalSeconds
      : (acc.totalSeconds ?? 0) + durationToSeconds(curr.duration);

    if (curr.distance && curr.duration !== undefined) {
      const pace = durationToSeconds(curr.duration) / curr.distance;
      newStats.bestPaceSeconds = !acc.bestPaceSeconds || pace < acc.bestPaceSeconds
        ? pace
        : acc.bestPaceSeconds;
    } else {
      newStats.bestPaceSeconds = acc.bestPaceSeconds;
    }

    return newStats;
  }, initTimedStats);

  return stats;
}

export const calculateStretchStats = (group: CompletedExerciseGroup) => {
  const stats = group.completedExerciseSets.reduce((acc, curr) => {
    const newStats = { ...initStretchStats };
    newStats.totalReps = !curr.reps
      ? acc.totalReps
      : (acc.totalReps ?? 0) + curr.reps;

    newStats.totalSeconds = !curr.duration
      ? acc.totalSeconds
      : (acc.totalSeconds ?? 0) + durationToSeconds(curr.duration) * (curr.reps ?? 1);

    return newStats;
  }, initStretchStats);

  return stats;
}