import ExerciseHistoryItemSet from "../../exercises/components/ExerciseHistoryItemSet";
import ExerciseHistoryItemTitle from "../../exercises/components/ExerciseHistoryItemTitle";
import ExerciseHistoryItemStats from "../../exercises/components/ExerciseHistoryItemStats";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import React from "react";
import Box from "@mui/material/Box";
import type { CompletedExerciseSet } from "../../../types/completedExerciseSet";
import { useExerciseHistory } from "../../../hooks/useExerciseHistory";
import { bgBlue } from "../../../utils/styling";
import { useExercises } from "../../../hooks/useExercises";
import LoadingIcon from "../../layout/LoadingIcon";

type Props = {
  exerciseId: number,
  onDoubleClick: (completedSet: CompletedExerciseSet) => void,
  currentIndex?: number
}

export default function ActiveExerciseHistoryList({ exerciseId, onDoubleClick, currentIndex }: Props) {
  const { services: exerciseServices } = useExercises();
  const exercise = exerciseServices.getExerciseById(exerciseId);
  const { data: history, isLoading } = useExerciseHistory(exerciseId, exercise.category, 200);

  if (isLoading || !history) {
    return (<LoadingIcon />);
  }

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      {history.map(h => (
        <Card
          sx={{ bgcolor: bgBlue, py: 1, borderRadius: 4 }}
          key={`group-history-${h.group.id}`}
        >
          <CardContent className="pb-0" sx={{ p: 0 }}>
            <ExerciseHistoryItemTitle group={h.group} />
            <Divider sx={{ opacity: 0.3 }} />
            {h.group.completedExerciseSets.map((set, index) => (
              <React.Fragment key={`set-history-${set.id}`}>
                <ExerciseHistoryItemSet
                  set={set}
                  onDoubleClick={onDoubleClick}
                  isCurrent={currentIndex === index}
                  category={exercise.category}
                />
                <Divider sx={{ opacity: 0.3 }} />
              </React.Fragment>
            ))}
            <Box sx={{ pt: 1 }}>
              <ExerciseHistoryItemStats history={h} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}