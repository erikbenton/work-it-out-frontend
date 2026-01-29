import List from '@mui/material/List';
import Box from '@mui/material/Box';
import type ExerciseHistory from '../../../types/exerciseHistory';
import ExerciseHistorySetItem from './ExerciseHistorySetItem';
import ExerciseHistoryItemTitle from './ExerciseHistoryItemTitle';
import ExerciseHistoryItemStats from './ExerciseHistoryItemStats';

type Props = {
  history: ExerciseHistory[] | undefined
}

export default function ExerciseHistoryTab({ history }: Props) {

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {history?.map(group => (
        <Box className="pb-1" key={`group-history-${group.completedExerciseGroupId}`}>
          <ExerciseHistoryItemTitle group={group} />
          {group.completedExerciseSets.map(set => (
            <ExerciseHistorySetItem key={`set-history-${set.id}`} set={set} />
          ))}
          <ExerciseHistoryItemStats group={group} />
        </Box>
      ))}
    </List>
  );
}