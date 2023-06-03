import {useEffect, useState} from "react";
import "../../styles/rightSidebar.css";
import {
    FaAngleDoubleRight,
    FaCloudSun,
    FaTrafficLight,
    FaBalanceScale,
    FaUsers,
} from "react-icons/fa";
import {
    IoLeafSharp,
    IoLocationSharp,
    IoWarning,
    IoSaveSharp,
    IoSave,
} from "react-icons/io5";
import {Link} from "react-router-dom";
import WeatherInfo from "./WeatherInfo";
import LawsInfo from "./LawsInfo";
import CultureInfo from "./CultureInfo";
import AttractionsView from "./AttractionsView";
import EnvironmentalImpact from "./EnvironmentalImpact";
import SaveRoute from "./SaveRoute";

const RightSidebar = ({
    showRightSidebar,
    setShowRightSideBar,
    currentRoute,
    user,
    travelStats,
    database,
    currentRouteOverview,
    toggleLayerClick,
    weatherForecasts,
    setWeatherForecasts,
    handleWeatherForecastClick,
    createCrowdMapControls,
    crowdMapData,
}) => {
    const [view, setView] = useState("main");
    // (Object.keys(currentRoute).length === 0)
    return (
        <div className="rightSidebar">
            <div className="rightSidebarContainer">
                <button
                    className="closeRightSidebarButton"
                    onClick={() => setShowRightSideBar(!showRightSidebar)}
                >
                    <FaAngleDoubleRight />
                </button>

                <div>
                    <div
                        className="mainView"
                        style={
                            view === "main"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <div className="impactSection section">
                            <h3>
                                <IoLeafSharp /> Environmental Impact
                            </h3>
                            <EnvironmentalImpact
                                {...{currentRoute, travelStats}}
                            />
                        </div>
                        <div className="discoverSection section">
                            <h3>
                                <IoLocationSharp /> Discover
                            </h3>
                            <button
                                className="sectionButton"
                                onClick={() => setView("attractions")}
                            >
                                Show nearby sustainable attractions
                            </button>
                        </div>
                        <div className="noteSection section">
                            <h3>
                                <IoWarning /> Things to note
                            </h3>
                            <div className="notesContainer">
                                <button
                                    className="notesCategory"
                                    onClick={() => setView("weather")}
                                >
                                    <FaCloudSun className="notesIcon" />
                                    <p>Weather</p>
                                </button>
                                <button
                                    className="notesCategory"
                                    onClick={() => setView("laws")}
                                >
                                    <FaBalanceScale className="notesIcon" />
                                    <p>Laws</p>
                                </button>
                                <button
                                    className="notesCategory"
                                    onClick={() => setView("culture")}
                                >
                                    <FaUsers className="notesIcon" />
                                    <p>Culture</p>
                                </button>
                            </div>
                        </div>
                        <div className="saveSection section">
                            <h3>
                                <IoSaveSharp /> Save and Share
                            </h3>
                            <SaveRoute
                                {...{
                                    user,
                                    currentRoute,
                                    database,
                                    currentRouteOverview,
                                    travelStats,
                                }}
                            />
                        </div>
                        <input
                            type="button"
                            id="toggleTransitLayer"
                            value="Transit Layer"
                            onClick={() => toggleLayerClick("Transit")}
                        />
                        <input
                            type="button"
                            id="toggleBicyclingLayer"
                            value="Bicycling Layer"
                            onClick={() => toggleLayerClick("Bicycling")}
                        />
                    </div>
                    <div
                        style={
                            view === "attractions"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <AttractionsView
                            {...{setView, createCrowdMapControls}}
                        />
                    </div>
                    <div
                        style={
                            view === "weather"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <WeatherInfo
                            {...{
                                setView,
                                weatherForecasts,
                                setWeatherForecasts,
                                handleWeatherForecastClick,
                            }}
                        />
                    </div>
                    <div
                        style={
                            view === "laws"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <LawsInfo {...{setView}} />
                    </div>
                    <div
                        style={
                            view === "culture"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <CultureInfo {...{setView}} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
