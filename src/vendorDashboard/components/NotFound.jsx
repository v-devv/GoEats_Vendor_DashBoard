import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className="not-found-container">
        <Link to="/">
            <h4> GO Back</h4>
        </Link>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFound;
