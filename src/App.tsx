import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import WorkoutList from './components/workouts/WorkoutList';
import { Box } from '@mui/material';

export default function App() {

  return (
    <Box className="flex flex-col items-center">
      <Navbar />
      <Box className="w-full md:w-2/3 px-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutList />} />
        </Routes>
      </Box>
    </Box>
  );
}
