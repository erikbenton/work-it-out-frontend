export function msToDuration(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  // Helper to pad single-digit numbers with a leading zero
  const pad = (num: number) => num.toString().padStart(2, '0');

  // Format the components
  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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