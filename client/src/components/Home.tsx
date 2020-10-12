import React from 'react';
import 'bootstrap-4-grid';
import OtusHorizontal from '../img/otus_engine_2.svg';

export default () => (
  <div style={{
    display: 'flex', padding: '30px', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#f1f2eb', textAlign: 'left',
  }}
  >
    <img width="400px" src={OtusHorizontal} alt="horizontal otus engine logo" />
    <br />
    <div style={{ width: '600px' }}>
      <h1>what is otus?</h1>
      <p>
        otus is a
        {' '}
        <a href="https://en.wikipedia.org/wiki/Wargame_(hacking)">wargame</a>
        {' '}
        site by
        {' '}
        <a href="http://pepsipu.com">pepsipu</a>
        {' '}
        to play ctf challenges and practice linux cyberpatriot images on.
      </p>
    </div>

  </div>
);
