export function devConsole(...params: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...params);
  }
}