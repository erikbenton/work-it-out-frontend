import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExerciseById, getExerciseHistoryById } from '../../requests/exercises';
import type Exercise from '../../types/exercise';
import ExerciseAboutTab from './components/ExerciseAboutTab';
import ExerciseHistoryTab from './components/ExerciseHistoryTab';
import type ExerciseHistory from '../../types/exerciseHistory';
import LoadingMessage from '../layout/LoadingMessage';

export default function ExerciseDetails() {
  const id = Number(useParams().id)
  const [activeTab, setActiveTab] = useState(0);
  const { data: exercise, isLoading: exerciseLoading } = useQuery<Exercise>({
    queryKey: ['exercise'],
    queryFn: () => getExerciseById(id)
  });
  const { data: history, isLoading: historyLoading } = useQuery<ExerciseHistory[]>({
    queryKey: ['exerciseHistory'],
    queryFn: () => getExerciseHistoryById(id)
  });

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  if (exerciseLoading || historyLoading) {
    return (<LoadingMessage dataName='exercise' />);
  }

  return (
    <Box className="relative w-full md:w-2/3 border-x border-blue-100 h-full" sx={{ bgcolor: 'background.paper' }}>
      <Typography variant="h4" component="h2" className='mb-2 text-center'>
        {exercise?.name}
      </Typography>
      <Tabs value={activeTab} onChange={handleChange} centered variant='fullWidth' className='mb-2' sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', opacity: 1 }}>
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
