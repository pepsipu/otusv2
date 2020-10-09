import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
// import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default () => (
  <div className="navBar row">
    <div className="col navElement">
      <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
    </div>
  </div>
);
