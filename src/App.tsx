import './App.css';
import Navbar from './components/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';

export default function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
