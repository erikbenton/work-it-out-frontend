import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import WorkoutList from './components/workouts/WorkoutList';
import { Box } from '@mui/material';
import ExerciseList from './components/exercises/ExerciseList';
import ExerciseDetails from './components/exercises/ExerciseDetails';

export default function App() {

  return (
    <Box className="flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<WorkoutList />} />
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/exercises/:id" element={<ExerciseDetails />} />
      </Routes>
    </Box>
  );
}
