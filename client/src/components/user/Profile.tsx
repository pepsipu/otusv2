import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import countries from 'i18n-iso-countries';
import ReactTooltip from 'react-tooltip';
import { getWithErrors } from '../../util/requests';
import { IChallenge, Challenge } from '../challenges/Challenge';
import Flag from '../ui/Flag';

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

const alternateCountries = (code: string) => {
  switch (code) {
    case 'us':
      return 'United States';
    default:
      return countries.getName(code, 'en');
  }
};

export default () => {
  const { userId, category } = useParams();
  const [{
    username, country, emailHash, badges, ctf, challenges,
  }, setProfile]: [ProfileData, any] = useState({
    username: '',
    country: '',
    emailHash: '',
    badges: [],
    challenges: [],
    ctf: {
      rank: 'err',
      pp: 0,
    },
  }) as [any, any];

  useEffect(() => {
    getWithErrors(`/user/profile/${userId}`).then((profileData) => setProfile(profileData));
  }, [userId, setProfile]);

  return (
    <>
      <div
        className="centerField"
        style={{
          paddingBottom: '0',
        }}
      >
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
                <div style={{
                  paddingTop: '4px',
                }}
                >
                  <hr style={{
                    padding: '0',
                    margin: '0',
                    background: '#f1f2eb',
                  }}
                  />
                  <div
                    className="row"
                    style={{
                      padding: '15px',
                      paddingTop: '10px',
                      paddingBottom: '0px',
                    }}
                  >
                    <Flag country={country} />
                    <small style={{
                      paddingTop: '4px',
                      paddingLeft: '8px',
                    }}
                    >
                      {alternateCountries(country)}
                    </small>
                  </div>
                </div>
                <div>
                  <br />
                  {badges.map((badge) => (
                    <>
                      <ReactTooltip effect="solid" />
                      <span
                        style={{
                          background: badge.backgroundColor,
                          color: badge.color,
                          padding: '8px',
                          marginRight: '16px',
                          marginLeft: '-8px',
                        }}
                        data-tip={badge.tooltip}
                      >
                        {badge.text}
                      </span>
                    </>
                  ))}
                </div>
              </div>
              <div className="col" />
              <div className="col-auto">
                <h2 style={{
                  color: '#818181',
                }}
                >
                  #
                  {ctf.rank + 1}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="centerField"
        style={{
          paddingTop: '0px',
        }}
      >
        <div
          className="w-75"
          style={{
            padding: 0,
          }}
        >
          {challenges.map((challenge) => (
            <div
              className="componentContainerRound"
              style={{
                padding: '20px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <Challenge
                {...challenge}
                author={{
                  username,
                  _id: userId,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div id="tooltip-container">
        <ReactTooltip />

      </div>

    </>
  );
};

interface ProfileData {
  username: string,
  country: string,
  emailHash: string,
  badges: { backgroundColor: string, color: string, text: string, tooltip: string }[],
  ctf: {
    pp: number,
    solves: { challenge: string, timestamp: Date, position: number }[],
    rank: number,
  },
  challenges: IChallenge[],
}
