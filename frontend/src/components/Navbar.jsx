import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery('');
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          NASA Explorer
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="nav-center-group">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search NASA Images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")} onClick={closeMobileMenu} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/apod" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")} onClick={closeMobileMenu}>
                Picture of the Day
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mars-rover" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")} onClick={closeMobileMenu}>
                Mars Rover
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/earth" className={({ isActive }) => "nav-links" + (isActive ? " active" : "")} onClick={closeMobileMenu}>
                Earth
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 