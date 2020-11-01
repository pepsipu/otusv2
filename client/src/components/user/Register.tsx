import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { recaptcha, apiEndpoint } from '../../config.json';
import { postWithErrors } from '../../util/requests';

// ref is defined as { current: null }
type Ref = { current: any };

export default (props: { cookies: any }) => {
  const { cookies } = props;

  const [, forceUpdate] = useState();
  const [captcha, setCaptcha] = useState('');

  const history = useHistory();

  const emailInput: Ref = useRef(null);
  const usernameInput: Ref = useRef(null);
  const passwordInput: Ref = useRef(null);
  const captchaInput: Ref = useRef(null);

  const email = emailInput.current?.value;
  const username = usernameInput.current?.value;
  const password = passwordInput.current?.value;

  // const fieldsFilled = [emailInput, usernameInput, passwordInput].map((i) => i.current?.value).every((v) => v)
  const filled = email && username && password && captcha;
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
        <ReCAPTCHA
          sitekey={recaptcha}
          onChange={(token) => setCaptcha(token ?? '')}
          theme="dark"
          ref={captchaInput}
        />
        <br />
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
              postWithErrors('user/register', {
                email,
                username,
                password,
                captcha,
              })
                .then((registered) => {
                  if (registered) {
                    toast.success('registered!');
                    history.push('/home');
                  }
                });
              captchaInput.current?.reset();
            }
          }}
        >
          submit »
        </motion.button>
      </div>
    </>
  );
};

interface RegisterResponse {
  error?: string | string[],
  id: string
}
