import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function signup_user(){
        console.log(email, password);
        try{
            await axios.post(
                process.env.REACT_APP_BACKEND_URL + "users/sign-up",
                {
                    email,
                    password,
                    username
                });
            
            navigate("/login");
            toast.success("New user created!");

        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.")
        }
    }

    return (
        <div className="form_container">
            <h2>Signup Account</h2>
            <form onSubmit={(event) => {event.preventDefault(); signup_user(); }}>
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
                <label htmlFor="username">Username</label>
                <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={(event) => setUsername(event.target.value)}
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
                Already have an account? <Link to={"/login"}>Login</Link>
            </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup