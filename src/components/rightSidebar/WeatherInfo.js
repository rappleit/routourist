import {FaCloudSun} from "react-icons/fa";
import "../../styles/weatherInfo.css";

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
                <div className="weatherButtons">
                    {weatherForecasts["options"].map((option, i) => (
                        <input
                            type="button"
                            id={`${option}WeatherForecasts`}
                            className={
                                weatherForecasts.active === option
                                    ? "weatherSelected"
                                    : ""
                            }
                            value={option}
                            onClick={() => handleWeatherForecastClick(option)}
                            key={i}
                        />
                    ))}
                </div>

                <p className="weatherForecastNotification">
                    {weatherForecasts["notification"]}
                </p>
                <input
                    className="clearWeatherButton"
                    type="button"
                    value="Clear Weather View"
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
