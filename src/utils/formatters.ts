type DurationOptions = {
  format: ('always-hours' | 'no-hours' | 'include-hours')
}

export function msToDuration(ms: number, options?: DurationOptions): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  // Helper to pad single-digit numbers with a leading zero
  const pad = (num: number) => num.toString().padStart(2, '0');

  // Format the components
  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  if (options) {
    if (options.format === 'no-hours') {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
    if (options.format === 'include-hours') {
      return hours > 0
        ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        : `${formattedMinutes}:${formattedSeconds}`;
    }
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function secondsToDuration(seconds: number): string {
  return msToDuration(seconds * 1000);
}

export function durationToSeconds(duration: string): number {
  const [hours, minutes, seconds] = duration.split(':');
  return (Number(hours) * 60 * 60) + (Number(minutes) * 60) + Number(seconds);
}

export function checkPluralization(word: string, amount: number | undefined): string {
  return (amount ?? 0) === 1 ? word : word + 's';
}

export function capitalize(word: string): string {
  const letters = word.split('')
  letters[0] = letters[0].toUpperCase();
  return letters.join('');
}

export function getShortDate(date?: string): string {
  return new Date(date ?? '')
    .toLocaleDateString(
      'en-US',
      { year: "2-digit", month: "2-digit", day: "2-digit" }
    );
}

export function chartDate(date: Date): string {
  return date.toLocaleString('en-US', { month: '2-digit', day: '2-digit' });
}

export function daysSince(year: number, month: number, day: number): number {
  const pastDate = new Date(year, month - 1, day);
  const now = new Date();
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}