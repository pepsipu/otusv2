import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
// import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default () => {
  const color = 2;
  return (
    <div className="navBar row">
      <NavLink to="/home" activeClassName="activeNav" style={{ textDecoration: 'none' }}>
        <div className="col-auto navElement">home</div>
      </NavLink>
      <NavLink to="/profile" activeClassName="activeNav" style={{ textDecoration: 'none' }}>
        <div className="col-auto navElement">profile</div>
      </NavLink>
    </div>
  );
};
