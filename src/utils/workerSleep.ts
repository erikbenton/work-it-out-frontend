import { devConsole } from "./debugLogger";

export function sleep(ms: number) {
  devConsole('slept for', ms, 'ms');
  return new Promise(resolve => setTimeout(resolve, ms));
}