import List from '@mui/material/List';
import type ExerciseHistory from '../../../types/exerciseHistory';
import React from 'react';
import ExerciseHistorySetItem from './ExerciseHistorySetItem';
import ExerciseHistoryItemTitle from './ExerciseHistoryItemTitle';
import ExerciseHistoryItemStats from './ExerciseHistoryItemStats';

type Props = {
  history: ExerciseHistory[] | undefined
}

export default function ExerciseHistoryTab({ history }: Props) {

  console.log(history);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {history?.map(group => (
        <React.Fragment key={`group-history-${group.completedExerciseGroupId}`}>
          <ExerciseHistoryItemTitle group={group} />
          {group.completedExerciseSets.map(set => (
            <ExerciseHistorySetItem key={`set-history-${set.id}`} set={set} />
          ))}
          <ExerciseHistoryItemStats group={group} />
        </React.Fragment>
      ))}
    </List>
  );
}