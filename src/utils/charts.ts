import type ChartPoint from "../types/chartPoint";
import type ExerciseHistory from "../types/exerciseHistory";
import { getDateTime, type DateTime } from "./dateTime";

export const calculateMaxWeight = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => (curr.weight ?? 0) > acc ? (curr.weight ?? 0) : acc, 0);
}

export const calculateMaxEstimatedPersonalRecord = (history: ExerciseHistory): number => {
  return history.completedExerciseSets.reduce(
    (max, curr) => {
      const weight = (curr.weight ?? 0);
      const personalRecord = weight * (1.0 + (curr.reps / 30.0))
      return personalRecord > max ? personalRecord : max
    }, 0);
}

export const calculateVolume = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => {
      const volume = curr.reps * (curr.weight ?? 1);
      return acc += volume;
    }, 0);
}

const getDateHistoryKey = (dateTime: DateTime): string => {
  return `${dateTime.month}/${dateTime.dayOfMonth}/${dateTime.year % 100}`
}

export function getChartHistoryPoints(history: ExerciseHistory[], numOfDays: number): ChartPoint[] {
  const mostRecent = history[0];
  const mostRecentDate = getDateTime(mostRecent.createdAt);
  const latestDate = new Date(mostRecentDate.year, mostRecentDate.month - 1, mostRecentDate.dayOfMonth);
  const timePeriod = 1000 * 60 * 60 * 24 * numOfDays;
  const startDate = getDateTime(new Date(latestDate.getTime() - timePeriod).toDateString());

  // create map of date-to-history for days in the time period
  const dateHistory = new Map<string, (ExerciseHistory | null)>();
  for (const entry of history ?? []) {
    const entryDateTime = getDateTime(entry.createdAt);
    if (entryDateTime.date.getTime() >= startDate.date.getTime()) {
      dateHistory.set(getDateHistoryKey(entryDateTime), entry);
    }
  }

  // create array of dates with their matching history
  // if there is no history for the day, make the entry null
  const historyPoints: ChartPoint[] = [];
  for (let i = 0; i <= numOfDays + 1; i++) {
    const day = new Date(startDate.year, startDate.month - 1, startDate.dayOfMonth);
    day.setDate(day.getDate() + i);
    const key = getDateHistoryKey(getDateTime(day.toDateString()));
    const entry = dateHistory.get(key) ?? null;
    historyPoints.push({ date: key, value: entry })
  }

  // Get rid of the empty points at the beginning of the time period
  while (historyPoints.length > 0 && historyPoints[0].value === null) {
    historyPoints.shift();
  }

  return historyPoints;
}