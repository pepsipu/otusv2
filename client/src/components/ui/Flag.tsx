import React from 'react';

// thank you peppy you are so cute
export default ({ country }: { country: string }) => (
  <img
    style={{
      paddingRight: '8px',
    }}
    width="40px"
    alt="osu flag"
    src={`https://osu.ppy.sh/images/flags/${country.toUpperCase()}.png`}
  />
);
