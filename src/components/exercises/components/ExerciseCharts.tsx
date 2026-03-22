import Stack from "@mui/material/Stack";
import type ExerciseHistory from "../../../types/exerciseHistory";
import { LineChart } from "@mui/x-charts/LineChart";
import { chartDate } from "../../../utils/formatters";
import { deepPurple, indigo, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calculateMaxEstimatedPersonalRecord, calculateMaxWeight, calculateVolume, getChartHistoryPoints } from "../../../utils/charts";
import type ChartPoint from "../../../types/chartPoint";

type Props = {
  history: ExerciseHistory[]
}

export default function ExerciseCharts({ history }: Props) {
  const numOfDays = 14;
  const historyPoints: ChartPoint[] = getChartHistoryPoints(history, numOfDays);

  const dates = historyPoints.map(({ date }) => new Date(date));
  const maxWeight = historyPoints.map(({ value }) => value ? calculateMaxWeight(value) : null);
  const maxPersonalRecord = historyPoints.map(({ value }) => value ? calculateMaxEstimatedPersonalRecord(value) : null);
  const volume = historyPoints.map(({ value }) => value ? calculateVolume(value) : null);

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
          valueFormatter: (val) => val ? `${Math.round(val)} lbs` : null,
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
          valueFormatter: (val) => val ? `${Math.round(val)} lbs` : null,
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
          valueFormatter: (val) => val ? `${Math.round(val)} lbs` : null,
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