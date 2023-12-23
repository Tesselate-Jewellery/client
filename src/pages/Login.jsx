import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '../utils/AuthContext';
import '../styling/Login.css';

const Login = () => {
    const { setAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    async function login_user() {
        // console.log(email, password);
        try {
          // Make POST request
          let result = await axios.post(
            process.env.REACT_APP_BACKEND_URL + "users/sign-in", 
            {
              email,
              password,
            }
          );
      
          let data = await result.data;
          // console.log(data);
      
          // Assuming data contains jwt and role ID
          const { jwt, role: roleId, userID } = data;
      
          // Fetch role details based on role ID
          const rolesResponse = await fetch(process.env.REACT_APP_BACKEND_URL + "roles");
          const rolesResult = await rolesResponse.json();
          // Takes the role id and matches it to the name (i.e. "admin, "staff", "user")
          // Easier to render components on role names 
          const matchingRole = rolesResult.data.find(role => role._id === roleId);
      
          if (matchingRole) {
            // Set authenticated data in the context with role name
            setAuthenticated({ jwt, role: matchingRole.name, userID });
      
            // Navigate to the desired page (e.g., home page)
            navigate("/");
      
            toast.success("Successfully logged in!");
          } else {
            console.error('Role not found');
            toast.error("An error occurred. Please try again.");
          }
        } catch (err) {
          console.error(err);
          toast.error("An error occurred. Please try again.");
        }
      }
    
    return (
    <div className="form-container">
        <h2>ACCOUNT LOGIN</h2>
        <form onSubmit={(event) => {event.preventDefault(); login_user(); }}>
        <div>
            <label htmlFor="email" className="login-text">Email: </label>
            <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            className="login-input"
            onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password" className="login-text">Password: </label>
            <input
            type="password"
            name="password" 
            value={password}
            placeholder="Enter your password"
            className="login-input"
            onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <div>
          <button type="submit" className="login-button">Login</button>
        </div>  
        <div className="login-text">
            Don't have an account? <Link to={"/signup"}>Signup</Link>
        </div>
        </form>
        <ToastContainer />
    </div>
    );
};

export default Login;