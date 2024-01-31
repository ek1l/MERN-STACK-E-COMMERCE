import React from 'react';
import { MdError } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container not-found">
      <MdError />
      <h1>Page Not Found</h1>
    </div>
  );
};

export default NotFound;
