import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postWithErrors } from '../../util/requests';

const submitChallenge = async (_id: string, flag: string) => {
  const { ok, reason } = await postWithErrors(`/challenge/submit/${_id}`, { flag });
  if (ok) {
    toast.success('correct!');
  } else {
    toast.error(reason);
  }
};

const Challenge = ({
  name, description, categories, points, author, _id,
}: IChallenge) => {
  const flagInput: any = useRef(null);
  return (
    <>
      <div className="row">
        <div className="col">
          <h6 style={{ margin: '0' }}>{name}</h6>
        </div>
        <div className="col-auto">
          {points !== -1 && (
          <p style={{ margin: '0' }}>
            {`${points} points`}
          </p>
          )}
        </div>
      </div>
      <Link
        to={`/profile/${author._id}/ctf`}
        style={{
          fontSize: '13px',
          padding: '0',
        }}
      >
        {author.username}
      </Link>
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
          ref={flagInput}
        />
        <div
          className="input-group-prepend"
        >
          <motion.button
            style={{
              borderRadius: '0',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              margin: '0',
              color: '#f1f2eb',
              backgroundColor: '#1f1f1f',
            }}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => submitChallenge(_id, flagInput.current?.value)}
          >
            submit
          </motion.button>
        </div>
      </div>
      {categories.map((category) => (
        <small
          key={category}
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
};

export interface IChallenge {
  name: string,
  description: string,
  categories: string[],
  points: number,
  author: {
    username: string,
    _id: string,
  }
  _id: string,
}

export { Challenge };
