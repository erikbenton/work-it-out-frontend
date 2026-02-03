import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import WorkoutList from './components/workouts/WorkoutList';
import { Box } from '@mui/material';
import ExerciseList from './components/exercises/ExerciseList';
import ExerciseDetails from './components/exercises/ExerciseDetails';
import WorkoutDetails from './components/workouts/WorkoutDetails';
import ExerciseCreate from './components/exercises/ExerciseCreate';
import ExerciseEdit from './components/exercises/ExerciseEdit';
import { Suspense } from 'react';
import LoadingMessage from './components/layout/LoadingMessage';

export default function App() {

  return (
    <Box className="flex flex-col items-center h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={
          <Suspense fallback={<LoadingMessage dataName='workouts' />}>
            <WorkoutList />
          </Suspense>
        } />
        <Route path="/workouts/:id" element={
          <Suspense fallback={<LoadingMessage dataName='workout' />}>
            <WorkoutDetails />
          </Suspense>
        } />
        <Route path="/exercises" element={
          <Suspense fallback={<LoadingMessage dataName='exercises' />}>
            <ExerciseList />
          </Suspense>
        } />
        <Route path="/exercises/create" element={<ExerciseCreate />} />
        <Route path="/exercises/:id" element={
          <Suspense fallback={<LoadingMessage dataName='exercise' />}>
            <ExerciseDetails />
          </Suspense>
        } />
        <Route path="/exercises/:id/edit" element={
          <Suspense fallback={<LoadingMessage dataName='exercise' />}>
            <ExerciseEdit />
          </Suspense>
        } />
        {/* <Route path='/componentDemo' element={<></>} /> */}
      </Routes>
    </Box>
  );
}
