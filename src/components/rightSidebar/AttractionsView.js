import { IoLocationSharp } from "react-icons/io5";
import { FaExclamationTriangle, FaAngleDown } from "react-icons/fa";
import "../../styles/attractionsView.css";
import { useState } from "react";

const AttractionsView = ({
    setView,
    createCrowdMapControls,
    currentRoute,
    allCategories,
    setCategoriesChecked,
    categoriesChecked }) => {
        
        const [isDropdownActive, setIsDropdownActive] = useState(false);

        const handleCategoryChecked = (e) => {
            if (e.target.checked) {
                setCategoriesChecked((oldArr) => [...oldArr, e.target.name]);
            } else {
                setCategoriesChecked(
                    categoriesChecked.filter((cat) => cat !== e.target.name)
                );
            }
        };

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
            {(Object.keys(currentRoute).length === 0) ?
                <div className="attractionsNoticeBox">
                    <p><FaExclamationTriangle />  Create a route to discover nearby sustainable attractions!</p>
                </div> :
                <div className="attractionsContainer">
                    <div className="attractionsOptions">
                        <div className="attractionsCategoriesDropdown">
                            <div className="attractionsDropdownLabel" onClick={()=>setIsDropdownActive(!isDropdownActive)}>
                                <p>Select category:</p>
                                <FaAngleDown />
                            </div>
                            
                            <ul className={`${(isDropdownActive) ? "activeDropdown" : ""} attractionsDropdownList`}>
                                {allCategories.map((cat, i) => (
                                    <li className="categoryItem" key={i}>
                                        <label>
                                            <input
                                            onChange={(e) =>
                                                handleCategoryChecked(e)
                                            }
                                            className="category"
                                            name={cat}
                                            type="checkbox"/> 
                                            {cat}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </div>
            }
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
