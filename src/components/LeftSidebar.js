import {useState} from "react";
import DirectionsOverview from "./DirectionsOverview";
import RouteBuilder from "./RouteBuilder";
import {IoClose} from "react-icons/io5";
import DirectionsPanel from "./DirectionsPanel";

const LeftSidebar = ({
    fromPlaceNameRef,
    toPlaceNameRef,
    waypointsNum,
    setWaypointsNum,
    waypointValues,
    setWaypointValues,
    addWaypoint,
    calcRoute,
    currentRouteOverview,
    currentRoute,
    showLeftSidebar,
    setShowLeftSideBar,
    resetWaypoints,
}) => {
    const [view, setView] = useState("routeBuilder");

    return (
        <div className="leftSidebar">
            <div className="leftSidebarHeader">
                <h1>Routourist</h1>
                <button onClick={() => setShowLeftSideBar(!showLeftSidebar)}>
                    <IoClose />
                </button>
            </div>
            <p className="countryLabel"><span>Current Country:</span> {localStorage.getItem("Country")}</p>

            <div
                style={
                    view === "routeBuilder"
                        ? {display: "block"}
                        : {display: "none"}
                }
            >
                <RouteBuilder
                    {...{
                        fromPlaceNameRef,
                        toPlaceNameRef,
                        waypointsNum,
                        setWaypointsNum,
                        waypointValues,
                        setWaypointValues,
                        addWaypoint,
                        calcRoute,
                        resetWaypoints,
                    }}
                />
                <DirectionsOverview
                    {...{currentRouteOverview, currentRoute, setView}}
                />
            </div>

            <div
                style={
                    view === "directionsPanel"
                        ? {display: "block"}
                        : {display: "none"}
                }
            >
                <DirectionsPanel
                    {...{currentRouteOverview, currentRoute, setView}}
                />
            </div>
        </div>
    );
};

export default LeftSidebar;
