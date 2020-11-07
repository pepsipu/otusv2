import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { recaptcha } from '../../config.json';
import { postWithErrors } from '../../util/requests';

// ref is defined as { current: null }
type Ref = { current: any };

export default () => {
  const [, forceUpdate] = useState();
  const [captcha, setCaptcha] = useState('');

  const history = useHistory();

  const emailInput: Ref = useRef(null);
  const passwordInput: Ref = useRef(null);
  const captchaInput: Ref = useRef(null);

  const email = emailInput.current?.value;
  const password = passwordInput.current?.value;

  const filled = email && password && captcha;
  return (
    <>
      <div className="centerField">
        <h1>login</h1>
        <small>login into your account here.</small>
        <br />
        <input placeholder="email" ref={emailInput} onInput={forceUpdate} />
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
              postWithErrors('user/login', {
                email,
                password,
                captcha,
              })
                .then((loggedIn) => {
                  if (loggedIn) {
                    toast.success('logged in!');
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
