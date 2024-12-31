import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Skateboarders from './pages/Skateboarders';
import StreetSpots from './pages/StreetSpots';
import Skateparks from './pages/Skateparks';
import Events from './pages/Events';
import Brands from './pages/Brands';

function App() {

  const [filteredSkateparks, setFilteredSkateparks] = useState([]);

  const handleFilter = (filterData) => {
    setFilteredSkateparks(filterData);
  };

  return (
    <Router>
      <Navbar onFilter={handleFilter}/>
      <Routes>
        <Route path="/skateboarders" element={<Skateboarders />} />
        <Route path="/street-spots" element={<StreetSpots />} />
        <Route path="/skateparks" element={<Skateparks filteredSkateparks={filteredSkateparks} />} />
        <Route path="/events" element={<Events />} />
        <Route path="/brands" element={<Brands />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;