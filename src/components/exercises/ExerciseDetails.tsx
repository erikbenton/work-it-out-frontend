import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExerciseAboutTab from './components/ExerciseAboutTab';
import ExerciseHistoryTab from './components/ExerciseHistoryTab';
import ExerciseDetailsTitle from './components/ExerciseDetailsTitle';
import { useExercises } from '../../hooks/useExercises';
import LoadingIcon from '../layout/LoadingIcon';
import ExerciseStats from './components/ExerciseStats';

export default function ExerciseDetails() {
  const id = Number(useParams().id)
  const [activeTab, setActiveTab] = useState(0);
  const { exercises } = useExercises();
  const [period, setPeriod] = useState(14);

  const handleChange = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  const exercise = exercises?.find(ex => ex.id === id);

  // TODO: No exercise, return Error message
  if (!exercise) {
    throw new Error(`No exercise was found with the id: ${id}`);
  }

  return (
    <Box className="relative w-full md:w-2/3 border-x border-blue-100 h-full" sx={{ mt: 1, bgcolor: 'background.paper' }}>
      <ExerciseDetailsTitle exercise={exercise} />
      <Tabs value={activeTab}
        onChange={handleChange}
        centered
        variant='fullWidth'
        sx={{ position: 'sticky', top: 0 }}
      >
        <Tab label="About" />
        <Tab label="History" />
        <Tab label="Stats" />
      </Tabs>
      {activeTab === 0 ? <ExerciseAboutTab exercise={exercise} />
        : activeTab === 1 ? (
          <Suspense fallback={<LoadingIcon label='Histories' />}>
            <ExerciseHistoryTab exerciseId={id} />
          </Suspense>)
          : <Suspense fallback={<LoadingIcon label='Histories' />}>
            <ExerciseStats exerciseId={id} period={period} setPeriod={setPeriod} />
          </Suspense>
      }
    </Box>
  );
}
