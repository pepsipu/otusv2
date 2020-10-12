import React from 'react';
import 'bootstrap-4-grid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default () => (
  <>
    <div className="centerField">
      <h1>register</h1>
      <small>please dont spam new accounts!</small>
      <br />
      <input placeholder="email" />
      <input placeholder="username" />
      <input placeholder="password" type="password" />
      <br />
      <div className="g-recaptcha" data-sitekey="6LeOYtYZAAAAAJV_ayxNSH6WgcH_XJS3bOHe7aNc" data-theme="dark" />
      <br />
      <Link to="register">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '200px',
            height: '45px',
            fontSize: '12pt',
          }}
        >
          submit »
        </motion.button>
      </Link>
    </div>
  </>
);
