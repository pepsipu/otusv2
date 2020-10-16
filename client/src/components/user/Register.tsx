import React, { useRef, useState } from 'react';
import 'bootstrap-4-grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Reaptcha from 'reaptcha';
import { recaptcha, apiEndpoint } from '../../config.json';

// idk why by ref is defined as { current: null } for some reason
type Ref = { current: any };

enum RegisterStatus {
  Success,
  Unhandled,
}

const register = async (email: string, user: string, password: string, captcha: string): Promise<RegisterStatus> => {
  const response = await axios.post(`${apiEndpoint}/user/register`, {
    email,
    user,
    password,
    captcha,
  });
  console.log(response);
  switch (response.status) {
    case 200:
      return RegisterStatus.Success;
    default:
      return RegisterStatus.Unhandled;
  }
};

export default () => {
  const [, forceUpdate] = useState();
  const [captcha, setCaptcha] = useState('');
  const emailInput: Ref = useRef(null);
  const usernameInput: Ref = useRef(null);
  const passwordInput: Ref = useRef(null);
  // const fieldsFilled = [emailInput, usernameInput, passwordInput].map((i) => i.current?.value).every((v) => v)
  const filled = emailInput.current?.value && usernameInput.current?.value && passwordInput.current?.value && captcha;
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
        <Reaptcha
          sitekey={recaptcha || '6LeOYtYZAAAAAJV_ayxNSH6WgcH_XJS3bOHe7aNc'}
          onVerify={(token) => setCaptcha(token)}
          onExpire={() => setCaptcha('')}
          theme="dark"
        />
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
            onClick={() => {
              if (filled) {
                register(emailInput.current?.value, usernameInput.current?.value, passwordInput.current?.value, captcha);
              }
            }}
          >
            submit »
          </motion.button>
        </Link>
      </div>
    </>
  );
};
