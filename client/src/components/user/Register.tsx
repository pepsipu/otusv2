import React, { useState } from 'react';
import 'bootstrap-4-grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reaptcha from 'reaptcha';
import { recaptcha } from '../../config.json';

export default () => {
  const [verified, setVerified] = useState(false);
  return (
    <>
      <div className="centerField">
        <h1>register</h1>
        <small>please dont spam new accounts!</small>
        <br />
        <input placeholder="email" />
        <input placeholder="username" />
        <input placeholder="password" type="password" />
        <br />
        <Reaptcha sitekey={recaptcha} onVerify={() => setVerified(true)} />
        <br />
        <Link to="register">
          <motion.button
            whileHover={verified ? { scale: 1.1 } : {}}
            whileTap={verified ? { scale: 0.9 } : {}}
            style={{
              width: '200px',
              height: '45px',
              fontSize: '12pt',
              background: verified ? '#f05d5e' : '#2d2d2d',
            }}
          >
            submit »
          </motion.button>
        </Link>
      </div>
    </>
  );
};
