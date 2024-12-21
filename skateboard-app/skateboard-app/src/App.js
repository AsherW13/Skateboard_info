import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Skateboarders from './pages/Skateboarders';
import StreetSpots from './pages/StreetSpots';
import Skateparks from './pages/Skateparks';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/skateboarders" element={<Skateboarders />} />
        <Route path="/street-spots" element={<StreetSpots />} />
        <Route path="/skateparks" element={<Skateparks />} />
        <Route path="/events" element={<Events />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;