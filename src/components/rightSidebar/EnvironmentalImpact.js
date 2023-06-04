import "../../styles/environmentalImpact.css";
import {
    FaRegLightbulb,
    FaExclamationTriangle,
    FaCar,
    FaBus,
    FaWalking,
    FaBicycle,
} from "react-icons/fa";

const EnvironmentalImpact = ({currentRoute, travelStats}) => {
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
                return {
                    carbonEmissions:
                        travelStats.DRIVING["carbonFootprintCount"],
                    duration: travelStats.DRIVING["travelDuration"],
                };
            case "TRANSIT":
                return {
                    carbonEmissions:
                        travelStats.TRANSIT["carbonFootprintCount"],
                    duration: travelStats.TRANSIT["travelDuration"],
                };

            case "WALKING":
                return {
                    carbonEmissions:
                        travelStats.WALKING["carbonFootprintCount"],
                    duration: travelStats.WALKING["travelDuration"],
                };

            case "BICYCLING":
                return {
                    carbonEmissions:
                        travelStats.BICYCLING["carbonFootprintCount"],
                    duration: travelStats.BICYCLING["travelDuration"],
                };
        }
    };

    const getStatComparison = (currentMode, otherMode) => {
        let currentModeEmission = getImpact(currentMode).carbonEmissions;
        let otherModeEmission = getImpact(otherMode).carbonEmissions;
        return (
            ((currentModeEmission - otherModeEmission) / currentModeEmission) *
            100
        ).toFixed(2);
    };

    const getOtherTransport = (currentMode) => {
        const modes = ["DRIVING", "TRANSIT", "BICYCLING", "WALKING"];
        return modes.filter((item) => item != currentMode);
    };

    const getIcon = (mode) => {
        switch (mode) {
            case "DRIVING":
                return <FaCar />;
            case "TRANSIT":
                return <FaBus />;
            case "WALKING":
                return <FaWalking />;
            case "BICYCLING":
                return <FaBicycle />;
            default:
                return <FaCar />;
        }
    };

    return (
        <>
            {Object.keys(currentRoute).length === 0 ? (
                <div className="impactNoticeBox">
                    <p>
                        <FaExclamationTriangle /> Create a route to see how much
                        it will impact the environment!
                    </p>
                </div>
            ) : (
                <div className="impactContent">
                    <p className="currentMode">
                        For {currentRoute["travelMode"]}
                    </p>
                    <div className="impactCard">
                        <p className="impactCardHeader">Carbon Emissions</p>
                        <h3>
                            {getImpact(
                                currentRoute["travelMode"]
                            ).carbonEmissions.toFixed(2)}{" "}
                            kg CO2
                        </h3>
                        <p className="impactCardDuration">
                            For a ~
                            {secondsToHms(
                                getImpact(currentRoute["travelMode"]).duration
                            )}{" "}
                            journey
                        </p>
                    </div>
                    <p className="currentMode">For other modes:</p>
                    <div className="otherImpactCard">
                        {getOtherTransport(currentRoute["travelMode"]).map(
                            (mode, i) =>
                                getImpact(mode).carbonEmissions === 0 ? (
                                    <p key={i}>Generating...</p>
                                ) : (
                                    <p key={i}>
                                        <span>{getIcon(mode)}</span>
                                        <span className="otherModeHeader">
                                            {" "}
                                            {mode}
                                        </span>
                                        :{" "}
                                        {getImpact(
                                            mode
                                        ).carbonEmissions.toFixed(2)}{" "}
                                        kg CO2{" "}
                                        {getStatComparison(
                                            currentRoute["travelMode"],
                                            mode
                                        ) > 0 ? (
                                            <span className="statComparison positive">
                                                (⬇️
                                                {getStatComparison(
                                                    currentRoute["travelMode"],
                                                    mode
                                                )}
                                                %)
                                            </span>
                                        ) : (
                                            <span className="statComparison negative">
                                                (
                                                {getStatComparison(
                                                    currentRoute["travelMode"],
                                                    mode
                                                ) == 0.0
                                                    ? "➖"
                                                    : "⬆️"}
                                                {Math.abs(
                                                    getStatComparison(
                                                        currentRoute[
                                                            "travelMode"
                                                        ],
                                                        mode
                                                    )
                                                )}
                                                %)
                                            </span>
                                        )}
                                        <br />
                                        <span className="otherModeDuration">
                                            (
                                            {secondsToHms(
                                                getImpact(mode).duration
                                            )}
                                            )
                                        </span>
                                    </p>
                                )
                        )}
                    </div>
                    {!currentRoute["optimizeWaypoints"] ? (
                        <p className="optimiseNotice">
                            <FaRegLightbulb /> Optimise your route now for
                            greater efficiency!
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </>
    );
};

export default EnvironmentalImpact;
