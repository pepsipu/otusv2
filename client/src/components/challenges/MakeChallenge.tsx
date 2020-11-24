import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import jsYaml from 'js-yaml';
import { recaptcha } from '../../config.json';

export default () => {
  const fileRef: any = useRef(null);
  const captchaRef: any = useRef(null);

  const [captcha, setCaptcha] = useState('');
  const [file, setFile]: [any, any] = useState({ name: 'no file selected' });

  const filled = captcha && file.name !== 'no file selected';
  return (
    <div className="centerField">
      <h2>make a challenge</h2>
      <small>
        learn about the challenge.yml format
        {' '}
        <a href="/pog">here</a>
        .
      </small>
      <br />
      <div className="w-25">
        <div
          className="col mx-auto componentContainer"
          style={{
            marginLeft: '0',
            textAlign: 'center',
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <small
            className="highlight"
            onClick={() => fileRef.current?.click()}
            style={{
              cursor: 'pointer',
            }}
          >
            upload challenge.yml &#65291;
          </small>
          <br />
          <small style={{
            color: '#b2b3ab',
          }}
          >
            {file.name}
          </small>
          <input
            type="file"
            ref={fileRef}
            onChange={() => setFile(fileRef.current?.files[0])}
            style={{
              display: 'none',
            }}
          />
          <div
            className="centerField"
            style={{
              padding: '20px',
            }}
          >
            <ReCAPTCHA
              sitekey={recaptcha}
              onChange={(token) => setCaptcha(token ?? '')}
              theme="dark"
              ref={captchaRef}
            />
          </div>
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
                const reader = new FileReader();
                reader.onload = (event) => {
                  const challenge = jsYaml.load(event.target?.result as string);
                  (captchaRef.current as any)?.reset();
                  setCaptcha('');
                };
                reader.readAsText(file, 'UTF-8');
              }
            }}
          >
            submit »
          </motion.button>
        </div>
      </div>

    </div>
  );
};
