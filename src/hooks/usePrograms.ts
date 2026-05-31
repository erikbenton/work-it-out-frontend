import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type WorkoutProgram from "../types/workoutProgram";
import cacheTimes from "../utils/cacheTimes";
import { createProgram, deleteProgram, getPrograms, updateProgram } from "../requests/programs";
import { devConsole } from "../utils/debugLogger";

const queryKey = 'programs';

export function usePrograms() {
  const queryClient = useQueryClient();
  const { data: programs, isError } = useSuspenseQuery<WorkoutProgram[]>({
    queryKey: [queryKey],
    staleTime: cacheTimes.week, // 7 days
    gcTime: cacheTimes.week * 2, // 14 days
    queryFn: getPrograms
  });

  const getProgramById = (id: number): WorkoutProgram => {
    const program = programs.find(p => p.id === id);
    if (!program) {
      throw new Error(`Unable to find program with id: ${id}.`);
    }
    return program;
  }

  const getProgramByIdUnsafe = (id: number): WorkoutProgram | undefined => {
    const program = programs.find(p => p.id === id);
    return program;
  }

  const create = useMutation({
    mutationFn: async (newProgram: WorkoutProgram) => createProgram(newProgram),
    onSuccess: (savedProgram: WorkoutProgram) => {
      try {
        const prevPrograms: WorkoutProgram[] = queryClient.getQueryData([queryKey]) as WorkoutProgram[];
        queryClient.setQueryData(
          [queryKey],
          (prevPrograms ?? [])
            .concat(savedProgram)
            .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")));
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const update = useMutation({
    mutationFn: async (editedProgram: WorkoutProgram) => updateProgram(editedProgram),
    onSuccess: (savedProgram: WorkoutProgram) => {
      try {
        const prevPrograms: WorkoutProgram[] = queryClient.getQueryData([queryKey]) as WorkoutProgram[];
        queryClient.setQueryData(
          [queryKey],
          prevPrograms?.map(p => p.id === savedProgram.id ? savedProgram : p) ?? [savedProgram]
        );
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  const remove = useMutation({
    mutationFn: async (programId: number) => deleteProgram(programId),
    onSuccess: (deletedId: number) => {
      try {
        const prevPrograms: WorkoutProgram[] = queryClient.getQueryData([queryKey]) as WorkoutProgram[];
        const program = prevPrograms.find(w => w.id === deletedId);
        queryClient.setQueryData([queryKey], prevPrograms.filter(ex => ex.id !== deletedId));
        if (program) {
          devConsole(`deleted program: ${deletedId}`)
        }
      } catch {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    }
  }).mutate;

  return {
    programs,
    isError,
    services: {
      getProgramById,
      getProgramByIdUnsafe,
      create,
      update,
      remove
    }
  }
}