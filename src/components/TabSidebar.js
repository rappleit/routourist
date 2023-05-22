import { useState } from 'react';
import '../styles/tabSidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { HiHome } from "react-icons/hi";
import { FaMap } from "react-icons/fa";


const TabSidebar = () => {
    const currentPath = useLocation().pathname;
    return (
        <div className="tabSidebar" style={(currentPath === "/") ? {display: "none"} : {display: "block"}}>
            <ul>
            <li>
                    <Link to="/"><button className={(currentPath === "/") ? "selected" : ""}><HiHome/></button></Link>
                </li>
                <li>
                    <Link to="/map"><button className={(currentPath === "/map") ? "selected" : ""} ><FaMap/></button></Link>
                </li>
            </ul>
        </div>);
}

export default TabSidebar;