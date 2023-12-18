import React from 'react';
import { useAuth } from '../utils/AuthContext';

const ExampleComponent = () => {
  const { jwt } = useAuth();

  return (
    <div>
      <h1>Welcome to the Example Component</h1>
      <p>Your JWT: {jwt}</p>
    </div>
  );
};

export default ExampleComponent;