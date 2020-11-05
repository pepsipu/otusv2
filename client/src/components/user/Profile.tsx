import React from 'react';
import { NavLink } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { withCookies } from 'react-cookie';

export default withCookies((props) => {
  const { cookies } = props;
  return (
    <>
      <div className="centerField">
        <div
          className="w-75 componentContainer"
          style={{
            padding: 0,
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              background: '#1f1f1f',
              margin: 0,
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              textAlign: 'right',
              padding: '4px 4px 4px 4px',
            }}
          >
            <NavLink
              className="category"
              activeClassName="activeCategory"
              to="/profile/ctf"
            >
              ctf
            </NavLink>
            {' '}
            <NavLink
              className="category"
              activeClassName="activeCategory"
              to="/profile/cypat"
            >
              cyberpatriot
            </NavLink>
          </div>
          <div style={{
            padding: '10px',
          }}
          >
            <Gravatar />
          </div>
        </div>
      </div>
    </>
  );
});
