import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { bgBlue } from '../../../utils/styling';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';
import type CompletedWorkout from '../../../types/completedWorkout';
import { devConsole } from '../../../utils/debugLogger';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import ScrollLock from '../../layout/ScrollLock';
import { getMaxMuscleGroup } from '../../../utils/muscles';
import { useExercises } from '../../../hooks/useExercises';

function ServerDay(props: PickerDayProps & { completedWorkoutsByDate?: Map<number, Map<number, CompletedWorkout[]>> }) {
  const navigate = useNavigate();
  const { services } = useExercises();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { completedWorkoutsByDate = new Map<number, Map<number, CompletedWorkout[]>>(), day, outsideCurrentMonth, ...other } = props;
  const highlightedDays = getWorkoutsByDate(props.day, completedWorkoutsByDate);

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays && highlightedDays.length > 0;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = (menuItem: { handleClick: () => void }) => {
    return () => {
      menuItem.handleClick();
      handleClose();
    };
  }

  const maxMuscle = isSelected
    ? getMaxMuscleGroup(highlightedDays[0].completedExerciseGroups, services)
    : null;

  const options = isSelected
    ? highlightedDays.map(w => ({
      label: `View ${w.name}`,
      handleClick: () => {
        handleClose();
        navigate(`/history/${w.id}`)
      },
      id: w.id
    }))
    : [];

  return (
    <>
      {open && <ScrollLock />}
      <Badge
        key={props.day.toString()}
        onClick={isSelected ? (e) => openMenu(e) : undefined}
        overlap="circular"
        badgeContent={isSelected ? highlightedDays.length : undefined}
        sx={{
          "& .MuiBadge-badge": {
            color: isSelected ? "white" : undefined,
            backgroundColor: isSelected ? maxMuscle?.colorRgb : undefined
          }
        }}
      >
        <PickerDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': props.day.format('YYYY/MM/DD'),
          },
          paper: {
            sx: { borderRadius: 5 }
          }
        }}
        disableScrollLock={true}
      >
        {options.map(item => (
          <MenuItem
            key={`${item.label}-${item.id}`}
            onClick={onClick(item)}
            id={`${item.id}`}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function calculateNumberOfWeeks(month: dayjs.Dayjs): number {
  const startOfMonth = month.startOf('month');
  const firstWeekOffset = startOfMonth.day();
  const numWeeks = Math.ceil((firstWeekOffset + month.daysInMonth()) / 7);
  return numWeeks;
}

function getWorkoutsByDate(date: dayjs.Dayjs, datesMap: Map<number, Map<number, CompletedWorkout[]>>): CompletedWorkout[] | null {
  const year = date.year();
  const month = date.month();
  const day = date.date();
  const yearEntry = datesMap.get(year);
  if (!yearEntry) return null;
  const monthEntry = yearEntry.get(month);
  if (!monthEntry) return null;
  return monthEntry.filter(w => {
    const workoutDay = dayjs(w.createdAt);
    return workoutDay.year() === year && workoutDay.month() === month && workoutDay.date() === day;
  });
}

export default function UserCalendar() {
  const { completedWorkouts } = useCompletedWorkouts();
  const [numWeeks, setNumWeeks] = useState(() => calculateNumberOfWeeks(dayjs()));

  const completedWorkoutsByDate = useMemo(() => {
    devConsole('running calendar memo');
    // Map<year, Map<month, workout>>
    const workoutDateMap = new Map<number, Map<number, CompletedWorkout[]>>();
    for (const workout of completedWorkouts) {
      const date = dayjs(workout.createdAt);
      const yearEntry = workoutDateMap.get(date.year());
      if (yearEntry) {
        const monthEntry = yearEntry.get(date.month());
        yearEntry.set(date.month(), monthEntry ? [...monthEntry, workout] : [workout]);
      } else {
        const newMap = new Map<number, CompletedWorkout[]>();
        newMap.set(date.month(), [workout]);
        workoutDateMap.set(date.year(), newMap);
      }
    }
    return workoutDateMap;
  }, [completedWorkouts]);

  const rowHeight = 44;
  const minWeeks = 4;
  const minWeeksHeight = 186;
  const slideTransition = minWeeksHeight + (numWeeks - minWeeks) * rowHeight;

  const handleMonthChange = (month: dayjs.Dayjs) => {
    setNumWeeks(calculateNumberOfWeeks(month));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h6" component="h3" width='100%' sx={{ px: 1 }}>
        History
      </Typography>
      <DateCalendar
        sx={{
          '&.MuiDateCalendar-root': {
            width: '100%',
            height: 'auto',
            maxHeight: 'none',
            borderRadius: '15px',
            backgroundColor: bgBlue,
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            '& .MuiDayCalendar-monthContainer': {
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              backgroundColor: bgBlue,
              boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
              borderRadius: '0 0 15px 15px',
            },
            '& .MuiPickersFadeTransitionGroup-root': {
              backgroundColor: 'white',
              boxShadow: 'none',
              borderRadius: '0 0 15px 15px',
            },
            '& .MuiPickersFadeTransitionGroup-root > div': {
              borderRadius: '0 0 15px 15px',
            },
            '& .MuiPickersFadeTransitionGroup-root > .MuiPickersCalendarHeader-label': {
              borderRadius: 0,
            },
            '& .MuiPickersCalendarHeader-labelContainer > .MuiPickersFadeTransitionGroup-root': {
              backgroundColor: bgBlue,
            },
            '& .MuiDayCalendar-header': {
              backgroundColor: bgBlue,
            },
            '& .MuiDayCalendar-root': {
              backgroundColor: bgBlue,
              borderRadius: '0 0 15px 15px',
            },
            '& .MuiPickersCalendarHeader-label': {
              backgroundColor: bgBlue,
            },
            '& .MuiDayCalendar-weekContainer': {
              marginBottom: '0.5rem'
            },
            '& .MuiDayCalendar-weekDayLabel': {
              fontSize: '1rem',
            },
            '& div[role="row"]': {
              justifyContent: 'space-around',
            },
            '& .MuiDayCalendar-slideTransition': {
              minHeight: `${slideTransition}px`,
              height: 'auto'
            },
            '& .MuiPickersDay-root': {
              fontSize: '1rem',
            },
            '& .MuiYearCalendar-root': {
              width: '100%',
              backgroundColor: bgBlue
            }
          },
        }}
        onMonthChange={handleMonthChange}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            sx: { fontSize: '1rem' },
            completedWorkoutsByDate,
          } as (PickerDayProps & { completedWorkoutsByDate?: Map<number, Map<number, CompletedWorkout[]>> }),
        }}
      />
    </LocalizationProvider>
  );
}