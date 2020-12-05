import React, { useRef } from 'react';
import './Challenges.css';
import { NavLink } from 'react-router-dom';
import Check from '../ui/Check';

// const getChallenges = async (): Promise<null> => {
//
// };

export default () => {
  // we can make these modular but im pretty lazy so for now keep as separate
  const onlyRanked = useRef(null);
  const onlyUnranked = useRef(null);

  const isPwn = useRef(null);
  const isCrypto = useRef(null);
  return (
    <div className="centerField">
      <h1>challenges</h1>
      <small>play official challenges here</small>
      <br />
      <div
        className="row w-75"
        style={{
          margin: '10px',
        }}
      >
        <div
          className="col mx-auto componentContainer"
          style={{
            textAlign: 'center',
          }}
        >
          <NavLink to="/create/challenge">
            <small>make your own challenge &#65291;</small>
          </NavLink>
        </div>
      </div>
      <div className="row w-75">
        <div
          className="col-auto mx-auto componentContainer"
          style={{
            margin: '10px',
            marginTop: '0',
          }}
        >
          <h5>filter</h5>
          <Check trueRef={onlyRanked}>ranked</Check>
          <Check trueRef={onlyUnranked}>unranked</Check>
          <hr style={{
            background: 'white',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          />
          <p style={{
            marginTop: '10px',
            marginBottom: '5px',
          }}
          >
            categories
          </p>
          <Check trueRef={isPwn}>pwn</Check>
          <Check trueRef={isCrypto}>crypto</Check>
        </div>
        <div
          className="col"
          style={{
            margin: '10px',
            marginTop: '0',
            marginRight: '0',
            padding: '0',
          }}
        >
          <div
            className="componentContainer"
          />
        </div>

      </div>
    </div>
  );
};
