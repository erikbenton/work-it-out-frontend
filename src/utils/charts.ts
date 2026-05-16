import type ChartPoint from "../types/chartPoint";
import type { CompletedExerciseGroup } from "../types/completedExerciseGroup";
import type { ExerciseHistory } from "../types/exerciseHistory";
import { getDateTime, type DateTime } from "./dateTime";
import { daysSince, durationToSeconds } from "./formatters";

export const calculateMaxWeight = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => (curr.weight ?? 0) > acc ? (curr.weight ?? 0) : acc, 0);
}

export const calculateTotalReps = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => acc + (curr.reps ?? 0), 0);
}

export const calculateTotalDistance = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => acc + (curr.distance ?? 0), 0);
}

export const calculateTotalSeconds = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => acc + durationToSeconds(curr.duration), 0);
}

export const calculateTotalStretchSeconds = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => acc + durationToSeconds(curr.duration) * (curr.reps ?? 1), 0);
}

export const calculateBestPace = (history: CompletedExerciseGroup) => {
  return history.completedExerciseSets.reduce((acc, curr) => {
    if (curr.distance && curr.duration !== undefined) {
      const pace = durationToSeconds(curr.duration) / curr.distance;
      return !acc || pace < acc
        ? pace
        : acc;
    } else {
      return acc;
    }
  }, null as (null | number));
}

export const calculateNumberOfReps = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => acc + (curr.reps ?? 0), 0);
}

export const calculateEstimatedOneRepMax = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets.reduce(
    (max, curr) => {
      const weight = (curr.weight ?? 0);
      const personalRecord = weight * (1.0 + ((curr.reps ?? 0) / 30.0))
      return personalRecord > max ? personalRecord : max
    }, 0);
}

export const calculateVolume = (history: CompletedExerciseGroup): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => {
      const volume = (curr.reps ?? 0) * (curr.weight ?? 1);
      return acc += volume;
    }, 0);
}

const getDateHistoryKey = (dateTime: DateTime): string => {
  return `${dateTime.month}/${dateTime.dayOfMonth}/${dateTime.year % 100}`
}

export function getChartHistoryPoints(history: ExerciseHistory[], numOfDays: number): ChartPoint[] {
  const mostRecent = history[0].group;
  const earliest = history[history.length - 1].group;
  const mostRecentDate = getDateTime(mostRecent.createdAt);
  const latestDate = new Date(mostRecentDate.year, mostRecentDate.month - 1, mostRecentDate.dayOfMonth);
  const timePeriod = 1000 * 60 * 60 * 24 * numOfDays;
  const startDate = numOfDays > 0
    ? getDateTime(new Date(latestDate.getTime() - timePeriod).toDateString())
    : getDateTime(earliest.createdAt);

  // calc actual number of days if "all time" selected
  const totalDays = numOfDays > 0
    ? numOfDays
    : daysSince(startDate.year, startDate.month, startDate.dayOfMonth)

  // create map of date-to-history for days in the time period
  const dateHistory = new Map<string, (CompletedExerciseGroup | null)>();
  for (const entry of history ?? []) {
    const entryDateTime = getDateTime(entry.group.createdAt);
    if (entryDateTime.date.getTime() >= startDate.date.getTime()) {
      dateHistory.set(getDateHistoryKey(entryDateTime), entry.group);
    }
  }

  // create array of dates with their matching history
  // if there is no history for the day, make the entry null
  const historyPoints: ChartPoint[] = [];
  for (let i = 0; i <= totalDays + 1; i++) {
    const day = new Date(startDate.year, startDate.month - 1, startDate.dayOfMonth);
    day.setDate(day.getDate() + i);
    const key = getDateHistoryKey(getDateTime(day.toDateString()));
    const entry = dateHistory.get(key) ?? null;
    // leave the nulls so they are still data points on the chart
    historyPoints.push({ date: key, value: entry })
  }

  // Get rid of the empty points at the end of the time period
  while (historyPoints.length > 0 && historyPoints[historyPoints.length - 1].value === null) {
    historyPoints.pop();
  }

  // Get rid of the empty points at the beginning of the time period
  while (historyPoints.length > 0 && historyPoints[0].value === null) {
    historyPoints.shift();
  }

  return historyPoints;
}