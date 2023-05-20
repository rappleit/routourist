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
    calcRoute
}) => {


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
                    <FaRegTimesCircle style={{ fontSize: "22px", visibility: "hidden" }} />
                </div>
                <div className="toWaypoint">
                    <FaRegDotCircle />
                    <input
                        ref={toRef}
                        id="firstToRef"
                        placeholder="To where?"
                        type="text"
                        className="toRef"
                    ></input>
                    <FaRegTimesCircle style={{ fontSize: "22px" }} />
                </div>
                {waypointsNum - 2 > 0 ? (
                    [...Array(waypointsNum - 2)].map(
                        (wp, i) => (
                            <div className="toWaypoint" key={i}>
                                <FaRegDotCircle />
                                <input
                                onChange={(e) =>
                                    setWaypointValues(
                                        waypointValues.map(
                                            (item, j) => {
                                                if ( j === i + 1) {
                                                    item = e.target.value; //update waypoint value of that particular field
                                                } else {
                                                    item = item; //keep the value of all other waypoint values
                                                }
                                            }
                                        )
                                    )
                                }
                                    ref={toRef}
                                    placeholder="To where?"
                                    type="text"
                                    className="toRef"
                                    value={
                                        waypointValues[i + 1]
                                    }
                                ></input>
                                <FaRegTimesCircle style={{ fontSize: "22px" }} />
                            </div>
                        )
                    )
                ) : (
                    <></>
                )}

            </div>
            <div className="waypointOptions">
                <button onClick={(e) => addWaypoint(e)}>Add Waypoint</button>
                <button>Reset</button>
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