import React, { useEffect, useRef, useState } from 'react';
import './About.css';
// import { motion } from 'framer-motion';

// vanta pls add typescript typing
const vantaNet = require('vanta/dist/vanta.net.min').default;

export default () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);
  console.log(vantaNet);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(vantaNet({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xf05d5e,
        backgroundColor: 0x060e0e,
      }));
    }
  }, [vantaEffect]);
  return (
    <div id="background" ref={vantaRef} />
  );
};
