import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import WorkoutList from './components/workouts/WorkoutList';
import { Box } from '@mui/material';
import ExerciseList from './components/exercises/ExerciseList';
import ExerciseDetails from './components/exercises/ExerciseDetails';
import WorkoutDetails from './components/workouts/WorkoutDetails';

export default function App() {

  return (
    <Box className="flex flex-col items-center h-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<WorkoutList />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/exercises/:id" element={<ExerciseDetails />} />
      </Routes>
    </Box>
  );
}
