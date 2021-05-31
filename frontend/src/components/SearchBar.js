import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
    setKeyword('');
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex w-lg-50 mt-sm-2 mt-lg-0'>
      <Form.Control
        type='text'
        name='q'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ms-lg-5 rounded-0 rounded-start'
      ></Form.Control>
      <Button
        type='submit'
        variant='success'
        className='px-4 py-2 rounded-0 rounded-end'
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
