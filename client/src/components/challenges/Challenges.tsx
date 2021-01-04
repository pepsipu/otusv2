import React, { useEffect, useRef, useState } from 'react';
import './Challenges.css';
import { NavLink } from 'react-router-dom';
import Check from '../ui/Check';
import { getWithErrors } from '../../util/requests';
import { Challenge, IChallenge } from './Challenge';

// const getChallenges = async (): Promise<null> => ;

export default () => {
  // we can make these modular but im pretty lazy so for now keep as separate
  const onlyRanked = useRef(null);
  const onlyUnranked = useRef(null);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    getWithErrors('/challenge/get').then(({ challenges: fetchedChallenges }) => setChallenges(fetchedChallenges));
  }, [setChallenges]);

  console.log(challenges);
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
          {challenges?.map((challenge: IChallenge) => (
            <div
              key={challenge.name}
              className="componentContainerRound"
              style={{
                padding: '20px',
                borderRadius: '3px',
              }}
            >
              <Challenge
                {...challenge}
              />
            </div>
          )) || (
          <div
            className="componentContainer"
          >
            no challenges!
          </div>
          )}
        </div>

      </div>
    </div>
  );
};
