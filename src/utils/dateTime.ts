export interface DateTime {
  year: number,
  month: number,
  monthName: string,
  dayOfMonth: number,
  dayOfWeek: string,
  time: string
}

export function getDateTime(time?: string): DateTime {
  const date = new Date(time ?? 0);
  const month = date.getMonth() + 1;
  const monthName = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })

  return {
    year,
    month,
    monthName,
    dayOfMonth,
    dayOfWeek,
    time: time ?? '0'
  };
}