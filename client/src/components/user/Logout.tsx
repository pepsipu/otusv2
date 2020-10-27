import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default () => {
  const history = useHistory();
  toast.success('logged out.');
  history.push('/home');
  return <></>;
};
