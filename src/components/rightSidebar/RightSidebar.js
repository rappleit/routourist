import { useState } from 'react';
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
    user
}) => {

    const [view, setView] = useState("main")

    return (
        <div className="rightSidebar">
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
                            <AttractionsView {...{setView}}/>
                        </div>
                        <div style={(view === "weather") ? { display: "block" } : { display: "none" }}>
                            <WeatherInfo {...{setView}}/>
                        </div>
                        <div style={(view === "traffic") ? { display: "block" } : { display: "none" }}>
                            <TrafficInfo {...{setView}}/>
                        </div>
                        <div style={(view === "laws") ? { display: "block" } : { display: "none" }}>
                            <LawsInfo {...{setView}}/>
                        </div>
                        <div style={(view === "culture") ? { display: "block" } : { display: "none" }}>
                            <CultureInfo {...{setView}}/>
                        </div>

                    </div>

            }

        </div>
    );
}

export default RightSidebar;