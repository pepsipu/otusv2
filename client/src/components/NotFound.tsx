import React from 'react';
import './App.css';
import 'bootstrap-4-grid';

/* there really is no 404 but we don't talk about that */
export default () => (
  <div style={{
    height: '100%',
    top: '50%',
  }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <h1 style={{ color: '#f05d5e', fontSize: '13vw' }}>404</h1>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#f1f2eb',
    }}
    >
      <small>how did you get here?</small>
    </div>
  </div>
);
