import React from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export default (props: { paths: string[][] }) => {
  const { paths } = props;
  return (
    <div className="navBar row">
      {paths.map(([name, path]) => (
        <NavLink to={path} activeClassName="activeNav" style={{ textDecoration: 'none' }}>
          <div
            className="col-auto navElement"
          >
            {name}
          </div>
        </NavLink>
      ))}
    </div>
  );
};
