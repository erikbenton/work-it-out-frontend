import type UserStats from "../types/userStats";
import { baseUrl } from "../utils/config";
import { devConsole } from "../utils/debugLogger";

export async function getUserStats(numberOfDays: number): Promise<UserStats> {
  devConsole('fetching user stats', numberOfDays);
  const response = await fetch(`${baseUrl}/userStats/${numberOfDays}`);
  return (await response.json()) as UserStats;
}