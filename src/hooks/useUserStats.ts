import { useSuspenseQuery } from "@tanstack/react-query";
import type UserStats from "../types/userStats";
import { getUserStats } from "../requests/userStats";

export const queryKey = "userStats";

export const numberOfDaysKeys = [7, 14, 28];

export default function useUserStats(numberOfDays: number) {
  const { data: userStats, isError } = useSuspenseQuery<UserStats>({
    queryKey: [queryKey, numberOfDays],
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    queryFn: async () => getUserStats(numberOfDays)
  });

  return {
    userStats,
    isError
  }
}