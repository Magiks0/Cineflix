import React, { useState } from 'react';
import './Navbar.css';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
   
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <span className="logo-text">CinéFlix</span>
          </div>
          
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-links">
              <li className="nav-item">
                <a href="#" className="nav-link active">Accueil</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Films</a>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">
                  Catégories <i className="fas fa-chevron-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Comédie</a></li>
                  <li><a href="#">Drame</a></li>
                  <li><a href="#">Science Fiction</a></li>
                  <li><a href="#">Horreur</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Nouveautés</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">Ma Liste</a>
              </li>
            </ul>
          </div>
          
          <div className="navbar-actions">
          <SearchBar />
            <a href="#" className="icon-button">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </a>
            
            <div className="user-profile">
              <img src="https://via.placeholder.com/40" alt="Profile" className="profile-img" />
            </div>
            
            <button className="menu-toggle" onClick={toggleMenu}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;