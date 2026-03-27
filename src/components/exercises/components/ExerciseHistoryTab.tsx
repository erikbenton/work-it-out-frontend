import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ExerciseHistoryItemSet from './ExerciseHistoryItemSet';
import ExerciseHistoryItemTitle from './ExerciseHistoryItemTitle';
import ExerciseHistoryItemStats from './ExerciseHistoryItemStats';
import { useCompletedWorkouts } from '../../../hooks/useCompletedWorkouts';

type Props = {
  exerciseId: number
}

export default function ExerciseHistoryTab({ exerciseId }: Props) {
  const { services } = useCompletedWorkouts();
  const history = services.getCompletedGroupsByExerciseId(exerciseId);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {history.map(group => (
        <Box className="pb-1" key={`group-history-${group.id}`}>
          <ExerciseHistoryItemTitle group={group} />
          {group.completedExerciseSets.map(set => (
            <ExerciseHistoryItemSet key={`set-history-${set.id}`} set={set} />
          ))}
          <ExerciseHistoryItemStats id={group.id} completedSets={group.completedExerciseSets} />
        </Box>
      ))}
    </List>
  );
}