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

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const hoursOfDay = [
        "0000",
        "0100",
        "0200",
        "0300",
        "0400",
        "0500",
        "0600",
        "0700",
        "0800",
        "0900",
        "1000",
        "1100",
        "1200",
        "1300",
        "1400",
        "1500",
        "1600",
        "1700",
        "1800",
        "1900",
        "2000",
        "2100",
        "2200",
        "2300",
    ];

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
                            <div className="attractionsDropdownLabel" onClick={() => setIsDropdownActive(!isDropdownActive)}>
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
                                                type="checkbox" />
                                            {cat}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="crowdMap">
                            <h4>Crowd Map</h4>
                            <p>Choose a day</p>
                            <select id="dayDropDown">
                                <option selected disabled>Please select a day</option>
                                {daysOfWeek.map((day) => (
                                    <option value={day}>{day}</option>
                                ))}
                            </select>

                            <p>Choose a time</p>
                            <select id="dayDropDown">
                                <option selected disabled>Please select a time</option>
                                {hoursOfDay.map((day) => (
                                    <option value={day}>{day}</option>
                                ))}
                            </select>
                            <input
                                type="button"
                                id="crowdMapBtn"
                                value="Show Crowd Heatmap"
                                onClick={createCrowdMapControls}
                            />

                        </div>

                    </div>
                </div>
            }

        </div>
    );
};

export default AttractionsView;
