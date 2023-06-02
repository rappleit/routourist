import {IoLocationSharp} from "react-icons/io5";

const AttractionsView = ({setView, createCrowdMapControls}) => {
    return (
        <div className="attractionsView">
            <div className="viewHeader">
                <div className="viewTitle">
                    <IoLocationSharp />
                    <h3>Nearby Attractions</h3>
                </div>
                <button className="backButton" onClick={() => setView("main")}>
                    Back
                </button>
            </div>
            {/* Wont be HTML here, only generated under nearbyPlaceSearch when route retrieved */}
            {/* <div id="crowdMap">
                <input
                    type="button"
                    id="crowdMapBtn"
                    value="Crowd Overview"
                    onClick={createCrowdMapControls}
                />
            </div> */}
        </div>
    );
};

export default AttractionsView;
