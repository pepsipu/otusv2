import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { getWithErrors } from '../../util/requests';

const categories = {
  ctf: {
    name: 'ctf',
    path: 'ctf',
  },
  cyberPatriot: {
    name: 'cyberpatriot',
    path: 'cp',
  },
};

export default () => {
  const { userId, category } = useParams();
  const [{ username, country, emailHash }, setProfile]: [ProfileData, any] = useState({
    username: '',
    country: '',
    emailHash: '',
  }) as [any, any];

  useEffect(() => {
    getWithErrors(`/user/profile/${userId}`).then((profileData) => setProfile(profileData));
  }, [userId, setProfile]);

  return (
    <>
      <div className="centerField">
        <div
          className="w-75 componentContainer"
          style={{
            padding: 0,
            borderRadius: '10px',
          }}
        >
          <div
            className="row"
            style={{
              background: '#1f1f1f',
              margin: 0,
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              padding: '6px',
            }}
          >
            <div className="col">user profile</div>
            <div className="col-auto" style={{ textAlign: 'right' }}>
              {Object.values(categories).map(({ name, path }) => (
                <>
                  <NavLink
                    className="category"
                    activeClassName="activeCategory"
                    to={`/profile/${userId}/${path}`}
                  >
                    {name}
                  </NavLink>
                  {' '}
                </>
              ))}
            </div>

          </div>
          <div style={{
            padding: '20px',
          }}
          >
            <div className="row">
              <div className="col-auto">
                <Gravatar
                  style={{
                    borderRadius: '25px',
                  }}
                  md5={emailHash}
                  size={150}
                />
              </div>
              <div className="col-auto">
                <h3>{username}</h3>
                <hr style={{
                  padding: '0',
                  margin: '0',
                  background: '#f1f2eb',
                }}
                />
                <img width="64" height="64" src={`https://www.countryflags.io/${country.toLowerCase()}/shiny/64.png`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ProfileData {
  username: string,
  country: string,
  emailHash: string,
}
