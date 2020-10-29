import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactCookieProps } from 'react-cookie';
import axios from 'axios';
import { apiEndpoint } from '../../config.json';

const logout = async (): Promise<boolean | string> => {
  const { error }: { error: string | boolean } = (await axios.post(`${apiEndpoint}/user/logout`)).data;
  if (error) {
    if (Array.isArray(error)) {
      error.forEach((e) => toast.error((e)));
    } else {
      toast.error(error);
    }
  }
  return error;
};

export default (props: ReactCookieProps) => {
  const { cookies } = props;
  const history = useHistory();
  logout().then((error) => {
    if (!error) {
      cookies?.remove('username');
      cookies?.remove('email');
      cookies?.remove('id');
      toast.success('logged out.');
    }
    history.push('/home');
  });

  return (
    <div className="row text-center">
      <small>please wait...</small>
    </div>
  );
};
