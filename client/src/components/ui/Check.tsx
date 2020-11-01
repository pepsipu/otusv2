import React, { MutableRefObject } from 'react';

export default (props: CheckProps) => {
  const { ref, children } = props;
  return (
    <div
      className="row"
      style={{
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <input
        type="checkbox"
        ref={ref}
        style={{
          width: '13px',
        }}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="form-check-label">{children}</label>
    </div>
  );
};

interface CheckProps {
  ref: MutableRefObject<null>,
  children: string
}
