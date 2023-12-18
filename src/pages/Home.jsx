import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home PAGE</h1>
      <p>
        Already have an login? <Link to={'/login'}>Login</Link>
      </p>
      <p>
        Don't have an account? <Link to={'/signup'}>Signup</Link>
      </p>
    </div>
  );
};

export default Home;