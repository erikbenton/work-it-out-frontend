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