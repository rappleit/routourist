import '../styles/rightSidebar.css';
import { FaAngleDoubleRight, FaCloudSun, FaTrafficLight, FaBalanceScale, FaUsers, FaExclamationTriangle } from "react-icons/fa";
import { IoLeafSharp, IoLocationSharp, IoWarning, IoSaveSharp, IoSave } from "react-icons/io5";


const RightSidebar = ({
    showRightSidebar, 
    setShowRightSideBar,
    currentRoute
}) => {

    return (
        <div className="rightSidebar">
            <button className="closeRightSidebarButton" onClick={() => setShowRightSideBar(!showRightSidebar)}><FaAngleDoubleRight /></button>
            {
                (Object.keys(currentRoute).length === 0) ? 
                <div className="warningBox">
                    <FaExclamationTriangle />
                    <h3>Please create a route first!</h3>
                </div> :
                <div>
                    <div className="impactSection section">
                <h3><IoLeafSharp /> Environmental Impact</h3>

            </div>
            <div className="discoverSection section">
                <h3><IoLocationSharp /> Discover</h3>
                <button className="sectionButton">Show nearby attractions</button>
            </div>
            <div className="noteSection section">
                <h3><IoWarning /> Things to note</h3>
                <div className="notesContainer">
                    <button className="notesCategory">
                        <FaCloudSun className="notesIcon"/>
                        <p>Weather</p>
                    </button>
                    <button className="notesCategory">
                        <FaTrafficLight className="notesIcon"/>
                        <p>Traffic</p>
                    </button>
                    <button className="notesCategory">
                        <FaBalanceScale className="notesIcon"/>
                        <p>Laws</p>
                    </button>
                    <button className="notesCategory">
                        <FaUsers className="notesIcon"/>
                        <p>Culture</p>
                    </button>
                </div>
            </div>
            <div className="saveSection section">
                <h3><IoSaveSharp /> Save and Share</h3>
                <input
                    type="text"
                    placeholder='Enter a name for your route'></input>
                    <button className="sectionButton">Save Route</button>
            </div>
                </div>
            }
            
        </div>
    );
}

export default RightSidebar;