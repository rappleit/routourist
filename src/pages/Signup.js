import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const { createUser } = UserAuth();
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setErrorMsg("Password must be at least 8 characters long")
        } else if ((/\d/.test(password) && /[a-zA-Z]/.test(password)) === false) {
            setErrorMsg("Password must contain at least one letter and one number")
        } else {
            try {
                await createUser(email, password);
                setErrorMsg("")
                navigate("/map");

              } catch (e) {
                console.log(e.message);
                setErrorMsg(e.message)
              }
        }


    }

    return (
        <div className="signupPage">
            <div className="signupContainer">
                <h2>Hi there!</h2>
                <p>Let&apos;s create a new account</p>
                <form onSubmit={handleSignup}>
                    <div className="signupField">
                        <FaEnvelope className="fieldIcon" />
                        <input
                            type="email"
                            placeholder="Please enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="signupField">
                        <FaLock className="fieldIcon" />
                        <input
                            type="password"
                            placeholder="Please enter a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="signupButton" type="submit">Sign up</button>
                </form>
                <p className="errorMsg" style={(errorMsg === "") ? { display: "none" } : { display: "block" }}>{errorMsg}</p>
                <p>Already have an account? <Link to="/login" className="loginLink">Log in here</Link></p>
                <Link to="/map" className="mapLink">Go To Map</Link>
            </div>
        </div>
    );
}

export default Signup;