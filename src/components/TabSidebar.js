import { useState } from 'react';
import '../styles/tabSidebar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiHome } from "react-icons/hi";
import { FaMap } from "react-icons/fa";
import {SiBookstack} from "react-icons/si"
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { UserAuth } from '../context/AuthContext';
import { Store } from 'react-notifications-component';



const TabSidebar = () => {
    const currentPath = useLocation().pathname;
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await logout();
            navigate("/map");
            console.log("You have successfully logged out!")
            Store.addNotification({
                title: "Success!",
                message: "You have been logged out",
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
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="tabSidebar" style={(currentPath === "/" || currentPath === "/login" || currentPath === "/signup") ? { display: "none" } : { display: "block" }}>
            <ul>
                <li>
                    <Link to="/"><button className={(currentPath === "/") ? "selected" : ""}><HiHome /></button></Link>
                </li>
                <li>
                    <Link to="/map">
                        <button className={(currentPath === "/map") ? "selected" : ""} >
                            <FaMap className="tabIcon" />
                            <p>Map</p>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/libraryroute">
                        <button className={(currentPath === "/libraryroute") ? "selected" : ""} >
                            <SiBookstack className="tabIcon" />
                            <p>Library Route</p>
                        </button>
                    </Link>
                </li>
                <li className="bottomTab">
                    {
                        (!user) ?
                            <Link to="/login">
                                <button>
                                    <IoLogIn className="tabIcon" />
                                    <p>Login</p>
                                </button>
                            </Link> :
                            <button onClick={handleLogout}>
                                <IoLogOut className="tabIcon" />
                                <p>Logout</p>
                            </button>

                    }

                </li>
            </ul>


        </div>);
}

export default TabSidebar;