import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerDay, type PickerDayProps } from '@mui/x-date-pickers/PickerDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { bgBlue } from '../../../utils/styling';
import dayjs from 'dayjs';
import { devConsole } from '../../../utils/debugLogger';
import { useState } from 'react';

function ServerDay(props: PickerDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? 1 : undefined}
      sx={{
        "& .MuiBadge-badge": {
          color: isSelected ? "white" : undefined,
          backgroundColor: isSelected ? "green" : undefined
        }
      }}
    >
      <PickerDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function calculateNumberOfWeeks(month: dayjs.Dayjs): number {
  const startOfMonth = month.startOf('month');
  const firstWeekOffset = startOfMonth.day();
  const numWeeks = Math.ceil((firstWeekOffset + month.daysInMonth()) / 7);
  devConsole('calc weeks', numWeeks, month.format('MM/DD/YYYY'))
  return numWeeks;
}

export default function UserCalendar() {
  const highlightedDays = [8, 15, 27];
  const [numWeeks, setNumWeeks] = useState(() => calculateNumberOfWeeks(dayjs()))
  const slideTransition = 182 + (numWeeks - 4) * 44;

  const handleMonthChange = (month: dayjs.Dayjs) => {
    setNumWeeks(calculateNumberOfWeeks(month));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            highlightedDays,
          } as (PickerDayProps & { highlightedDays?: number[] }),
        }}
      />
    </LocalizationProvider>
  );
}