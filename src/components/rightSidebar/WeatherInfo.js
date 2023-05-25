import { FaCloudSun } from "react-icons/fa";


const WeatherInfo = ({
    setView
}) => {
    return ( 
        <div className="weatherInfo">
            <div className="viewHeader">
                <div className="viewTitle">
                    <FaCloudSun />
                    <h3>Weather Info</h3>
                </div>
                
                <button className="backButton" onClick={() => setView("main")}>Back</button>
            </div>
            
        </div>
     );
}
 
export default WeatherInfo;