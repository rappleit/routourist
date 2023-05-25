import { FaTrafficLight } from "react-icons/fa";


const TrafficInfo = ({
    setView
}) => {
    return (
        <div className="trafficInfo">
            <div className="viewHeader">
                <div className="viewTitle">
                    <FaTrafficLight />
                    <h3>Traffic Conditions</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>Back</button>
            </div>
        </div>
    );
}

export default TrafficInfo;