export interface DateTime {
  date: Date,
  year: number,
  month: number,
  monthName: string,
  monthNameShort: string,
  dayOfMonth: number,
  dayOfWeek: string,
  time: string
}

export function getDateTime(time?: string): DateTime {
  const date = new Date(time ?? 0);
  const month = date.getMonth() + 1;
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const monthNameShort = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });

  return {
    date,
    year,
    month,
    monthName,
    monthNameShort,
    dayOfMonth,
    dayOfWeek,
    time: time ?? '0'
  };
}