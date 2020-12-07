import React from 'react';
import ReactMarkdown from 'react-markdown';

const Challenge = ({
  name, description, categories, points,
}: IChallenge) => (
  <>
    <div className="row">
      <div className="col">
        <h6>{name}</h6>
      </div>
      <div className="col-auto">
        <p>
          {points !== -1 && <p>{`${points} points`}</p>}
        </p>
      </div>
    </div>
    <small>pepsipu</small>
    <hr style={{
      marginTop: '10px',
      marginBottom: '10px',
      backgroundColor: '#f1f2eb',
    }}
    />
    <div style={{
      fontSize: '11pt',
    }}
    >
      <ReactMarkdown>
        {description}
      </ReactMarkdown>
    </div>
    <div
      className="input-group mb-3"
      style={{
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      <input
        type="text"
        className="form-control"
        style={{
          margin: '0',
          background: '#1f1f1f',
          borderColor: '#454545',
        }}
      />
      <div
        className="input-group-prepend"
      >
        <button
          style={{
            borderRadius: '0',
            margin: '0',
          }}
          type="button"
        >
          submit
        </button>
      </div>
    </div>
    {categories.map((category) => (
      <small
        style={{
          background: '#1f1f1f',
          color: '#f1f2eb',
          padding: '8px',
          marginRight: '16px',
        }}
      >
        {category}
      </small>
    ))}
  </>
);

export interface IChallenge {
  name: string,
  description: string,
  categories: string[],
  points: number,
}

export { Challenge };
