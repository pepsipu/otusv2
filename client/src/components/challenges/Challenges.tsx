import React, { useRef } from 'react';
import './Challenges.css';
import Check from '../ui/Check';

// const getChallenges = async (): Promise<null> => {
//
// };

export default () => {
  const onlyRanked = useRef(null);
  const onlyUnranked = useRef(null);

  const isPwn = useRef(null);
  const isCrypto = useRef(null);
  return (
    <>
      <div className="centerField">
        <h1>challenges</h1>
        <div className="row w-75">
          <div className="col-auto mx-auto componentContainer">
            <h5>filter</h5>
            <Check ref={onlyRanked}>ranked</Check>
            <Check ref={onlyUnranked}>unranked</Check>
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
            <Check ref={isPwn}>pwn</Check>
            <Check ref={isCrypto}>crypto</Check>
          </div>
          <div className="col componentContainer" />
        </div>
      </div>
    </>
  );
};
