import { FaAngleLeft } from "react-icons/fa";


const DirectionsPanel = ({
    currentRouteOverview,
    currentRoute,
    setView
}) => {
    return (
        <div className="directionsPanelContainer">
            <div className="directionsPanelHeader">
                <h3>Directions</h3>
                <button onClick={() => setView("routeBuilder")}><FaAngleLeft /></button>
            </div>
            <div className="directionsSummary">
                <p className="directionsTravelMode">{currentRoute["travelMode"]}:</p>
                <p className="routeOverview">{currentRouteOverview}</p>
            </div>
            <div id="directionsPanel"></div>
        </div>
    );
}

export default DirectionsPanel;