import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import FilterDialog from '../components/FilterDialog.jsx';
import '../styles/Navbar.css';

const Navbar = ({onFilter}) => {   
  const [showFilterDialog, setShowFilterDialog] = useState(false);
   
  return (
    <>
      {/* Header Section for logo and external links */}
      <header>
        <div className="navbar-top">
          <div className="navbar-name">
            <span>Asher Weitz Skateboard App</span>
          </div>
          <div className="navbar-links-external">
            <a
              href="https://github.com/AsherW13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/asher-weitz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </header>

      {/* Navbar Section for navigation links */}
      <nav className="navbar-links">
        <ul>
          <li>
            <Link to="/skateboarders">Skateboarders</Link>
          </li>
          <li>
            <Link to="/skateparks">Skateparks</Link>
          </li>
          <li>
            <Link to="/street-spots">Famous Street Spots</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/brands">Brands</Link>
          </li>
        </ul>

        <div className="filter-icon" onClick={() => {console.log('Filter icon clicked'); setShowFilterDialog(true)}}>
          <FontAwesomeIcon icon={faFilter} />
        </div>

      </nav>

      {showFilterDialog && (
        <FilterDialog
          onApplyFilter={onFilter}
          onClose={() => setShowFilterDialog(false)}
        />
      )}
    </>
  );
};
  
export default Navbar;

