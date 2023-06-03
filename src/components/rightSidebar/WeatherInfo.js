import {FaCloudSun} from "react-icons/fa";
import {TiMediaPlayOutline, TiMediaFastForwardOutline} from "react-icons/ti";

const WeatherInfo = ({
    setView,
    weatherForecasts,
    setWeatherForecasts,
    handleWeatherForecastClick,
}) => {
    return (
        <div className="weatherInfo">
            <div className="viewHeader">
                <div className="viewTitle">
                    <FaCloudSun />
                    <h3>Weather Info</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>
                    Back
                </button>
            </div>
            <div id="weatherForecasts">
                {weatherForecasts["options"].map((option) => (
                    <input
                        type="button"
                        id={`${option}WeatherForecasts`}
                        // className={
                        //     selectedButton === option ? "selected" : ""
                        // }
                        value={option}
                        onClick={() => handleWeatherForecastClick(option)}
                    />
                ))}
                <TiMediaPlayOutline />
                <TiMediaFastForwardOutline />
                <p id="weatherForecastNotification">
                    {weatherForecasts["active"] === ""
                        ? "Please select 2 hour or 24 hour"
                        : weatherForecasts["notification"]}
                </p>
                <input
                    type="button"
                    value="Clear"
                    onClick={() => {
                        setWeatherForecasts((prevForecasts) => {
                            return {
                                ...prevForecasts,
                                active: "",
                            };
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default WeatherInfo;
