import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-top">
                <div className="navbar-name">
                    <span>Asher Weitz Skateboard App</span>
                </div>
                <div className="navbar-links-external">
                    <a href="https://github.com/AsherW13" target="_blank" rel="noopener noreferrer"> 
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://www.linkedin.com/in/asher-weitz/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </div>
            <nav className="navbar-pages">
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
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

