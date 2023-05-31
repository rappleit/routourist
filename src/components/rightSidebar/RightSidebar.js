import { useEffect, useState } from 'react';
import '../../styles/rightSidebar.css';
import { FaAngleDoubleRight, FaCloudSun, FaTrafficLight, FaBalanceScale, FaUsers, FaExclamationTriangle } from "react-icons/fa";
import { IoLeafSharp, IoLocationSharp, IoWarning, IoSaveSharp, IoSave } from "react-icons/io5";
import { Link } from 'react-router-dom';
import WeatherInfo from './WeatherInfo';
import TrafficInfo from './TrafficInfo';
import LawsInfo from './LawsInfo';
import CultureInfo from './CultureInfo';
import AttractionsView from './AttractionsView';


const RightSidebar = ({
    showRightSidebar,
    setShowRightSideBar,
    currentRoute,
    user,
    travelStats
}) => {

    const [view, setView] = useState("main")

    const secondsToHms = (d) => {
        /**
         *Converts seconds into hours, minutes, seconds format
         *@param {number} d - Seconds to convert
         *@returns {string} Converted time in the specified hours, minutes, seconds format
         */
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor((d % 3600) / 60);
        var s = Math.floor((d % 3600) % 60);
        // Initial: 5 hours, 16 minutes, 41 seconds
        var hDisplay = h > 0 ? h + (h === 1 ? " hr " : " hrs ") : "";
        var mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
        var sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
        return hDisplay + mDisplay;
    };

    const getImpact = (mode) => {

        switch (mode) {
            case "DRIVING":
                return { "carbonEmissions": travelStats.DRIVING["carbonFootprintCount"], "duration": travelStats.DRIVING["travelDuration"] };
            case "TRANSIT":
                return { "carbonEmissions": travelStats.TRANSIT["carbonFootprintCount"], "duration": travelStats.TRANSIT["travelDuration"] };

            case "WALKING":
                return { "carbonEmissions": travelStats.WALKING["carbonFootprintCount"], "duration": travelStats.WALKING["travelDuration"] };

            case "BICYCLING":
                return { "carbonEmissions": travelStats.BICYCLING["carbonFootprintCount"], "duration": travelStats.BICYCLING["travelDuration"] };
        }
    }

    const getStatComparison = (currentMode, otherMode) => {

        let currentModeEmission = getImpact(currentMode).carbonEmissions;
        let otherModeEmission = getImpact(otherMode).carbonEmissions;
        return (((currentModeEmission - otherModeEmission) / currentModeEmission) * 100).toFixed(2);

    }

    const getOtherTransport = (currentMode) => {
        const modes = ["DRIVING", "TRANSIT", "BICYCLING", "WALKING"]
        return modes.filter(item => item != currentMode)
    }

    return (
        <div className="rightSidebar">
            <div className="rightSidebarContainer">
                <button className="closeRightSidebarButton" onClick={() => setShowRightSideBar(!showRightSidebar)}><FaAngleDoubleRight /></button>
                {
                    (Object.keys(currentRoute).length === 0) ?
                        <div className="warningBox">
                            <FaExclamationTriangle />
                            <h3>Please create a route first!</h3>
                        </div> :
                        <div>
                            <div className="mainView" style={(view === "main") ? { display: "block" } : { display: "none" }}>
                                <div className="impactSection section">
                                    <h3><IoLeafSharp /> Environmental Impact</h3>
                                    <div className="impactContent">
                                        <p className="currentMode">For {currentRoute["travelMode"]}</p>
                                        <div className="impactCard">
                                            <p className="impactCardHeader">Carbon Emissions</p>
                                            <h3>{getImpact(currentRoute["travelMode"]).carbonEmissions.toFixed(2)} kg CO2</h3>
                                            <p className="impactCardDuration">For a ~{secondsToHms(getImpact(currentRoute["travelMode"]).duration)} journey</p>
                                        </div>
                                        <p className="currentMode">For other modes:</p>
                                        <div className="otherImpactCard">

                                            {
                                                getOtherTransport(currentRoute["travelMode"]).map(mode => (
                                                    (getImpact(mode).carbonEmissions === 0) ? (<p>Generating...</p>) :
                                                    (<p><span className="otherModeHeader">{mode}</span>: {getImpact(mode).carbonEmissions.toFixed(2)} kg CO2 {(getStatComparison(currentRoute["travelMode"], mode) > 0 ?
                                                        <span className="statComparison positive">(⬇️{getStatComparison(currentRoute["travelMode"], mode)}%)</span> :
                                                        <span className="statComparison negative">({(getStatComparison(currentRoute["travelMode"], mode) == 0.00) ? "➖" : "⬆️"}{getStatComparison(currentRoute["travelMode"], mode)}%)</span>
                                                    )}</p>)
                                                ))

                                            }


                                        </div>
                                    </div>

                                </div>
                                <div className="discoverSection section">
                                    <h3><IoLocationSharp /> Discover</h3>
                                    <button className="sectionButton" onClick={() => setView("attractions")}>Show nearby attractions</button>
                                </div>
                                <div className="noteSection section">
                                    <h3><IoWarning /> Things to note</h3>
                                    <div className="notesContainer">
                                        <button className="notesCategory" onClick={() => setView("weather")}>
                                            <FaCloudSun className="notesIcon" />
                                            <p>Weather</p>
                                        </button>
                                        <button className="notesCategory" onClick={() => setView("traffic")}>
                                            <FaTrafficLight className="notesIcon" />
                                            <p>Traffic</p>
                                        </button>
                                        <button className="notesCategory" onClick={() => setView("laws")}>
                                            <FaBalanceScale className="notesIcon" />
                                            <p>Laws</p>
                                        </button>
                                        <button className="notesCategory" onClick={() => setView("culture")}>
                                            <FaUsers className="notesIcon" />
                                            <p>Culture</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="saveSection section">
                                    <h3><IoSaveSharp /> Save and Share</h3>
                                    {
                                        (!user) ?
                                            <div>
                                                <p>Please <Link to="/login">login</Link> to save your route</p>
                                            </div> :
                                            <div>

                                                <input
                                                    type="text"
                                                    placeholder='Enter a name for your route'></input>
                                                <button className="sectionButton">Save Route</button>
                                            </div>
                                    }

                                </div>
                            </div>
                            <div style={(view === "attractions") ? { display: "block" } : { display: "none" }}>
                                <AttractionsView {...{ setView }} />
                            </div>
                            <div style={(view === "weather") ? { display: "block" } : { display: "none" }}>
                                <WeatherInfo {...{ setView }} />
                            </div>
                            <div style={(view === "traffic") ? { display: "block" } : { display: "none" }}>
                                <TrafficInfo {...{ setView }} />
                            </div>
                            <div style={(view === "laws") ? { display: "block" } : { display: "none" }}>
                                <LawsInfo {...{ setView }} />
                            </div>
                            <div style={(view === "culture") ? { display: "block" } : { display: "none" }}>
                                <CultureInfo {...{ setView }} />
                            </div>

                        </div>

                }
            </div>


        </div>
    );
}

export default RightSidebar;