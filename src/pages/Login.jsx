import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from '../utils/AuthContext';

const Login = () => {
    
    const { setAuthenticated } = useAuth();
    const navigate = useNavigate();
    // const [jwt, setJwt] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login_user(){
        console.log(email, password);
        try{
            let result = await axios.post(
                process.env.REACT_APP_BACKEND_URL + "users/sign-in", 
                {
                email,
                password,
                });

            let data = await result.data;
            setAuthenticated(data);
            // navigate("/");

            toast.success("Successfully logged in!");

        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        }
    }
    
    return (
    <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={(event) => {event.preventDefault(); login_user(); }}>
        <div>
            <label htmlFor="email">Email</label>
            <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <button type="submit">Submit</button>
        <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
        <span>
            See jwt <Link to={"/example"}>Example</Link>
        </span>
        <span>
            Check Protected Route <Link to={"/protected"}>Protected</Link>
        </span>
        </form>
        <ToastContainer />
    </div>
    );
};

export default Login