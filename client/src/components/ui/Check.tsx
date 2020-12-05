import React, { MutableRefObject } from 'react';

export default (props: CheckProps) => {
  const { trueRef, children } = props;
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
        ref={trueRef}
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
  trueRef: MutableRefObject<null>,
  children: string
}
