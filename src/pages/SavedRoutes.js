import { useEffect, useState } from 'react';
import '../styles/savedroutes.css';
import { getDatabase, onValue, ref } from '@firebase/database';
import { UserAuth } from '../context/AuthContext';
import { FaCar, FaMapPin, FaAngleLeft } from "react-icons/fa";
import SavedRouteDetail from '../components/SavedRouteDetail';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router';

const SavedRoutes = ({

}) => {
    const { user } = UserAuth();

    const [savedRoutes, setSavedRoutes] = useState();
    const [numSavedRoutes, setNumSavedRoutes] = useState("Loading...");

    const [isDetailView, setIsDetailView] = useState(false); //toggle between all saved routes and saved route detail view
    const [selectedID, setSelectedID] = useState(null);

    const retrieveSavedRoutes = () => {
        const db = getDatabase();
        const savedRoutesRef = ref(db, "savedroutes/" + user.uid);
        onValue(savedRoutesRef, (snapshot) => {
            console.log(snapshot.val());
            setSavedRoutes(snapshot.val());
            setNumSavedRoutes(snapshot.size);
        });
    }


    useEffect(() => {
        retrieveSavedRoutes();
    }, [numSavedRoutes])

    const handleSelectSavedRoute = (id) => {
        setSelectedID(id);
        setIsDetailView(true);
    }

    const navigate = useNavigate();

    const fetchSavedRoute = () => {
        localStorage.setItem("routeName", savedRoutes[selectedID].name);
        localStorage.setItem("routeRequest", JSON.stringify(savedRoutes[selectedID].route));
        navigate('/map');
        Store.addNotification({
            title: "Generating...",
            message: "Loading Route " + savedRoutes[selectedID].name,
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


    return (
        <div className="savedRoutesPage">
            <div className="savedRoutesHeader">
                <div className="savedRoutesHeaderLeft">
                    <h1>
                        {(!isDetailView) ? `Saved Routes (${numSavedRoutes})` :
                            (selectedID != null) ? savedRoutes[selectedID].name :
                                "-"
                        }
                    </h1>
                    {(isDetailView) ? <button className="backToSavedRoutesButton" onClick={() => setIsDetailView(false)}><FaAngleLeft className="backButtonIcon" /> Back</button> : <></>}
                </div>
                {(isDetailView) ? <button className="viewButton" onClick={() => fetchSavedRoute()}>View Route in Map</button> : <></>}
               
            </div>
            {(isDetailView) ?
                <SavedRouteDetail {...{ setIsDetailView, savedRoutes, selectedID }} />
                : <div className="savedRoutesContainer">
                    {(savedRoutes) ? (Object.keys(savedRoutes)).map((routeID, i) => (
                        <div className="savedRoutesCard" key={i} onClick={() => handleSelectSavedRoute(routeID)}>
                            <img src="/assets/MapThumbnailSG.png" alt="" />
                            <h3>{savedRoutes[routeID].name}</h3>
                            <p><span className="savedRouteCardInfoHeader"><FaCar /> Transport:</span> {savedRoutes[routeID].route.travelMode}</p>
                            <p><span className="savedRouteCardInfoHeader"><FaMapPin /> From:</span> {savedRoutes[routeID].route.origin.name}</p>
                        </div>
                    )) : <></>}
                </div>}
        </div>
    );
}

export default SavedRoutes;