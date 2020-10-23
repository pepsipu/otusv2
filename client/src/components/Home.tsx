import React from 'react';
import 'bootstrap-4-grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactCookieProps } from 'react-cookie';
import OtusHorizontal from '../img/otus_engine_2.svg';

export default (props: ReactCookieProps) => {
  const { cookies } = props;
  const username = cookies?.get('username');
  return (
    <div className="centerField">
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
        <br />
        <h1>why otus?</h1>
        <p>
          otus allows you to make your own challenges and images to share with your friends. you can
          submit your challenges to be verified and worth points.
        </p>
      </div>
      <br />
      <Link to={username ? '404' : 'register'}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '200px',
            height: '45px',
            fontSize: '12pt',
          }}
        >
          {username ? 'lol ecks dee »' : 'register »'}
        </motion.button>
      </Link>
    </div>
  );
};
