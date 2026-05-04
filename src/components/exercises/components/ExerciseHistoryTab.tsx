import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ExerciseHistoryItemSet from './ExerciseHistoryItemSet';
import ExerciseHistoryItemTitle from './ExerciseHistoryItemTitle';
import ExerciseHistoryItemStats from './ExerciseHistoryItemStats';
import { useExerciseHistory } from '../../../hooks/useExerciseHistory';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

type Props = {
  exerciseId: number
}

const fullScreenStyle = {
  width: '100%',
  bgcolor: 'background.paper',
  pb: '10vh'
}

export default function ExerciseHistoryTab({ exerciseId }: Props) {
  const { data: history } = useExerciseHistory(exerciseId);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { height } = useWindowDimensions();

  const headerPixelsOffset = 160;

  const mobileScreenStyle = {
    ...fullScreenStyle,
    overflow: 'auto',
    position: 'relative',
    maxHeight: `${height - headerPixelsOffset}px`
  };

  if (history.length === 0) {
    return (
      <Box>
        <Typography>
          No data was found for this exercise in the time period.
        </Typography>
      </Box>
    );
  }

  return (
    <List
      sx={mobileScreen ? mobileScreenStyle : fullScreenStyle}
    >
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