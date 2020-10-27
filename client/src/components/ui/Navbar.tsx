import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { ReactCookieProps } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import Gravatar from 'react-gravatar';

export default (props: { paths: string[][], userOptions: string[][] } & ReactCookieProps) => {
  const { paths, cookies, userOptions } = props;
  const username = cookies?.get('username');
  const email = cookies?.get('email');
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
        <Dropdown
          id="profile-dropdown"
        >
          {/* eslint-disable-next-line react/prop-types */}
          <Dropdown.Toggle as={React.forwardRef(({ onClick }: any, ref) => (
            <button
              style={{
                background: 'none',
                color: '#f1f2eb',
              }}
              type="button"
              ref={ref as any}
              onClick={(e) => {
                e.preventDefault();
                onClick(e);
              }}
            >
              <i className="fa fa-caret-down" aria-hidden="true" style={{ paddingRight: '7px' }} />
              {username}
            </button>
          ))}
          />
          <Dropdown.Menu className="profileDropdown container">
            <div className="row">
              <div className="col-auto">
                <Gravatar email={email} />
              </div>
              <div className="col-auto">
                {username}
                <br />
                <span style={{
                  color: '#d4af37',
                }}
                >
                  #1
                </span>
              </div>
            </div>
            <Dropdown.Divider />
            {userOptions.map(([name, path]) => (
              <Dropdown.Item className="dropdownItem">
                <NavLink key={name} to={path} style={{ textDecoration: 'none' }}>
                  <span className="dropdownItem">
                    {name}
                  </span>
                </NavLink>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

      </div>
      )}
    </div>
  );
};
