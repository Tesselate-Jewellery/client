import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import '../styling/Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function signup_user(){
        // console.log(email, password);
        try{
            // Check if the password meets the minimum length requirement
            if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
            // Make POST request 
            await axios.post(
                process.env.REACT_APP_BACKEND_URL + "users/sign-up",
                {
                    email,
                    password,
                    username
                });
            
            // Once user signs up, navigate to login page
            navigate("/login");
            toast.success("New user created!");

        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.")
        }
    }

    return (
        <div className="form-container">
            <h2>ACCOUNT SIGN UP</h2>
            <form onSubmit={(event) => {event.preventDefault(); signup_user(); }}>
            <div>
                <label htmlFor="email" className="signup-text">Email: </label>
                <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                className="signup-input"
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username" className="signup-text">Username: </label>
                <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                className="signup-input"
                onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password" className="signup-text">Password: </label>
                <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                className="signup-input"
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="signup-button">Submit</button>
            <div className="signup-text">
                Already have an account? <Link to={"/login"}>Login</Link>
            </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;