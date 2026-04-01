import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { chartDate } from "../../../utils/formatters";
import { deepPurple, indigo, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calculateEstimatedOneRepMax, calculateMaxWeight, calculateVolume, getChartHistoryPoints } from "../../../utils/charts";
import type ChartPoint from "../../../types/chartPoint";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { numberOfDaysKeys } from "../../../hooks/useUserStats";

type Props = {
  history: CompletedExerciseGroup[],
  period: number,
  setPeriod: React.Dispatch<React.SetStateAction<number>>
}

export default function ExerciseCharts({ history, period, setPeriod }: Props) {

  const historyPoints: ChartPoint[] = getChartHistoryPoints(history, period);

  const dates = historyPoints.map(({ date }) => new Date(date));
  const maxWeight = historyPoints.map(({ value }) => value ? calculateMaxWeight(value) : null);
  const oneRepMax = historyPoints.map(({ value }) => value ? calculateEstimatedOneRepMax(value) : null);
  const volume = historyPoints.map(({ value }) => value ? calculateVolume(value) : null);

  if (dates.length === 0) {
    return (
      <Box>
        <Typography>
          No data was found for this exercise in the time period.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <ExerciseChartPeriodInput
        period={period}
        setPeriod={setPeriod}
      />
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
            data: oneRepMax,
            color: red[700],
            area: true,
            baseline: 'min',
            label: 'Est. 1RM (lbs)',
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
    </>
  );
}
type PeriodProps = {
  period: number,
  setPeriod: React.Dispatch<React.SetStateAction<number>>
}

function ExerciseChartPeriodInput({ period, setPeriod }: PeriodProps) {

  const handleChange = (event: SelectChangeEvent<number>) => {
    setPeriod(event.target.value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        px: 2,
        mt: 3
      }}
    >
      <FormControl>
        <InputLabel id="exercise-chart-period-label">Period</InputLabel>
        <Select
          size="small"
          labelId="exercise-chart-period-label"
          id="exercise-chart-period"
          value={period}
          label="Period"
          onChange={handleChange}
          sx={{ borderRadius: 5 }}
          MenuProps={{ slotProps: { paper: { sx: { borderRadius: 5 } } } }}
        >
          {numberOfDaysKeys.map(option => (
            <MenuItem
              key={option.numberOfDays}
              value={option.numberOfDays}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}