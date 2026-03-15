import { useQuery } from "@tanstack/react-query";
import type SetTagOption from "../types/setTagOption";
import { getSetTagOptions } from "../requests/setTagOptions";

const queryKey = 'setTagOptions';

export default function useSetTags() {
  const { data: setTags, isLoading, isError } = useQuery<SetTagOption[]>({
    queryKey: [queryKey],
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    gcTime: 1000 * 60 * 60 * 24 * 14, // 14 days
    queryFn: getSetTagOptions
  });

  return {
    setTags,
    isLoading,
    isError
  };
}