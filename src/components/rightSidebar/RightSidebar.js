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
    IoBus,
    IoInformationCircle,
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
    allCategories,
    setCategoriesChecked,
    categoriesChecked,
    handleLayerClick,
    weatherForecasts,
    setWeatherForecasts,
    getForecastDetails,
    createHeatmap,
    clearHeatMap,
}) => {
    const [view, setView] = useState("main");
    const [isTransitLayerActive, setIsTransitLayerActive] = useState(false);
    const [isBikeLayerActive, setIsBikeLayerActive] = useState(false);

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
                        <div className="transportSection section">
                            <h3>
                                <IoBus /> Public Transport Options
                            </h3>
                            <div className="transportCard">
                                <p className="transportCardHeader">
                                    <IoInformationCircle /> Transit System
                                </p>
                                <p className="transportCardNote">
                                    Note: Google Maps Transit Layer may or may
                                    not be supported in the current country
                                </p>
                                <input
                                    type="button"
                                    id="toggleTransitLayer"
                                    value={
                                        isTransitLayerActive
                                            ? "Hide Transit"
                                            : "Show Transit"
                                    }
                                    onClick={() => {
                                        handleLayerClick("Transit");
                                        setIsTransitLayerActive(
                                            !isTransitLayerActive
                                        );
                                    }}
                                />
                            </div>
                            <div className="transportCard">
                                <p className="transportCardHeader">
                                    <IoInformationCircle /> Bicycle paths
                                </p>
                                <p className="transportCardNote">
                                    Note: Google Maps Bicycling Layer may or may
                                    not be supported in the current country
                                </p>
                                <input
                                    type="button"
                                    id="toggleBicyclingLayer"
                                    value={
                                        isBikeLayerActive
                                            ? "Hide Cycling Paths"
                                            : "Show Cycling Paths"
                                    }
                                    onClick={() => {
                                        handleLayerClick("Bicycling");
                                        setIsBikeLayerActive(
                                            !isBikeLayerActive
                                        );
                                    }}
                                />
                            </div>
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
                    </div>
                    <div
                        style={
                            view === "attractions"
                                ? {display: "block"}
                                : {display: "none"}
                        }
                    >
                        <AttractionsView
                            {...{
                                setView,
                                currentRoute,
                                allCategories,
                                setCategoriesChecked,
                                categoriesChecked,
                                createHeatmap,
                                clearHeatMap,
                            }}
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
                                getForecastDetails,
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
