import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { ReactCookieProps } from 'react-cookie';

export default (props: { paths: string[][] } & ReactCookieProps) => {
  const { paths, cookies } = props;
  const username = cookies?.get('username');
  return (
    <div className="navBar row">
      {paths.map(([name, path]) => (
        <NavLink key={name} to={path} activeClassName="activeNav" style={{ textDecoration: 'none' }}>
          <div
            className="col-auto navElement navLink"
          >
            {name}
          </div>
        </NavLink>
      ))}
      <div className="col" style={{ borderBottom: 'none' }} />
      {username && (
      <div
        className="col-auto navElement"
        style={{
          borderBottom: 'none',
        }}
      >
        <i className="fa fa-caret-down" aria-hidden="true" style={{ paddingRight: '7px' }} />
        {username}
      </div>
      )}
    </div>
  );
};
