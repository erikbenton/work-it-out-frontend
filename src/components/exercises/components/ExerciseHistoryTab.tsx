import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ExerciseHistoryItemSet from './ExerciseHistoryItemSet';
import ExerciseHistoryItemTitle from './ExerciseHistoryItemTitle';
import ExerciseHistoryItemStats from './ExerciseHistoryItemStats';
import CircularProgress from '@mui/material/CircularProgress';
import type ExerciseHistory from '../../../types/exerciseHistory';

type Props = {
  history?: ExerciseHistory[],
  isLoading: boolean
}

export default function ExerciseHistoryTab({ history, isLoading }: Props) {

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {history?.map(group => (
        <Box className="pb-1" key={`group-history-${group.completedExerciseGroupId}`}>
          <ExerciseHistoryItemTitle group={group} />
          {group.completedExerciseSets.map(set => (
            <ExerciseHistoryItemSet key={`set-history-${set.id}`} set={set} />
          ))}
          <ExerciseHistoryItemStats id={group.completedExerciseGroupId} completedSets={group.completedExerciseSets} />
        </Box>
      ))}
    </List>
  );
}