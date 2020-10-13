import React, { useRef, useState } from 'react';
import 'bootstrap-4-grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reaptcha from 'reaptcha';
import { recaptcha } from '../../config.json';

// idk why by ref is defined as { current: null } for some reason
type Ref = { current: any };

export default () => {
  const [, forceUpdate] = useState();
  const [verified, setVerified] = useState(false);
  const emailInput: Ref = useRef(null);
  const usernameInput: Ref = useRef(null);
  const passwordInput: Ref = useRef(null);
  // const fieldsFilled = [emailInput, usernameInput, passwordInput].map((i) => i.current?.value).every((v) => v)
  const filled = emailInput.current?.value && usernameInput.current?.value && passwordInput.current?.value && verified;
  return (
    <>
      <div className="centerField">
        <h1>register</h1>
        <small>please dont spam new accounts!</small>
        <br />
        <input placeholder="email" ref={emailInput} onInput={forceUpdate} />
        <input placeholder="username" ref={usernameInput} onInput={forceUpdate} />
        <input placeholder="password" type="password" ref={passwordInput} onInput={forceUpdate} />
        <br />
        <Reaptcha sitekey={recaptcha} onVerify={() => setVerified(true)} theme="dark" />
        <br />
        <Link to="register">
          <motion.button
            whileHover={filled ? { scale: 1.1 } : {}}
            whileTap={filled ? { scale: 0.9 } : {}}
            style={{
              width: '200px',
              height: '45px',
              fontSize: '12pt',
              background: filled ? '#f05d5e' : '#2d2d2d',
            }}
          >
            submit »
          </motion.button>
        </Link>
      </div>
    </>
  );
};
