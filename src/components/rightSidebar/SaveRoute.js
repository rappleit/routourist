import { push, ref, set } from "@firebase/database";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { FaExclamationTriangle } from "react-icons/fa";


const SaveRoute = ({
    user,
    currentRoute,
    database,
    currentRouteOverview,
    travelStats
}) => {

    const [routeName, setRouteName] = useState("")

    const handleSaveRoute = async (e) => {
        e.preventDefault();
        if (routeName != "") {
            const savedRoutesListRef = ref(database, "savedroutes/" + user.uid);
            const newSavedRouteRef = push(savedRoutesListRef);
            try {
                await set(newSavedRouteRef, {
                    name: routeName,
                    overview: currentRouteOverview,
                    route: currentRoute,
                    carbonEmissions: getImpact(currentRoute["travelMode"]).carbonEmissions,
                    duration: getImpact(currentRoute["travelMode"]).duration,
                });
                setRouteName("");
                Store.addNotification({
                    title: "Success!",
                    message: "Your route has successfuly been saved.",
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
            } catch (e) {
                console.log(e.message);
                Store.addNotification({
                    title: "Error",
                    message: e.message,
                    type: "danger",
                    insert: "top",
                    container: "bottom-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            }
        } else {
            Store.addNotification({
                title: "Error",
                message: "Please enter a name for your route",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
            });
        }
    }

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


    if (!user) return (
        <div>
            <p>Please <Link to="/login">login</Link> to save your route</p>
        </div>
    )

    if (Object.keys(currentRoute).length === 0) return (
        <div className="saveNoticeBox">
            <p><FaExclamationTriangle /> Please create a route first!</p>
        </div>
    )

    return (
        <div>
            <input
                type="text"
                placeholder='Enter a name for your route'
                onChange={(e) => setRouteName(e.target.value)}
                value={routeName}
            />
            <button className="sectionButton" onClick={(e) => handleSaveRoute(e)}>Save Route</button>
        </div>

    );
}

export default SaveRoute;