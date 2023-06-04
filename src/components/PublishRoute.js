import { useState } from 'react';
import '../styles/publishRoute.css';
import { Store } from 'react-notifications-component';

const PublishRoute = ({
    selectedID,
    savedRoutes
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
        "Entertainment",
        "Others"
    ]

    const handlePublish = () => {
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