const DirectionsOverview = ({
    currentRouteOverview,
    currentRoute,
    
}) => {
    return ( 
        <div className="directionsOverview">
            <h3>Directions</h3>
            {(currentRouteOverview != "") ? (
                <div>
                    <p className="routeOverviewTitle">{currentRoute["travelMode"]}:</p>
                    <p>{currentRouteOverview}</p>
                    <button>See full directions</button>
                </div>
                
            ) : (
                <p style={{fontStyle: "italic"}}>Please create a route first!</p>
            )}
            
        </div>
     );
}
 
export default DirectionsOverview;