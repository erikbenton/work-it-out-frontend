import { useQuery } from "@tanstack/react-query";
import type SetTagOption from "../types/setTagOption";
import { getSetTagOptions } from "../requests/setTagOptions";

const queryKey = 'setTagOptions';

export default function useSetTypes() {
  const { data: setTags, isLoading, isError } = useQuery<SetTagOption[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 5, // 5 minutes,
    gcTime: 1000 * 60 * 60 * 24, // 1 day
    queryFn: getSetTagOptions
  });

  return {
    setTags,
    isLoading,
    isError
  };
}