import ExerciseHistoryItemSet from "../../exercises/components/ExerciseHistoryItemSet";
import ExerciseHistoryItemTitle from "../../exercises/components/ExerciseHistoryItemTitle";
import ExerciseHistoryItemStats from "../../exercises/components/ExerciseHistoryItemStats";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import React from "react";
import Box from "@mui/material/Box";
import { useExerciseHistory } from "../../../hooks/useExerciseHistory";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  exerciseId: number
}

export default function ActiveExerciseHistoryList({ exerciseId }: Props) {
  const { data: history, isLoading } = useExerciseHistory(exerciseId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={{ width: '100%' }}>
      {history?.map(group => (
        <Card sx={{ bgcolor: '#F5FBFF', py: 1, borderRadius: 4 }} key={`group-history-${group.completedExerciseGroupId}`}>
          <CardContent className="pb-0" sx={{ p: 0 }}>
            <ExerciseHistoryItemTitle group={group} />
            <Divider sx={{ opacity: 0.3 }} />
            {group.completedExerciseSets.map(set => (
              <React.Fragment key={`set-history-${set.id}`}>
                <ExerciseHistoryItemSet set={set} />
                <Divider sx={{ opacity: 0.3 }} />
              </React.Fragment>
            ))}
            <Box sx={{ pt: 1 }}>
              <ExerciseHistoryItemStats id={group.completedExerciseGroupId} completedSets={group.completedExerciseSets} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}