import { FaUsers } from "react-icons/fa";


const CultureInfo = ({
    setView
}) => {
    return ( 
        <div className="cultureInfo">
            <div className="viewHeader">
                <div className="viewTitle">
                    <FaUsers />
                    <h3>Local Culture</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>Back</button>
            </div>
        </div>
     );
}
 
export default CultureInfo;