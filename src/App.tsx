import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WorkoutList from './components/workouts/WorkoutList';
import { Box } from '@mui/material';
import ExerciseList from './components/exercises/ExerciseList';
import ExerciseDetails from './components/exercises/ExerciseDetails';
import WorkoutDetails from './components/workouts/WorkoutDetails';
import ExerciseCreate from './components/exercises/ExerciseCreate';
import ExerciseEdit from './components/exercises/ExerciseEdit';
import { Suspense } from 'react';
import WorkoutCreate from './components/workouts/WorkoutCreate';
import ActiveWorkoutGroup from './components/activeWorkout/ActiveWorkoutGroup';
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from './components/layout/ErrorMessage';
import ActiveWorkoutSummary from './components/activeWorkout/ActiveWorkoutSummary';
import CompletedWorkoutList from './components/completedWorkouts/CompletedWorkoutList';
import CompletedWorkoutDetails from './components/completedWorkouts/CompletedWorkoutDetails';
import HomePage from './components/home/HomePage';
import { QueryErrorResetBoundary, useQueryClient, type QueryErrorResetFunction } from '@tanstack/react-query';
import LoadingIcon from './components/layout/LoadingIcon';

export default function App() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleReset = (reset: QueryErrorResetFunction) => {
    reset();
    queryClient.cancelQueries();
    navigate('/');
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '64px'
      }}
    >
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorMessage} onReset={() => { handleReset(reset) }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/workouts" element={
                <Suspense fallback={<LoadingIcon label='Workouts' />}>
                  <WorkoutList />
                </Suspense>
              } />
              <Route path="/workouts/create" element={
                <Suspense fallback={<LoadingIcon label='Workout' />}>
                  <WorkoutCreate />
                </Suspense>
              } />
              <Route path="/workouts/:id" element={
                <Suspense fallback={<LoadingIcon label='Workout' />}>
                  <WorkoutDetails />
                </Suspense>
              } />
              <Route path="/exercises" element={
                <Suspense fallback={<LoadingIcon label='Exercises' />}>
                  <ExerciseList />
                </Suspense>
              } />
              <Route path="/exercises/create" element={<ExerciseCreate />} />
              <Route path="/exercises/:id" element={
                <Suspense fallback={<LoadingIcon label='Exercise' />}>
                  <ExerciseDetails />
                </Suspense>
              } />
              <Route path="/exercises/:id/edit" element={
                <Suspense fallback={<LoadingIcon label='Exercise' />}>
                  <ExerciseEdit />
                </Suspense>
              } />
              <Route path="/activeWorkout" element={
                <Suspense fallback={<LoadingIcon label='Workouts' />}>
                  <ActiveWorkoutSummary />
                </Suspense>
              } />
              <Route path="/activeWorkout/:key" element={
                <Suspense fallback={<LoadingIcon label='Exercise' />}>
                  <ActiveWorkoutGroup />
                </Suspense>
              } />
              <Route path="/completedWorkouts" element={
                <Suspense fallback={<LoadingIcon label='Workout Histories' />}>
                  <CompletedWorkoutList />
                </Suspense>
              } />
              <Route path="/completedWorkouts/:id" element={
                <Suspense fallback={<LoadingIcon label='Workout History' />}>
                  <CompletedWorkoutDetails />
                </Suspense>
              } />
            </Routes>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
}
