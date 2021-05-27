import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ inline, size, ...rest }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: size !== 'sm' && '100px',
        height: size !== 'sm' && '100px',
        margin: size === 'sm' && inline ? '0 1rem' : 'auto',
        display: inline ? 'inline-block' : 'block',
      }}
      {...rest}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
