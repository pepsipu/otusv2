import React from 'react';
import { motion } from 'framer-motion';

export default (props: { children: any }) => {
  const { children, ...buttonProps } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading,react/button-has-type
  return <motion.button {...buttonProps}>{children}</motion.button>;
};
