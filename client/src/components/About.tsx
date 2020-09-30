import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import { motion } from 'framer-motion';
import OtusLogo from '../img/otus_engine.svg';

// vanta pls add typescript typing
const vantaNet = require('vanta/dist/vanta.net.min').default;

export default () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(vantaNet({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200,
        minWidth: 200,
        scale: 1.00,
        scaleMobile: 1.00,
        spacing: 17,
        points: 9,
        color: 0xf05d5e,
        backgroundColor: 0x060e0e,
      }));
    }
  }, [vantaEffect]);
  return (
    <div id="background" ref={vantaRef}>
      <motion.div
        id="centerDiv"
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: 'easeInOut' }}
        style={{ opacity: 0, margin: '20px' }}
      >
        <motion.img
          src={OtusLogo}
          alt="Otus Logo"
          animate={{
            y: '-15vh',
            scale: 0.35,
          }}
          transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
        />
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1, ease: 'easeInOut' }}
          style={{
            opacity: 0,
            transform: 'translate(0, -30vh)',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '200px',
              height: '60px',
              fontSize: '12pt',
            }}
          >
            start hacking »
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
