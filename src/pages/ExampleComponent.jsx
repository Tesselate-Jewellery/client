import React from 'react';
import { useAuth } from '../utils/AuthContext';

const ExampleComponent = () => {
  const { jwt, role } = useAuth();

  return (
    <div>
      <h1>Welcome to the Example Component</h1>
      <p>Your JWT: {jwt}</p>
      <p> Your Role: {role} </p>
    </div>
  );
};

export default ExampleComponent;