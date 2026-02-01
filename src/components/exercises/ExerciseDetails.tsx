import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExerciseHistoryById } from '../../requests/exercises';
import ExerciseAboutTab from './components/ExerciseAboutTab';
import ExerciseHistoryTab from './components/ExerciseHistoryTab';
import type ExerciseHistory from '../../types/exerciseHistory';
import LoadingMessage from '../layout/LoadingMessage';
import ExerciseDetailsTitle from './components/ExerciseDetailsTitle';
import { useExercises } from '../../hooks/useExercises';

export default function ExerciseDetails() {
  const id = Number(useParams().id)
  const [activeTab, setActiveTab] = useState(0);
  const { exercises, isLoading: exercisesLoading } = useExercises();
  const { data: history, isLoading: historyLoading } = useQuery<ExerciseHistory[]>({
    queryKey: ['exerciseHistory', id],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: async () => await getExerciseHistoryById(id)
  });

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  if (exercisesLoading || historyLoading ) {
    return (<LoadingMessage dataName='exercise' />);
  }

  const exercise = exercises?.find(ex => ex.id === id);

  // TODO: No exercise, return Error message

  return (
    <Box className="relative w-full md:w-2/3 border-x border-blue-100 h-full" sx={{ bgcolor: 'background.paper' }}>
      <ExerciseDetailsTitle exerciseName={exercise?.name ?? ""} />
      <Tabs value={activeTab}
        onChange={handleChange}
        centered
        variant='fullWidth'
        sx={{ position: 'sticky', top: 0, mb: 2 }}
      >
        <Tab label="About" />
        <Tab label="History" />
        <Tab label="Charts" />
      </Tabs>
      {activeTab === 0 ? <ExerciseAboutTab exercise={exercise} />
        : activeTab === 1 ? <ExerciseHistoryTab history={history} />
          : <></>
      }
    </Box>
  );
}
