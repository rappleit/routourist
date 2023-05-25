import { IoLocationSharp } from "react-icons/io5";


const AttractionsView = ({
    setView
}) => {
    return (
        <div className="attractionsView">
            <div className="viewHeader">
                <div className="viewTitle">
                    <IoLocationSharp />
                    <h3>Nearby Attractions</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>Back</button>
            </div>
        </div>
    );
}

export default AttractionsView;