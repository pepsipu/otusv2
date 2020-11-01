import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postWithErrors } from '../../util/requests';

export default () => {
  const history = useHistory();
  postWithErrors('user/logout', {}).then((loggedOut) => {
    if (loggedOut) {
      toast.success('logged out.');
    }
    history.push('/home');
  });

  return (
    <div className="row centerField">
      <small>please wait...</small>
    </div>
  );
};
