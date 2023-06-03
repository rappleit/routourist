import '../styles/savedRouteDetail.css';
import { FaCar, FaGlobe, FaRegFlag, FaMapPin } from "react-icons/fa";


const SavedRouteDetail = ({
    setIsDetailView,
    savedRoutes,
    selectedID,
    setIsPublishView
}) => {

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

    

    if (!savedRoutes[selectedID]) return null;
    return (
        <div className="savedRouteDetailView">
            <div className="routeSection section">
                <h2>Route</h2>
                <div className="routeOrigin routeItem">
                    <FaRegFlag className="routeItemIcon" />
                    <div>
                        <h4>Starting point:</h4>
                        <p>{savedRoutes[selectedID].route.origin.name}</p>
                    </div>
                </div>
                {(savedRoutes[selectedID].route.waypoints.length > 1) ? 
                    savedRoutes[selectedID].route.waypoints.slice(1).map((wp, i) => (
                    <div className="routeItem" key={i}>
                        <FaMapPin className="routeItemIcon" />
                        <p>{wp.name}</p>
                    </div>
                )) :
                savedRoutes[selectedID].route.waypoints.map((wp, i) => (
                    <div className="routeItem" key={i}>
                        <FaMapPin className="routeItemIcon" />
                        <p>{wp.name}</p>
                    </div>
                )) 
                }

            </div>
            <div className="infoSection section">
                <h2>Environmental Impact</h2>
            <div className="impactDiv subSection">
                    <h4>Carbon Emissions</h4>
                    <p className="emissionsNum">{savedRoutes[selectedID].carbonEmissions.toFixed(2)} CO2 kg</p>
                    <p>For a ~{secondsToHms(savedRoutes[selectedID].duration)} journey</p>
                </div>

                <div className="infoDiv subSection">
                    <h2>Info</h2>
                    <p><span className="infoDivHighlight"><FaGlobe /> Country:</span> Singapore</p>
                    <p><span className="infoDivHighlight"><FaCar /> Mode of Travel:</span> {savedRoutes[selectedID].route.travelMode}</p>
                
                </div>
                
                <div className="actionsDiv subSection">
                    <h2>Share Route</h2>
                    <p>You must first publish the route before sharing!</p>
                    <button className="publishButton" onClick={() => {setIsPublishView(true); setIsDetailView(false)}}>Publish Route</button>
                </div>

            </div>
        </div>
    );
}

export default SavedRouteDetail;