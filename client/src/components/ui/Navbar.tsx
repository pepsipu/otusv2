import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
// import { motion } from 'framer-motion';
import OtusLogo2 from '../../img/otus_engine_2.svg';

export default () => (
  <div className="navBar">
    <img src={OtusLogo2} alt="Otus Logo" height="35px" />
  </div>
);
