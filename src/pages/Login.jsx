import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    
    const navigate = useNavigate();
    const [jwt, setJwt] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        console.log(`JWT value is:\n${jwt}`);
    }, [jwt]);

    async function login(){
        console.log(email, password);
        try{
            let result = await axios.post(process.env.REACT_APP_BACKEND_URL + "users/sign-in", {
                email,
                password,
            });

            let data = await result.data;
            setJwt(data);
            navigate("/");

        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        }
    }
    
    return (
    <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={(event) => {event.preventDefault(); login(); }}>
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
        </form>
        <ToastContainer />
    </div>
    );
};

export default Login