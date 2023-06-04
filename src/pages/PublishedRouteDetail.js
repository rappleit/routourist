import { get, getDatabase, ref, set } from "@firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../styles/publishedRouteDetail.css';
import { Store } from "react-notifications-component";
import {
    IoLeafSharp,
    IoCheckmarkCircle
} from "react-icons/io5";
import achievementsObj from "../data/achievementsObj";


const PublishedRouteDetail = () => {
    let params = useParams();
    let routeID = params.routeID;
    const navigate = useNavigate();


    const [displayedRoute, setDisplayedRoute] = useState({});
    const [isFetched, setIsFetched] = useState(false);

    const db = getDatabase();
    const retrievedRouteRef = ref(db, "publishedroutes/" + routeID)
    useEffect(() => {
        get(retrievedRouteRef).then((snapshot) => {
            if (snapshot.exists()) {
                setIsFetched(true);
                setDisplayedRoute(snapshot.val());
                console.log(snapshot.val());
            } else {
                setIsFetched(false)
                console.log("Route not found")
            }
        })
    }, [])

    const fetchPublishedRoute = () => {
        localStorage.setItem("routeName", displayedRoute.name);
        localStorage.setItem("routeRequest", JSON.stringify(displayedRoute.route));
        navigate('/map');
        Store.addNotification({
            title: "Generating...",
            message: "Loading Route " + displayedRoute.name,
            type: "warning",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

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

    const copyLink = () => {
        const linkInput = document.querySelector("#shareLinkInput")
        linkInput.select();
        linkInput.setSelectionRange(0, 99999); //for mobile
        navigator.clipboard.writeText(linkInput.value);
        Store.addNotification({
            title: "Success!",
            message: "Link copied!",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }


    if (!isFetched) return null;
    return (
        <div className="publishedRouteDetailPage">
            <div className="pageHeader">
                <div className="pageHeaderLeft">
                    <h1>{displayedRoute.name}</h1>
                    <button className="backButton" onClick={() => navigate("/routelibrary")}>Back</button>
                </div>
                <div className="pageHeaderRight">
                    <p>Created by: {(displayedRoute.type === "Preset") ? "Team Routourist" : displayedRoute.author}</p>
                    <button className="viewButton" onClick={() => fetchPublishedRoute()}>View On Map</button>
                </div>
            </div>
            <div className="pageContent">
                <div className="leftSubPageContent subPageContent">
                    <div className="routeTagsContainer">
                        <p className="routeTag">{displayedRoute.type}</p>
                        <p className="routeTag">{displayedRoute.category}</p>
                    </div>
                    <div className="routeSubInfoContainer">
                        <p className="routeSubInfo"><span>Country</span>: {displayedRoute.country}</p>
                        <p className="routeSubInfo"><span>Tranport Mode</span>: {displayedRoute.route.travelMode.charAt(0) + displayedRoute.route.travelMode.slice(1).toLowerCase()}</p>
                    </div>
                    <div className="routeInfoContainer">
                        <h4>Description:</h4>
                        <p className="routeDesc">{displayedRoute.desc}</p>
                    </div>

                    <div className="routeInfoContainer">
                        <h4>Destinations:</h4>
                        {(displayedRoute.route.waypoints[0].name === displayedRoute.route.origin.name) ?
                            <div className="routeWaypointsContainer">
                                {displayedRoute.route.waypoints.map((wp, i) => (
                                    <div className="routeWaypointCard" key={i}>
                                        <h4>{wp.name}</h4>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="routeWaypointsContainer">
                                <div className="routeWaypointCard">
                                    <h4>{displayedRoute.route.origin.name}</h4>
                                </div>
                                {
                                    displayedRoute.route.waypoints.map((wp, i) => (
                                        <div className="routeWaypointCard" key={i}>
                                            <h4>{wp.name}</h4>
                                        </div>
                                    ))
                                }
                            </div>
                        }

                    </div>

                </div>
                <div className="rightSubPageContent subPageContent">
                    <div className="scoreContainer">
                        <p><IoLeafSharp /> Sustainability Score</p>
                        <h4>{displayedRoute.score}</h4>
                    </div>
                    <div className="routeImpactContainer">
                        <h4>Carbon Emissions</h4>
                        <p className="routeEmissionsNum">{displayedRoute.carbonEmissions.toFixed(2)} CO2 kg</p>
                        <p>For a ~{secondsToHms(displayedRoute.duration)} journey</p>
                    </div>
                    <div className="routeBadgesContainer">
                        <h3>Badges</h3>
                        {(displayedRoute.score > 0) ?
                            displayedRoute.achievements.map((badge, i) => (
                                <div className="routeBadgeItem" key={i}>
                                    <h5><IoCheckmarkCircle /> {achievementsObj[badge].title}</h5>
                                    <p>{achievementsObj[badge].desc}</p>
                                </div>
                            ))
                            :
                            <div className="routeBadgeItem noBadge">
                                <h5>This route has no badges</h5>
                            </div>}
                    </div>
                    <div className="routeShareContainer">
                        <h3>Share Route</h3>
                        <div className="shareLinkContainer">
                            <input
                                type="text" value={window.location.href} id="shareLinkInput" readonly>
                            </input>
                            <button onClick={() => copyLink()}>Copy Link</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default PublishedRouteDetail;