import Stack from "@mui/material/Stack";
import type ExerciseHistory from "../../../types/exerciseHistory";
import { LineChart } from "@mui/x-charts/LineChart";
import { getDateTime, type DateTime } from "../../../utils/dateTime";

type Props = {
  history: ExerciseHistory[]
}

type DataPoint = {
  xValue: string,
  yValue: ExerciseHistory | null
}

const getKey = (dateTime: DateTime): string => {
  return `${dateTime.month}/${dateTime.dayOfMonth}/${dateTime.year % 100}`
}

function isNewerOrSameDay(check: DateTime, target: DateTime): boolean {
  return (check.year >= target.year &&
    check.month >= target.month &&
    check.dayOfMonth >= target.dayOfMonth);
}

const calculateMaxWeight = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => (curr.weight ?? 0) > acc ? (curr.weight ?? 0) : acc, 0)
}

const calculateMaxReps = (history: ExerciseHistory): number => {
  return history.completedExerciseSets
    .reduce((acc, curr) => curr.reps > acc ? curr.reps : acc, 0)
}

export default function ExerciseChartTab({ history }: Props) {
  const numOfDays = 14;
  const mostRecent = history[0];
  const mostRecentDate = getDateTime(mostRecent.createdAt);
  const latestDate = new Date(mostRecentDate.year, mostRecentDate.month - 1, mostRecentDate.dayOfMonth);
  const timePeriod = 1000 * 60 * 60 * 24 * numOfDays;
  const startDate = getDateTime(new Date(latestDate.getTime() - timePeriod).toDateString());

  // create map of date-to-history for days in the time period
  const dateHistory = new Map<string, (ExerciseHistory | null)>();
  for (const entry of history ?? []) {
    const entryDateTime = getDateTime(entry.createdAt);
    if (isNewerOrSameDay(entryDateTime, startDate)) {
      dateHistory.set(getKey(entryDateTime), entry);
    }
  }

  // create array of dates with their matching history
  // if there is no history for the day, make the entry null
  const historyPoints: DataPoint[] = [];
  for (let i = 0; i <= numOfDays + 1; i++) {
    const day = new Date(startDate.year, startDate.month - 1, startDate.dayOfMonth);
    day.setDate(day.getDate() + i);
    const key = getKey(getDateTime(day.toDateString()));
    const entry = dateHistory.get(key) ?? null;
    historyPoints.push({ xValue: key, yValue: entry })
  }

  // Get rid of the empty points at the beginning of the time period
  while (historyPoints.length > 0 && historyPoints[0].yValue === null) {
    historyPoints.shift();
  }

  
  const dates = historyPoints.map(({ xValue }) => new Date(xValue));
  const maxWeight = historyPoints.map(({ yValue }) => yValue ? calculateMaxWeight(yValue) : null);
  const maxReps = historyPoints.map(({ yValue }) => yValue ? calculateMaxReps(yValue) : null);
  return (
    <Stack spacing={2}>
      <LineChart
        series={[{ data: maxWeight, connectNulls: true }]}
        xAxis={[{
          data: dates,
          scaleType: 'time',
          valueFormatter: (val) => val.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }),
          tickNumber: dates.length
        }]}
      />
      <LineChart
        series={[{ data: maxReps, connectNulls: true }]}
        xAxis={[{
          data: dates,
          scaleType: 'time',
          valueFormatter: (val) => val.toLocaleString('en-US', { month: '2-digit', day: '2-digit' }),
          tickNumber: dates.length
        }]}
      />
    </Stack>
  );
}