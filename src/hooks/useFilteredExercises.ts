import { useMemo, useState } from "react";
import { useExercises } from "./useExercises";
import type { ExerciseFilterConfig } from "../components/exercises/components/ExerciseListFilter";


export function useFilteredExercises() {
  const exerciseHook = useExercises();
  const { exercises } = exerciseHook;
  const [filter, setFilter] = useState<ExerciseFilterConfig>({});

  const filteredExercises = useMemo(() => {
    return exercises
      .filter(ex => {
        let keep = true;
        if (filter.name) {
          if (!ex.name) return false;
          keep = ex.name.toLocaleLowerCase().includes(filter.name?.toLocaleLowerCase());
        }

        if (keep && filter.categories && filter.categories.length) {
          keep = filter.categories.includes(ex.category);
        }

        if (keep && filter.muscles && filter.muscles.length) {
          if (!ex.muscles || !ex.muscles.length) return false;
          keep = ex.muscles.reduce((acc, curr) => acc || (filter.muscles?.includes(curr.name) ?? false), false);
        }

        if (keep && filter.equipment && filter.equipment.length) {
          if (!ex.equipment) return false;
          keep = filter.equipment.includes(ex.equipment);
        }
        return keep;
      });
  }, [exercises, filter]);

  return {
    ...exerciseHook,
    filteredExercises,
    filter,
    setFilter
  }
}