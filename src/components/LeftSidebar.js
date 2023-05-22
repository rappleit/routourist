import DirectionsOverview from "./DirectionsOverview";
import RouteBuilder from "./RouteBuilder";
import { IoClose } from "react-icons/io5";


const LeftSidebar = ({
    fromRef,
    toRef,
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
    resetWaypoints
}) => {
    return (
        <div className="leftSidebar">
            <div className="leftSidebarHeader">
                <h1>Routourist</h1>
                <button onClick={() => setShowLeftSideBar(!showLeftSidebar)}><IoClose /></button>

            </div>

            <RouteBuilder {...{ fromRef, toRef, waypointsNum, setWaypointsNum, waypointValues, setWaypointValues, addWaypoint, calcRoute, resetWaypoints }} />
            <DirectionsOverview {...{ currentRouteOverview, currentRoute }} />
        </div>
    );
}

export default LeftSidebar;