import { useEffect } from "react";
import { FaRegFlag, FaRegTimesCircle, FaRegDotCircle, FaCar } from "react-icons/fa";

const RouteBuilder = ({
    fromRef,
    toRef,
    waypointsNum,
    setWaypointsNum,
    waypointValues,
    setWaypointValues,
    addWaypoint,
    calcRoute,
    resetWaypoints,
}) => {
    const handleInputChange = (index, value) => {
        setWaypointValues(prevInputs =>
          prevInputs.map((input, i) => (i === index ? value : input))
        );
      };
    const removeWaypoint = (index) => {
        
        if (index === 0 && waypointsNum === 1) {
            const firstWaypoint = document.getElementById("firstToRef");
            firstWaypoint.value = null;
            setWaypointValues([""]);
        } else {
            setWaypointsNum(waypointsNum - 1);
            setWaypointValues(prevWaypoints => prevWaypoints.filter((_, i) => i !== index));
        }
    }

    return (
        <div className="routeBuilder">
            <div className="waypointsList">
                <div className="startWaypoint">
                    <FaRegFlag />
                    <input
                        ref={fromRef}
                        id="fromRef"
                        placeholder="From where?"
                        type="text"
                    ></input>
                    <button className="removeWaypointButton"  style={{ fontSize: "22px", visibility: "hidden", pointerEvents: "none" }}><FaRegTimesCircle/></button>
                </div>
                {
                    waypointValues.map(
                        (wp, i) => (
                            <div className="toWaypoint" key={i}>
                                <FaRegDotCircle />
                                <input 
                                    ref={toRef}
                                    id={(i === 0) ? "firstToRef": ""}
                                    placeholder="To where?"
                                    type="text"
                                    className="toRef"
                                    value={wp}
                                    onChange={e => handleInputChange(i, e.target.value)}
                                ></input>
                                <button className="removeWaypointButton" onClick={() => {
                                    removeWaypoint(i);

                                }}><FaRegTimesCircle style={{ fontSize: "22px" }} /></button>
                            </div>
                        )
                    )
                }

            </div>
            <div className="waypointOptions">
                <button onClick={(e) => addWaypoint(e)}>Add Waypoint</button>
                <button onClick={(e) => resetWaypoints(e)}>Reset</button>
            </div>
            <div className="transportModeList">
                <h3>Transport Mode</h3>
                <select
                    id="transportModeMenuRef"
                    name="ModeTransport"                >
                    <option value="DRIVING">Driving</option>
                    <option value="TRANSIT">Transit</option>
                    <option value="WALKING">Walk</option>
                    <option value="BICYCLING">Cycling</option>
                </select>
            </div>
            <div className="optimiseRouteContainer">
                <div className="optimiseRouteFlex">
                    <label
                        for="OptimiseChoice"
                    >
                        Optimise Route
                    </label>
                    <input
                        id="optimizeRouteRef"
                        type="checkbox"
                        name="OptimiseChoice"
                        value="OptimiseChoice"
                    ></input>
                </div>
                <p>You can reduce your carbon footprint by optmising your route! </p>
            </div>
            <button className="createRouteButton" onClick={(e) => calcRoute(e)}>Create Route</button>
        </div>
    );
}

export default RouteBuilder;