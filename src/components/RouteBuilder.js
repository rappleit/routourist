import {useEffect} from "react";
import {
    FaRegFlag,
    FaRegTimesCircle,
    FaRegDotCircle,
    FaCar,
} from "react-icons/fa";
import {Store} from "react-notifications-component";

const RouteBuilder = ({
    fromPlaceNameRef,
    toPlaceNameRef,
    waypointsNum,
    setWaypointsNum,
    waypointValues,
    setWaypointValues,
    addWaypoint,
    calcRoute,
    resetWaypoints,
}) => {
    const handleInputChange = (index, value) => {
        setWaypointValues((prevInputs) =>
            prevInputs.map((input, i) => (i === index ? `"${value}"` : input))
        );
    };
    const removeWaypoint = (index) => {
        if (index === 0 && waypointsNum === 1) {
            const firstWaypoint = document.querySelector("#firstToPlaceName");
            firstWaypoint.value = null;
            setWaypointValues([""]);
        } else {
            setWaypointsNum(waypointsNum - 1);
            setWaypointValues((prevWaypoints) =>
                prevWaypoints.filter((_, i) => i !== index)
            );
        }
    };

    const createRoute = (e) => {
        e.preventDefault();
        //check if every input field is filled
        let fromValue = document.querySelector("#fromPlaceName").value;
        let toInputs = document.querySelectorAll(".toPlaceName");
        console.log(waypointValues)

        if (fromValue === "") {
            Store.addNotification({
                title: "Error",
                message: "Please fill in all input fields",
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
            return false;
        }
        for (let i = 0; i < toInputs.length; i++) {
            if (toInputs[i].value === "") {
                Store.addNotification({
                    title: "Error",
                    message: "Please fill in all input fields",
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
                return false;
            }
        }
        calcRoute(e);
    };

    return (
        <div className="routeBuilder">
            <div className="waypointsList">
                <div className="startWaypoint">
                    <FaRegFlag />
                    <input
                        ref={fromPlaceNameRef}
                        id="fromPlaceName"
                        placeholder="From where?"
                        type="text"
                    ></input>
                    <input id="fromPlace" type="hidden"></input>
                    <button
                        className="removeWaypointButton"
                        style={{
                            fontSize: "22px",
                            visibility: "hidden",
                            pointerEvents: "none",
                        }}
                    >
                        <FaRegTimesCircle />
                    </button>
                </div>
                {waypointValues.map((wp, i) => (
                    <div className="toWaypoint" key={i}>
                        <FaRegDotCircle />
                        <input
                            ref={toPlaceNameRef}
                            id={i === 0 ? "firstToPlaceName" : ""}
                            placeholder="To where?"
                            type="text"
                            className="toPlaceName"
                            value={wp !== "" ? JSON.parse(wp)["name"] : ""}
                            onChange={(e) =>
                                handleInputChange(i, e.target.value)
                            }
                        ></input>
                        <input
                            className="toPlace"
                            type="hidden"
                            value={wp}
                        ></input>
                        <button
                            className="removeWaypointButton"
                            onClick={() => {
                                removeWaypoint(i);
                            }}
                        >
                            <FaRegTimesCircle style={{fontSize: "22px"}} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="waypointOptions">
                <button onClick={(e) => addWaypoint(e)}>Add Waypoint</button>
                <button onClick={(e) => resetWaypoints(e)}>Reset</button>
            </div>
            <div className="transportModeList">
                <h3>Transport Mode</h3>
                <select id="transportModeMenu" name="ModeTransport">
                    <option value="DRIVING">Driving</option>
                    <option value="TRANSIT">Transit</option>
                    <option value="WALKING">Walk</option>
                    <option value="BICYCLING">Cycling</option>
                </select>
            </div>
            <div className="optimizeRouteContainer">
                <div className="optimizeRouteFlex">
                    <label htmlFor="OptimizeChoice">Optimise Route</label>
                    <input
                        id="optimizeRoute"
                        type="checkbox"
                        name="OptimizeChoice"
                        value="OptimizeChoice"
                    ></input>
                </div>
                <p>
                    You can reduce your carbon footprint by optmising your
                    route!{" "}
                </p>
            </div>
            <button
                className="createRouteButton"
                onClick={(e) => createRoute(e)}
            >
                Create Route
            </button>
        </div>
    );
};

export default RouteBuilder;
