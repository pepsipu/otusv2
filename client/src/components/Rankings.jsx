import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWithErrors } from '../util/requests';
import Flag from './ui/Flag';
import './Rankings.css';

export default () => {
  const [rankings, setRankings] = useState([]);
  useEffect(() => {
    getWithErrors('/rankings/0').then(({ users }) => setRankings(users));
  }, [setRankings]);
  return (
    <div className="centerField">
      <h1>rankings</h1>
      <small>top players</small>
      <br />
      <div
        className="row w-50"
        style={{
          margin: '10px',
        }}
      >
        <div
          className="col mx-auto componentContainer"
          style={{
            padding: '15px',
          }}
        >
          {rankings.map((user, index) => (
            <div
              className="componentContainer ranking"
            >
              <b>
                #
                {index + 1}
              </b>
              <Flag country={user.country} />
              <Link
                to={`/profile/${user._id}/ctf`}
                style={{
                  fontSize: '15px',
                }}
              >
                {user.username}
              </Link>
              <div style={{
                textAlign: 'right',
                flexGrow: 100,
              }}
              >
                {user.ctf.pp}
                pp
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
