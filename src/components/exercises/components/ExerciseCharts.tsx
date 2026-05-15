import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import { chartDate, secondsToHhMmDd } from "../../../utils/formatters";
import { deepPurple, indigo, pink, red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { calculateBestPace, calculateEstimatedOneRepMax, calculateMaxWeight, calculateTotalDistance, calculateTotalReps, calculateTotalSeconds, calculateTotalStretchSeconds, calculateVolume, getChartHistoryPoints } from "../../../utils/charts";
import type ChartPoint from "../../../types/chartPoint";
import type { CompletedExerciseGroup } from "../../../types/completedExerciseGroup";
import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent, useTheme, useMediaQuery } from "@mui/material";
import { numberOfDaysKeys } from "../../../hooks/useUserStats";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useExercises } from "../../../hooks/useExercises";
import { devConsole } from "../../../utils/debugLogger";
import type { ExerciseCategory } from "../../../types/exerciseCategory";

type Props = {
  history: CompletedExerciseGroup[],
  period: number,
  setPeriod: React.Dispatch<React.SetStateAction<number>>
}

const fullScreenStyle = {
  width: '100%',
  pb: '10vh',
  bgcolor: 'background.paper',
}

function getChart(category: ExerciseCategory, historyPoints: ChartPoint[]) {
  switch (category) {
    case 'lift': {
      return (<LiftExerciseCharts historyPoints={historyPoints} />)
    }

    case 'timed': {
      return (<TimedExerciseCharts historyPoints={historyPoints} />)
    }

    case 'conditioning':
    case 'stretch': {
      return (<StretchExerciseCharts historyPoints={historyPoints} />)
    }

    default: {
      return (<>{`No charts were found for exercise category ${category}`}</>)
    }
  }
}

export default function ExerciseCharts({ history, period, setPeriod }: Props) {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { height } = useWindowDimensions();
  const { services: exerciseServices } = useExercises();
  const exercise = exerciseServices.getExerciseById(history[0].exerciseId)

  devConsole('category id', exercise.category)

  const headerPixelsOffset = 252.02;

  const mobileScreenStyle = {
    ...fullScreenStyle,
    overflow: 'auto',
    position: 'relative',
    maxHeight: `${height - headerPixelsOffset}px`
  };

  const historyPoints: ChartPoint[] = getChartHistoryPoints(history, period);

  return (
    <Box sx={mobileScreen ? mobileScreenStyle : fullScreenStyle}>
      <ExerciseChartPeriodInput
        period={period}
        setPeriod={setPeriod}
      />
      {getChart(exercise.category, historyPoints)}
    </Box>
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
          MenuProps={{
            slotProps: {
              paper: { sx: { borderRadius: 5 } },
              list: { disablePadding: true }
            }
          }}
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

type ChartProps = {
  historyPoints: ChartPoint[]
}

function LiftExerciseCharts({ historyPoints }: ChartProps) {
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
          color: pink[700],
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
  );
}

function TimedExerciseCharts({ historyPoints }: ChartProps) {
  const dates = historyPoints.map(({ date }) => new Date(date));
  const totalDistance = historyPoints.map(({ value }) => value ? calculateTotalDistance(value) : null);
  const totalSeconds = historyPoints.map(({ value }) => value ? calculateTotalSeconds(value) : null);
  const bestPaceSeconds = historyPoints.map(({ value }) => value ? calculateBestPace(value) : null);

  if (dates.length === 0) {
    return (
      <Box>
        <Typography>
          No data was found for this exercise in the time period.
        </Typography>
      </Box>
    );
  }

  devConsole('dates', dates)

  return (
    <Stack spacing={2} sx={{ pb: 5 }}>
      <LineChart
        series={[{
          data: totalDistance,
          color: indigo[700],
          area: true,
          baseline: 'min',
          label: 'Total Distance (mi)',
          valueFormatter: (val) => val ? `${val.toFixed(2)} mi` : null,
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
          data: totalSeconds,
          color: red[700],
          area: true,
          baseline: 'min',
          label: 'Total Duration',
          valueFormatter: (val) => val ? secondsToHhMmDd(val, 'short') : null,
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
          data: bestPaceSeconds,
          color: deepPurple[700],
          area: true,
          baseline: 'min',
          label: 'Fastest Pace',
          valueFormatter: (val) => val ? `${secondsToHhMmDd(val)} / mi` : null,
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

function StretchExerciseCharts({ historyPoints }: ChartProps) {
  const dates = historyPoints.map(({ date }) => new Date(date));
  const totalReps = historyPoints.map(({ value }) => value ? calculateTotalReps(value) : null);
  const totalSeconds = historyPoints.map(({ value }) => value ? calculateTotalStretchSeconds(value) : null);

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
    <Stack spacing={2} sx={{ pb: 5 }}>
      <LineChart
        series={[{
          data: totalReps,
          color: indigo[700],
          area: true,
          baseline: 'min',
          label: 'Total Reps',
          valueFormatter: (val) => val ? `${val}` : null,
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
          data: totalSeconds,
          color: red[700],
          area: true,
          baseline: 'min',
          label: 'Total Duration',
          valueFormatter: (val) => val ? secondsToHhMmDd(val, 'short') : null,
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