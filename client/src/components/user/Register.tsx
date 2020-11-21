import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import axios from 'axios';
import countries from 'i18n-iso-countries';
import { recaptcha, ipInfoToken } from '../../config.json';
import { postWithErrors } from '../../util/requests';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

// trust user with the ip, some users might not want their real country so we should
// let them pick if they want tgo

const register = async (
  email: string, username: string, password: string, country: string, captcha: string,
) => postWithErrors('user/register', {
  email,
  username,
  password,
  country,
  captcha,
});

// ref is defined as { current: null }
type Ref = { current: any };

export default () => {
  const [, forceUpdate] = useState();
  const [captcha, setCaptcha] = useState('');

  const history = useHistory();

  const inputRefs = {
    email: useRef(null),
    username: useRef(null),
    password: useRef(null),
    country: useRef(null),
  };

  const captchaRef = useRef(null);

  const inputs = Object.fromEntries(Object.entries(inputRefs).map(
    ([inputName, input]: [any, any]) => [inputName, input.current?.value],
  ));

  const {
    email, username, password, country,
  } = inputs;

  const filled = Object.values(inputs).every((v: any) => v) && captcha;
  return (
    <>
      <div className="centerField">
        <h1>register</h1>
        <small>please dont spam new accounts!</small>
        <br />
        <input placeholder="email" ref={inputRefs.email} onInput={forceUpdate} />
        <input placeholder="username" ref={inputRefs.username} onInput={forceUpdate} />
        <input placeholder="password" type="password" ref={inputRefs.password} onInput={forceUpdate} />
        <select
          className="custom-select inputField"
          ref={inputRefs.country}
          defaultValue="US"
        >
          {Object.keys(countries.getAlpha2Codes()).map(
            (countryCode) => (
              <option value={countryCode} key={countryCode}>
                {countries.getName(countryCode, 'en')}
              </option>
            ),
          )}
        </select>
        <br />
        <ReCAPTCHA
          sitekey={recaptcha}
          onChange={(token) => setCaptcha(token ?? '')}
          theme="dark"
          ref={captchaRef}
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
          onClick={async () => {
            if (filled) {
              const registered = await register(email, username, password, country, captcha);
              if (registered) {
                toast.success('registered!');
                history.push('/home');
              }
              (captchaRef.current as any)?.reset();
            }
          }}
        >
          submit »
        </motion.button>
      </div>
    </>
  );
};
