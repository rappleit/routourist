import { useState } from 'react';
import '../styles/publishRoute.css';
import { Store } from 'react-notifications-component';
import SGGreenHotelArr from "../data/SGGreenHotelsArr"
import { getDatabase, push, ref, set } from '@firebase/database';
import { useNavigate } from 'react-router';

const PublishRoute = ({
    selectedID,
    savedRoutes,
    user
}) => {

    const [routeDesc, setRouteDesc] = useState("")
    const [selectedCat, setSelectedCat] = useState("");
    const allRouteCats = [
        "Nature & Wildlife",
        "Cultural Heritage",
        "Sustainable Education & Awareness",
        "Culinary Delights",
        "Romantic",
        "Iconic Landmarks",
        "Shopping",
        "Others"
    ]
    const navigate = useNavigate();

    const achievementCheck = (route) => {
        let achievementArr = [];

        //check for eco-friendly transport
        if (route.travelMode != "DRIVING") {
            achievementArr.push("ecoTransport")
        } 

        //check for optimisation
        if (route.optimizeWaypoints === true) {
            achievementArr.push("optimisedRoute")
        }

        //check for sustainable accomodation
        if (SGGreenHotelArr.includes(route.origin.name)) {
            achievementArr.push("sustainableAccomodation")
        } else {
            for (let i = 0; i < route.waypoints.length; i++) {
                if (SGGreenHotelArr.includes(route.waypoints[i].name)) {
                    achievementArr.push ("sustainableAccomodation")
                }
            }
        }
        return {achievements: achievementArr, achievementNum: achievementArr.length}


    }

    const handlePublish = async () => {
        if (routeDesc === "") {
            Store.addNotification({
                title: "Error",
                message: "Please enter a description for your route!",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else if (selectedCat === "") {
            Store.addNotification({
                title: "Error",
                message: "Please select a category for your route",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else {
            
            const db = getDatabase();
            const publishedRoutesRef = ref(db, "publishedroutes/");
            const newPublishedRouteRef = push(publishedRoutesRef);
            try {
                await set( newPublishedRouteRef, {
                    name: savedRoutes[selectedID].name,
                    route: savedRoutes[selectedID].route,
                    country: savedRoutes[selectedID].country,
                    carbonEmissions: savedRoutes[selectedID].carbonEmissions,
                    duration: savedRoutes[selectedID].duration,
                    category: selectedCat,
                    author: user.displayName,
                    authorID: user.uid,
                    type: "Community",
                    achievements: achievementCheck(savedRoutes[selectedID].route).achievements,
                    score: achievementCheck(savedRoutes[selectedID].route).achievementNum,
                    desc: routeDesc,
                    id: newPublishedRouteRef.key
                })
                Store.addNotification({
                    title: "Success!",
                    message: "Your route has been successfully published to the Route Library.",
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
                navigate('/routelibrary');
                
            } catch (e) {
                console.log(e.message);
                Store.addNotification({
                    title: "Error",
                    message: e.message,
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            }
        }
    }

    return (
        <div className="publishRouteView">
            <div className="publishTop">
                <h2>Publish Route</h2>
                <button className="publishRouteButton" onClick={() => handlePublish()}>Publish Route</button>
            </div>
            <div className="publishContainer">
                <div className="fixedPublishInfo">
                    <p><span className="publishHeader">Route Name:</span> {savedRoutes[selectedID].name}</p>
                    <p><span className="publishHeader">Route Path:</span> {savedRoutes[selectedID].route.origin.name + " → "}
                        {
                            (savedRoutes[selectedID].route.waypoints.length > 1) ?
                                savedRoutes[selectedID].route.waypoints.slice(1).map((wp, i) => (
                                    (i === savedRoutes[selectedID].route.waypoints.slice(1).length - 1) ? wp.name : `${wp.name} → `
                                ))
                                :
                                savedRoutes[selectedID].route.waypoints.map((wp, i) => (
                                    (i === savedRoutes[selectedID].route.waypoints.length - 1) ? wp.name : `${wp.name} → `
                                ))
                        }</p>
                    <p><span className="publishHeader">Transport Mode:</span> {savedRoutes[selectedID].route.travelMode.charAt(0) + savedRoutes[selectedID].route.travelMode.slice(1).toLowerCase()}</p>
                    <p><span className="publishHeader">Route Optimised:</span> {(savedRoutes[selectedID].route.optimizeWaypoints) ? "Yes" : "No"}</p>
                </div>
                <p><span className="publishHeader">Write a brief description!</span></p>
                <textarea className="publishDescInput" placeholder='Enter a brief description here' value={routeDesc} onChange={(e) => setRouteDesc(e.target.value)}></textarea>
                <p><span className="publishHeader">Choose a category:</span></p>
                <div className="publishCategoryContainer">
                    {allRouteCats.map((cat, i) => (
                        <button key={i} onClick={() => setSelectedCat(cat)} className={(selectedCat === cat) ? "selected" : ""}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
}

export default PublishRoute;