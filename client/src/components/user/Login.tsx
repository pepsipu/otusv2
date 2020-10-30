import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { recaptcha, apiEndpoint } from '../../config.json';

// ref is defined as { current: null }
type Ref = { current: any };

const login = async (email: string, password: string, captcha: string): Promise<boolean> => {
  const { error }: { error: string | string[] } = (await axios.post(`${apiEndpoint}/user/login`, {
    email,
    password,
    captcha,
  })).data;
  if (error) {
    if (Array.isArray(error)) {
      error.forEach((e) => toast.error((e)));
    } else {
      toast.error(error);
    }
    return false;
  }
  toast.success('logged in!');
  return true;
};

export default (props: { cookies: any }) => {
  const { cookies } = props;

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
              login(email, password, captcha)
                .then((loggedIn) => {
                  if (loggedIn) {
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
