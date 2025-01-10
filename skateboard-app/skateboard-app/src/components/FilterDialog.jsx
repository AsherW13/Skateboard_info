import React, { useState } from 'react';
import '../styles/Filter.css';

const FilterDialog = ({ onApplyFilter, onClose }) => {
    const [location, setLocation] = useState('');
    const [featuresKeyword, setfeaturesKeyword] = useState('');
    const [rating, setRating] = useState('');
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
    const applyFilter = () => {
        const filterData = { location, featuresKeyword, rating };
        onApplyFilter(filterData);
        onClose();
    };

    const mouseDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const mouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const mouseUp = (e) => {
      setIsDragging(false);
    }
  
    return (
      <div
        className="filter-dialog"
        style={{
          position: 'absolute',
          top: `${position.y}px`,
          left: `${position.x}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseLeave={mouseUp} 
        onMouseDown={mouseDown}
      >
        <div
          className="filter-dialog-header"
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
          style={{ cursor: 'grab', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '5px 5px 0 0' }}
        >
          <h3 style={{ margin: 0 }}>Filter Skateparks</h3>
        </div>
        <div className="filter-dialog-content">
          <label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </label>
          <label>
            <input
              type="text"
              value={featuresKeyword}
              onChange={(e) => setfeaturesKeyword(e.target.value)}
              placeholder="Enter keyword in features"
            />
          </label>
          <label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter minimum rating"
              min="1"
              max="5"
            />
          </label>
          <button id="apply-button"onClick={applyFilter}>Apply</button>
          <button id="cancel-button"onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };  
  
  export default FilterDialog;