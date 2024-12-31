import React, { useState } from 'react';
import '../styles/Filter.css';

const FilterDialog = ({ onApplyFilter, onClose }) => {
    const [location, setLocation] = useState('');
    const [featuresKeyword, setfeaturesKeyword] = useState('');
    const [rating, setRating] = useState('');
  
    const applyFilter = () => {
        const filterData = { location, featuresKeyword, rating };
        onApplyFilter(filterData);
        onClose();
    };
  
    return (
      <div className="filter-dialog">
        <h3>Filter Skateparks</h3>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </label>
        <label>
          Features:
          <input
            type="text"
            checked={featuresKeyword}
            onChange={(e) => setfeaturesKeyword(e.target.value)}
            placeholder="Enter keyword in features"
          />
        </label>
        <label>
          Minimum Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter minimum rating"
            min="1"
            max="5"
          />
        </label>
        <button onClick={applyFilter}>Apply</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };
  
  export default FilterDialog;