import Stack from "@mui/material/Stack";
import type ExerciseHistory from "../../../types/exerciseHistory";
import { LineChart } from "@mui/x-charts/LineChart";
import { getDateTime, type DateTime } from "../../../utils/dateTime";
import { chartDate } from "../../../utils/formatters";
import { deepPurple, indigo, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calculateMaxEstimatedPersonalRecord, calculateMaxWeight, calculateVolume } from "../../../utils/charts";

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
  const maxPersonalRecord = historyPoints.map(({ yValue }) => yValue ? calculateMaxEstimatedPersonalRecord(yValue) : null);
  const volume = historyPoints.map(({ yValue }) => yValue ? calculateVolume(yValue) : null);

  if (dates.length === 0) {
    return (<Box><Typography>No data was found for this exercise in the time period.</Typography></Box>)
  }

  return (
    <Stack spacing={2} sx={{ pb: 5 }}>
      <LineChart
        series={[{
          data: maxWeight,
          color: indigo[700],
          area: true,
          baseline: 'min',
          label: 'Max Weight (lbs)',
          valueFormatter: (val) => val ? `${val} lbs` : null,
          connectNulls: true
        }]}
        xAxis={[{
          data: dates,
          scaleType: 'time',
          valueFormatter: (val) => chartDate(val),
          tickNumber: dates.length
        }]}
      />
      <LineChart
        series={[{
          data: maxPersonalRecord,
          color: red[700],
          area: true,
          baseline: 'min',
          label: 'Max Est. PR (lbs)',
          valueFormatter: (val) => val ? `${val} lbs` : null,
          connectNulls: true
        }]}
        xAxis={[{
          data: dates,
          scaleType: 'time',
          valueFormatter: (val) => chartDate(val),
          tickNumber: dates.length
        }]}
      />
      <LineChart
        series={[{
          data: volume,
          color: deepPurple[700],
          area: true,
          baseline: 'min',
          label: 'Volume (lbs)',
          valueFormatter: (val) => val ? `${val} lbs` : null,
          connectNulls: true
        }]}
        xAxis={[{
          data: dates,
          scaleType: 'time',
          valueFormatter: (val) => chartDate(val),
          tickNumber: dates.length
        }]}
      />
    </Stack>
  );
}