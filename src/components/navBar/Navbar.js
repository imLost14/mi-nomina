import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Nav = () => {
  const [abierto, setAbierto ] = useState(false);

  const toggleMenu = () => {
    setAbierto(!abierto);
  }

  return (
      <div className="nav">
        {/* Boton hamburguesa */}
        <button className="navbar-toggler" type='button' onClick={toggleMenu} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">&#9776;</span>
        </button>
        <nav className={`navbar ${abierto ? 'open' : ''}`}>
          {/* Menu de navegacion */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="mt-2 mb-2 nav-link"><li className="fa fa-home"></li></Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="mt-2 mb-2 nav-link"><i className="fa fa-plus"></i></Link>
              </li>
              <li className="nav-item">
                <Link to="/show" className="mt-2 mb-2 nav-link"><i className="fa fa-list"></i></Link>
              </li>
            </ul>
        </nav>
      </div>
  )
}

export default Nav
