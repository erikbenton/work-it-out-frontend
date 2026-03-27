import { useQuery } from "@tanstack/react-query";
import type SetTagOption from "../types/setTagOption";
import { getSetTagOptions } from "../requests/setTagOptions";
import cacheTimes from "../utils/cacheTimes";

const queryKey = 'setTagOptions';

export default function useSetTags() {
  const { data: setTags, isLoading, isError } = useQuery<SetTagOption[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week, // 7 days
    gcTime: cacheTimes.week * 2, // 14 days
    queryFn: getSetTagOptions
  });

  return {
    setTags,
    isLoading,
    isError
  };
}