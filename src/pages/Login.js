import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Store } from 'react-notifications-component';
import GoogleButton from 'react-google-button'



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const { login, googleSignIn, user } = UserAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password)
            setErrorMsg("")
            setIsLoading(false);

        } catch (e) {
            setErrorMsg(e.message)
            console.log(e.message)
            setIsLoading(false)
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            setErrorMsg("")
        } catch (e) {
            setErrorMsg(e.message)
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/map');
            Store.addNotification({
                title: "Welcome!",
                message: "You are now logged in as " + user.email,
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }, [user]);


    return (
        <div className="loginPage">
            <div className="loginContainer">
                <h2>Welcome back!</h2>
                <p>Please log into your account</p>
                <GoogleButton onClick={handleGoogleSignIn}/>
                <p style={{ fontSize: "14px" }}>or</p>
                <form onSubmit={handleLogin}>
                    <div className="emailField loginField">
                        <FaEnvelope className="fieldIcon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="passwordField loginField">
                        <FaLock className="fieldIcon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="loginButton" type="submit" disabled={isLoading}>{(isLoading) ? "Please Wait..." : "Login"}</button>
                </form>
                <p className="errorMsg" style={(errorMsg === "") ? { display: "none" } : { display: "block" }}>{errorMsg}</p>
                <p>Don&apos;t have an account? <Link to="/signup" className="signupLink">Sign up here</Link></p>
                <Link to="/map" className="mapLink">Go To Map</Link>
            </div>
        </div >
    );
}

export default Login;