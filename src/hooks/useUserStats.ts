import { useSuspenseQuery } from "@tanstack/react-query";
import type UserStats from "../types/userStats";
import { getUserStats } from "../requests/userStats";

const queryKey = "userStats";

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