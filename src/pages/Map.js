import { useEffect, useRef, useState } from "react";
import '../styles/map.css';
import { Helmet } from "react-helmet";
import LeftSidebar from "../components/LeftSidebar";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import RightSidebar from "../components/rightSidebar/RightSidebar";
import { UserAuth } from '../context/AuthContext';


const Map = () => {
    //user information
    const { user } = UserAuth();

    const autoCompleteOptions = {
        componentRestrictions: { country: "sg" },
    };

    //sidebars
    const [showLeftSidebar, setShowLeftSideBar] = useState(true);
    const [showRightSidebar, setShowRightSideBar] = useState(false);

    const fromRef = useRef();
    const toRef = useRef();

    const [glayers, setGLayers] = useState(null);
    const [gmap, setGMap] = useState(null);
    const [gdirectionsService, setGDirectionsService] = useState(null);
    const [gplacesSearch, setGPlacesSearch] = useState(null);
    const [gdestAutoComplete, setGDestAutoComplete] = useState(null);
    const [markersPolylines, setMarkersPolylines] = useState([]);
    const [attractionMarkers, setAttractionMarkers] = useState([]);
    const [lat_lngArray, setLat_LngArray] = useState([]);

    const [isAttractionsDropdownOpen, setIsAttractionsDropdownOpen] =
        useState(false);
    const allCategories = [
        "Water Activities",
        "SAFRA Centres",
        "Monuments",
        "Food",
        "Museums",
        "Skyrise Greenery",
        "Tourist Attractions",
        "Historic Sites",
        "Park",
        "Green Mark Buildings",
        "Rent Bicycles",
        "Sustainable Hotels",
        "Shell Recharge/Greenlots (EV)",
        "BlueSG (EV)",
    ];

    const [waypointsNum, setWaypointsNum] = useState(1);
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const [waypointValues, setWaypointValues] = useState([""]);
    const google = (window.google = window.google ? window.google : {});

    //FOR SAVING ROUTES
    const [currentRoute, setCurrentRoute] = useState({});
    const [currentRouteOverview, setCurrentRouteOverview] = useState("");
    const [savedRouteName, setSavedRouteName] = useState("");



    if (typeof window != "undefined") {

        window.initMap = () => {
            /**
             * Initializes the Google Map, adds event listener for click event,
             * initializes the DirectionsService and Autocomplete objects for the source and destination inputs, and initializes the PlacesService
             *
             * Note:
             * Map Styling: https://mapstyle.withgoogle.com/
             * For custom marker images, add {suppressMarkers:true}, https://thewebstorebyg.wordpress.com/2013/01/11/custom-directions-panel-with-google-maps-api-v3/
             */
            const transitLayer = new google.maps.TransitLayer();
            const drivingLayer = new google.maps.TrafficLayer();
            const bicyclingLayer = new google.maps.BicyclingLayer();
            const layers = {
                TRANSIT: transitLayer,
                DRIVING: drivingLayer,
                BICYCLING: bicyclingLayer,
            };
            const map = new google.maps.Map(document.querySelector("#map"), {
                center: { lat: 1.3521, lng: 103.8198 },
                zoom: 12,
                mapId: "741626712eb9af1",
            });
            google.maps.event.addListener(map, "click", function (event) {
                this.setOptions({ scrollwheel: true });
            });
            const directionsService = new google.maps.DirectionsService();
            // For custom marker images, add {suppressMarkers:true}, https://thewebstorebyg.wordpress.com/2013/01/11/custom-directions-panel-with-google-maps-api-v3/

            const sourceAutocomplete = new google.maps.places.Autocomplete(
                document.querySelector("#fromRef"),
                autoCompleteOptions
            );
            const destAutocomplete = new google.maps.places.Autocomplete(
                document.querySelector(".toRef"),
                autoCompleteOptions
            );
            destAutocomplete.addListener('place_changed', function () {
                const firstWaypoint = document.getElementById("firstToRef");
                setWaypointValues(prevWaypoints => prevWaypoints.map((input, i) =>
                    (i === 0 ? firstWaypoint.value : input)
                ))
            });
            
            const placesSearch = new google.maps.places.PlacesService(map);

            setGLayers(layers);
            setGMap(map);
            setGDirectionsService(directionsService);
            setGPlacesSearch(placesSearch);
            setGDestAutoComplete(destAutocomplete);
        };
    }

    const addWaypoint = (e) => {
        /**
         * Increases the number of waypoints, adds an input field for the new waypoint and sets up the corressponding autocomplete for the new input field
         */
        e.preventDefault();
        if (waypointsNum < 8) {
            setWaypointsNum(waypointsNum + 1);
            setWaypointValues(prevWaypoints => [...prevWaypoints, ""])
        } else if (waypointsNum === 8) {
            alert(
                "You may only add up till 8 waypoints"
            );
        }
    };

    //enable Google Autocomplete for all created waypoint input fields
    useEffect(() => {
        if (waypointsNum > 1) {
            const allOtherDestInputs = document.querySelectorAll("input.toRef:not([id^='firstToRef'])");
            for (var j = 0; j < allOtherDestInputs.length; j++) {
                const newDestAutoComplete = new google.maps.places.Autocomplete(
                    allOtherDestInputs[j],
                    autoCompleteOptions
                );
                newDestAutoComplete.addListener('place_changed', function () {
                    setWaypointValues(prevWaypoints => prevWaypoints.map((input, i) =>
                        (i === j ? allOtherDestInputs[j-1].value : input)
                    ))
                });
            }

        }
    }, [waypointsNum]);



const resetWaypoints = (e) => {
    e.preventDefault();
    setWaypointsNum(1);
    if (fromRef.current.value != null) {
        fromRef.current.value = null;
    }
    const firstWaypoint = document.getElementById("firstToRef")
    firstWaypoint.value = null;
    setWaypointValues([""])

};

const calcRoute = (e) => {
    /**
     * Calculates a route based on the user's input, then calls retrieveRoute to retrieve and display the route on the map
     * @returns {void}
     *
     * Note: // Requests using more than 10 waypoints, or waypoint optimization, are billed at a higher rate
     */
    if (e) {
        e.preventDefault();
    }
    const from = document.querySelector("#fromRef").value;
    const waypoints = Array.from(
        document.querySelectorAll("input.toRef")
    ).map((waypoint) => waypoint.value);

    const transportModeMenu = document.querySelector(
        "#transportModeMenuRef"
    );
    const transportMode = transportModeMenu.value.toUpperCase();
    const optimizeRoute =
        document.querySelector("#optimizeRouteRef").checked;

    const reqRoute = {
        request: {
            origin: from,
            destination: waypoints[waypoints.length - 1],
            waypoints: waypoints,
            travelMode: transportMode,
            optimizeWaypoints: optimizeRoute,
        },
    };

    console.log(reqRoute);
    retrieveRoute(reqRoute);
    setShowRightSideBar(true);
};



const clearMap = () => {
    /**
     * Clears all markers and polylines from the map
     * @returns {void}
     */
    if (markersPolylines.length > 0) {
        for (let i = 0; i < markersPolylines.length; i++) {
            if (markersPolylines[i] != null) {
                try {
                    // For polyline, since both won't give errors
                    markersPolylines[i].setMap(null);
                } catch (TypeError) {
                    // For advanced markers
                    markersPolylines[i].map = null;
                }
            }
        }
    }

    if (attractionMarkers.length > 0) {
        for (let i = 0; i < attractionMarkers.length; i++) {
            if (attractionMarkers[i].marker != null) {
                try {
                    attractionMarkers[i].marker.setMap(null);
                } catch (TypeError) {
                    attractionMarkers[i].marker.map = null;
                }
            }
        }
    }
    setAttractionMarkers([]);

    const attractionCategoryChecklist =
        document.querySelectorAll("input.category");
    for (const cat of attractionCategoryChecklist) {
        cat.checked = false;
    }

    setCurrentRoute({});
    setCurrentRouteOverview("");
};

const createRouteString = (result, waypoints) => {
    /**
     * Generates a string representation of a route based on the provided result and waypoints
     * @param {object} result - Result object from a Google Maps Directions API request
     * @param {string[]} waypoints - Array of string waypoints in the route
     * @returns {string} String representation of the route
     */
    const from = result["request"]["origin"]["query"];
    // Formatting name
    let routeString = formatRouteString(from);

    // Eg. From 0>2>3>1, routeArray = location @ 0>...
    const routeArray = result["routes"][0]["waypoint_order"].map((i) => {
        let destination = waypoints[i];
        destination = formatRouteString(destination);
        return destination;
    });
    for (let loc of routeArray.splice(0, routeArray.length - 1)) {
        routeString += loc;
    }
    routeString += routeArray[routeArray.length - 1];
    return routeString.substring(0, routeString.length - 4);
};

const formatRouteString = (locationName) => {
    /**
     * Generates the correct, readable string representation of the location name
     * @param {string} locationName - locationName
     * @returns {string} Formatted representation of the location name
     */
    const locationNameSplit = locationName.split(",");
    return `${locationNameSplit.length > 2
        ? locationNameSplit[1].length > 4
            ? // if word more than 4 letters, takes word
            locationNameSplit[1]
            : // Else takes Postal Code
            // Eg. Suntec City became 3 Temasek Blvd, #1, #327-328, Singapore 038983
            locationNameSplit[locationNameSplit.length - 1]
        : locationNameSplit[0]
        } -> `;
};

const calculatePartialStats = (routeLegsArray, transportMode) => {
    /**
     *Calculates the carbon footprint and duration of a given route
     *@param {Array} routeLegsArray Array of objects representing the legs of the route
     *@param {string} transportMode A string representing the mode of transport for the route
     *@returns {Array} Array containing the total carbon footprint (in kg CO2 equivalent) and the duration (in seconds) of the route
     *
     *References: https://www.bikeradar.com/features/long-reads/cycling-environmental-impact/, https://www.eco-business.com/news/singapores-mrt-lines-be-graded-green-ness/
     */

    // Carbon footprint in kg CO2 equivalent per (passenger km)
    const carbonFootprintBase = {
        "Conventional Car": 0.271,
        "Electric Car": 0.09,
        Bus: 0.051,
        MRT: 0.013,
        "Conventional Bicycle": 0.021,
        "Electric Bicycle": 0.015,
        Walk: 0.056,
    };
    let carbonFootprintCount = 0;
    let duration = 0;

    if (transportMode === "TRANSIT") {
        if (routeLegsArray.length > 1) {
            routeLegsArray = routeLegsArray.map((leg) => leg[0]);
        }

        duration += routeLegsArray
            .map((leg) => leg["duration"]["value"])
            .reduce((total, current) => total + current, 0);

        routeLegsArray
            .map((leg) => leg["steps"])
            .forEach((routeStep) => {
                routeStep.forEach((step) => {
                    let mode = step["instructions"]
                        ? step["instructions"].split(" ")[0]
                        : "Walk";

                    const stepMode =
                        mode === "Subway" || mode === "Tram"
                            ? "MRT"
                            : mode === "Bus"
                                ? "Bus"
                                : "Walk";
                    carbonFootprintCount +=
                        carbonFootprintBase[stepMode] *
                        (step["distance"]["value"] / 1000);
                });
            });
    } else {
        duration += routeLegsArray
            .map((leg) => leg["duration"]["value"])
            .reduce((total, current) => total + current, 0);
        const routeDistance = routeLegsArray
            .map((leg) => leg["distance"]["value"])
            .reduce((total, current) => total + current, 0);
        const stepMode =
            transportMode === "DRIVING"
                ? "Conventional Car"
                : transportMode === "BICYCLING"
                    ? "Conventional Bicycle"
                    : "Walk";
        carbonFootprintCount +=
            carbonFootprintBase[stepMode] * (routeDistance / 1000);
    }

    return [carbonFootprintCount, duration];
};

const calculateStats = (request, carbonFootprintCount, duration) => {
    /**
     * Calculates carbon footprint and duration for a given travel request and mode of transport
     * @param {object} request - Travel request object containing origin, waypoints, optimizeWaypoints, and travelMode properties
     * @param {number} carbonFootprintCount - Total carbon footprint in kg CO2 equivalent emitted for the given travel request
     * @param {number} duration - Total duration for the given travel request, in seconds
     * @returns {void} Does not return anything, but updates the statsPanel with comparison data between the given travel request's transport mode and all other modes of transport
     *
     * Intention: Carbon footprint depending on mode of transport and their cumulative distance + Time as a tradeoff to make informed decisions
     */
    const statsPanel = document.querySelector("#statsPanel");

    const from = request["origin"];
    const waypoints = request["waypoints"];
    const optimizeRoute = request["optimizeWaypoints"];
    const transportMode = request["travelMode"];

    const outputStringArray = [];


    outputStringArray[0] = `Through your ${transportMode} journey, ${carbonFootprintCount.toFixed(
        2
    )} kg CO2e is emitted, taking ${secondsToHms(duration)}<br>`;
    const otherTravelModes = [
        "DRIVING",
        "TRANSIT",
        "WALKING",
        "BICYCLING",
    ].filter((mode) => mode !== transportMode);

    for (let i = 0; i < otherTravelModes.length; i++) {
        let otherDuration = 0;
        let otherCarbonFootprintCount = 0;
        outputStringArray[i + 1] = `${otherTravelModes[i]} `;

        if (otherTravelModes[i] === "TRANSIT") {
            if (waypoints.length > 1) {
                if (optimizeRoute) {
                    const request = {
                        origin: from,
                        destination: waypoints[waypoints.length - 1],
                        waypoints: waypoints
                            .slice(0, waypoints.length)
                            .map((waypoint) => {
                                return {
                                    location: waypoint,
                                    stopover: true,
                                };
                            }),
                        travelMode: "DRIVING",
                        optimizeWaypoints: optimizeRoute,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        region: "SG",
                    };
                    gdirectionsService.route(
                        request,
                        function (result, status) {
                            if (status === "OK") {
                                const waypoints_copy = waypoints.slice();
                                result["routes"][0]["waypoint_order"].map(
                                    (optimalOrder, index) => {
                                        waypoints[index] =
                                            waypoints_copy[optimalOrder];
                                    }
                                );
                            }
                        }
                    );
                }
                setTimeout(() => {
                    waypoints.unshift(from);
                    const routeLegsArray = [];
                    for (let j = 0; j < waypoints.length - 1; j++) {
                        const request = {
                            origin: waypoints[j],
                            destination: waypoints[j + 1],
                            travelMode: "TRANSIT",
                            optimizeWaypoints: optimizeRoute,
                            unitSystem: google.maps.UnitSystem.METRIC,
                            region: "SG",
                        };

                        gdirectionsService.route(
                            request,
                            function (result, status) {
                                if (status === "OK") {
                                    routeLegsArray[j] =
                                        result["routes"][0]["legs"];
                                }
                            }
                        );
                    }
                    setTimeout(() => {
                        const partialData = calculatePartialStats(
                            routeLegsArray,
                            "TRANSIT"
                        );
                        otherCarbonFootprintCount += partialData[0];
                        otherDuration += partialData[1];
                        outputStringArray[i + 1] = compareStats(
                            carbonFootprintCount,
                            otherCarbonFootprintCount,
                            duration,
                            otherDuration,
                            outputStringArray[i + 1]
                        );
                    }, 800);
                }, 800);
            } else {
                const request = {
                    origin: from,
                    destination: waypoints[waypoints.length - 1],
                    waypoints: [],
                    travelMode: otherTravelModes[i],
                    optimizeWaypoints: optimizeRoute,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    region: "SG",
                };
                gdirectionsService.route(
                    request,
                    function (result, status) {
                        if (status === "OK") {
                            const partialData = calculatePartialStats(
                                result["routes"][0]["legs"],
                                otherTravelModes[i]
                            );
                            otherCarbonFootprintCount += partialData[0];
                            otherDuration += partialData[1];
                            outputStringArray[i + 1] = compareStats(
                                carbonFootprintCount,
                                otherCarbonFootprintCount,
                                duration,
                                otherDuration,
                                outputStringArray[i + 1]
                            );
                        }
                    }
                );
            }
        } else {
            const request = {
                origin: from,
                destination: waypoints[waypoints.length - 1],
                waypoints: waypoints
                    .slice(0, waypoints.length)
                    .map((waypoint) => {
                        return {
                            location: waypoint,
                            stopover: true,
                        };
                    }),
                travelMode: otherTravelModes[i],
                optimizeWaypoints: optimizeRoute,
                unitSystem: google.maps.UnitSystem.METRIC,
                region: "SG",
            };
            gdirectionsService.route(
                request,
                async function (result, status) {
                    if (status === "OK") {
                        const partialData = calculatePartialStats(
                            result["routes"][0]["legs"],
                            otherTravelModes[i]
                        );
                        otherCarbonFootprintCount += partialData[0];
                        otherDuration += partialData[1];
                        outputStringArray[i + 1] = compareStats(
                            carbonFootprintCount,
                            otherCarbonFootprintCount,
                            duration,
                            otherDuration,
                            outputStringArray[i + 1]
                        );
                    }
                }
            );
        }
        /*statsPanel.innerHTML = "Generating...";
        setTimeout(() => {
            statsPanel.innerHTML = `<p>${outputStringArray.join("")}</p>`;
            if (!optimizeRoute) {
                statsPanel.innerHTML += `<p><br>Optimize your route now for greater efficiency!`;
            }
        }, 2000);*/
    }
};

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

const compareStats = (
    carbonFootprintCount,
    otherCarbonFootprintCount,
    duration,
    otherDuration,
    outputString
) => {
    /**
     *Compares statistics (carbon footprint and duration of journey) of user's inputted mode of transport with all other modes of transport
     *indicating the percentage difference in emissions and the difference in time.
     *@param {number} carbonFootprintCount - Carbon footprint count to compare with
     *@param {number} otherCarbonFootprintCount - Other carbon footprint count to compare with
     *@param {number} duration - duration to compare with
     *@param {number} otherDuration - Other duration to compare with
     *@param {string} outputString - Output string to append the comparison results
     *@returns {string} Output string indicating the percentage difference in carbon footprint and the difference in time of journey
     */
    if (otherCarbonFootprintCount > carbonFootprintCount) {
        const percentDiff = (
            ((otherCarbonFootprintCount - carbonFootprintCount) /
                carbonFootprintCount) *
            100
        ).toFixed(0);
        outputString += `⬆️ ${percentDiff}% emissions, `;
    } else {
        const percentDiff = (
            ((carbonFootprintCount - otherCarbonFootprintCount) /
                carbonFootprintCount) *
            100
        ).toFixed(0);
        outputString += `⬇️${percentDiff}% emissions, `;
    }

    if (duration > otherDuration) {
        const timeDiff = secondsToHms(duration - otherDuration);
        outputString += `⬇️ ${timeDiff}<br>`;
    } else {
        const timeDiff = secondsToHms(otherDuration - duration);
        outputString += `⬆️${timeDiff}<br>`;
    }
    return outputString;
};

const drawTransitRoute = (
    encodedRoutePolylineArray,
    routeLegsArray,
    routeString
) => {
    /**
     * Draws transit route on the Google Map and displays the route directions in the directionsPanel
     * @param {Array} encodedRoutePolylineArray - Array of encoded polylines representing the route segments
     * @param {Array} routeLegsArray - Array of objects representing the legs of the route
     * @param {string} routeString - A string representing the route directions
     */
    const routeStringSplit = routeString
        .trim()
        .split(" -> ");
    let routeDirections = "";
    const colors = [
        "#e6194b",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#46f0f0",
        "#f032e6",
        "#bcf60c",
        "#fabebe",
        "#008080",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#ffd8b1",
        "#000075",
        "#808080",
        "#ffffff",
        "#000000",
    ];
    for (let i = 0; i < encodedRoutePolylineArray.length; i++) {
        markersPolylines.push(
            new google.maps.Polyline({
                path: google.maps.geometry.encoding.decodePath(
                    encodedRoutePolylineArray[i]
                ),
                strokeColor: colors[i],
                map: gmap,
            })
        );
        markersPolylines.push(
            new google.maps.marker.AdvancedMarkerView({
                position: routeLegsArray[i][0]["start_location"],
                // title: on hover
                content: new google.maps.marker.PinView({
                    scale: 1,
                    background: colors[i],
                    glyph: String.fromCharCode(65 + i),
                }).element,
                map: gmap,
            })
        );
        routeDirections +=
            `<br><br>${String.fromCharCode(65 + i)} (${routeStringSplit[
                i
            ].trim()}) -> ${String.fromCharCode(
                66 + i
            )} (${routeStringSplit[i + 1].trim()})<br>${routeLegsArray[i][0]["distance"]["text"]
            } . About ${routeLegsArray[i][0]["duration"]["text"]} <br>` +
            routeLegsArray[i][0]["steps"]
                .map((step, index) => {
                    if (step["transit"]) {
                        markersPolylines.push(
                            new google.maps.marker.AdvancedMarkerView({
                                position:
                                    step["transit"]["departure_stop"][
                                    "location"
                                    ],
                                content: new google.maps.marker.PinView({
                                    scale: 0.5,
                                    background: colors[i],
                                    glyph: `${String.fromCharCode(65 + i)}${index + 1
                                        }. TD`,
                                }).element,
                                map: gmap,
                            })
                        );
                        markersPolylines.push(
                            new google.maps.marker.AdvancedMarkerView({
                                position:
                                    step["transit"]["arrival_stop"][
                                    "location"
                                    ],
                                content: new google.maps.marker.PinView({
                                    scale: 0.5,
                                    background: colors[i],
                                    glyph: `${String.fromCharCode(65 + i)}${index + 1
                                        }. TA`,
                                }).element,
                                map: gmap,
                            })
                        );
                        return `${index + 1}. Take ${step["transit"]["line"]["name"].length < 4 ||
                            step["transit"]["line"]["name"].includes(
                                "Sentosa"
                            ) ||
                            step["transit"]["line"]["name"].includes(
                                "Shuttle"
                            )
                            ? "BUS"
                            : "MRT"
                            } <b>${step["transit"]["line"]["name"]}</b>  ${step["transit"]["departure_stop"]["name"]
                            } -> ${step["transit"]["arrival_stop"]["name"]
                            } for ${step["transit"]["num_stops"]} ${step["transit"]["num_stops"] > 1
                                ? "stops"
                                : "stop"
                            }
                    ${step["distance"]["text"]}`;
                    }
                    return `${index + 1}. ${step["instructions"]} ${step["distance"]["text"]
                        }`;
                })
                .join("<br>");
    }

    markersPolylines.push(
        new google.maps.marker.AdvancedMarkerView({
            position:
                routeLegsArray[routeLegsArray.length - 1][0][
                "end_location"
                ],
            content: new google.maps.marker.PinView({
                scale: 1,
                background: colors[encodedRoutePolylineArray.length - 1],
                glyph: String.fromCharCode(
                    65 + encodedRoutePolylineArray.length
                ),
            }).element,
            map: gmap,
        })
    );
    document.querySelector("#directionsPanel").innerHTML += routeDirections;
};

const getLat_LngArray = (result) => {
    /**
     * Returns array of latitudes and longitudes from the given Google Maps Directions API result object
     * @param {Object} result - Result object returned by the Google Maps Directions API
     * @returns {Array} Array of latitudes and longitudes from the result object
     *
     * Eg. i % 100 takes every 100th lat_lng from each step, from each leg, from each route
     */

    const lat_lngArray = result["routes"]
        .map((route) =>
            route["legs"].map((leg) =>
                leg["steps"].map((step) =>
                    step["lat_lngs"].filter((info, i) => i % 100 === 0)
                )
            )
        )
        .flat(3);
    return lat_lngArray;
};

const retrieveRoute = (route) => {
    // Retrieve info from route object
    const from = route["request"]["origin"];
    const waypoints = route["request"]["waypoints"];
    const transportMode = route["request"]["travelMode"];
    const optimizeRoute = route["request"]["optimizeWaypoints"];

    const REQUEST = route["request"];
    localStorage.setItem("routeName", "");
    localStorage.setItem("routePath", JSON.stringify(REQUEST));

    let carbonFootprintCount = 0;
    let duration = 0;

    setCategoriesChecked([]);
    clearMap();
    setCurrentRoute(REQUEST);

    const directionsPanel = document.querySelector("#directionsPanel");
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(gmap);
    // Textual display of directions
    directionsRenderer.setPanel(directionsPanel);
    markersPolylines.push(directionsRenderer);
    Object.entries(glayers).forEach(([transportmode, layer]) =>
        transportMode === transportmode
            ? layer.setMap(gmap)
            : layer.setMap(null)
    );

    if (transportMode === "TRANSIT") {
        let routeString = "";

        if (waypoints.length > 1) {
            if (optimizeRoute) {
                // If TRANSIT & >2 & optimize
                // ∴ Uses driving (roads, ∴ Mostly accurate to buses only) & distance(?) to optimize order first
                const request = {
                    origin: from,
                    destination: waypoints[waypoints.length - 1],
                    waypoints: waypoints
                        .slice(0, waypoints.length)
                        .map((waypoint) => {
                            return {
                                location: waypoint,
                                stopover: true,
                            };
                        }),
                    travelMode: "DRIVING",
                    optimizeWaypoints: optimizeRoute,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    region: "SG",
                };
                gdirectionsService.route(
                    request,
                    function (result, status) {
                        if (status === "OK") {
                            const waypoints_copy = waypoints.slice();
                            result["routes"][0]["waypoint_order"].map(
                                (optimalOrder, index) => {
                                    waypoints[index] =
                                        waypoints_copy[optimalOrder];
                                }
                            );
                        } else {
                            directionsPanel.innerHTML = `<h1>${status}</h1>`;
                        }
                    }
                );
            }
            // If TRANSIT & >2
            setTimeout(() => {
                waypoints.unshift(from);
                let encodedRoutePolylineArray = [];
                let routeLegsArray = [];
                for (let i = 0; i < waypoints.length - 1; i++) {
                    const request = {
                        origin: waypoints[i],
                        destination: waypoints[i + 1],
                        travelMode: transportMode,
                        optimizeWaypoints: optimizeRoute,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        region: "SG",
                    };

                    gdirectionsService.route(
                        request,
                        function (result, status) {
                            if (status === "OK") {
                                // ASYNC nature resolves promises with less data faster, so .push doesn't guarantee order.
                                // Specifying order within array guarantees resolved promises will be slotted in that order.
                                encodedRoutePolylineArray[i] =
                                    result["routes"][0][
                                    "overview_polyline"
                                    ];
                                routeLegsArray[i] =
                                    result["routes"][0]["legs"];
                            } else {
                                directionsPanel.innerHTML = `<h1>${request["origin"]} -> ${request["destination"]} failed with a status of ${status}</h1>`;
                            }
                        }
                    );

                    let to = waypoints[i];
                    routeString += formatRouteString(to);
                    if (i === waypoints.length - 2) {
                        to = waypoints[i + 1];
                        routeString += formatRouteString(to);
                    }
                }

                // ASYNC directionsService request
                setTimeout(() => {
                    setCurrentRouteOverview(routeString);
                    localStorage.setItem("routeOverview", routeString);
                    drawTransitRoute(
                        encodedRoutePolylineArray,
                        routeLegsArray,
                        routeString
                    );

                    const latlngArray = routeLegsArray
                        .map((leg) =>
                            leg[0]["steps"].map((step) =>
                                step["lat_lngs"].filter(
                                    (info, i) => i % 100 === 0
                                )
                            )
                        )
                        .flat(2);

                    setLat_LngArray(latlngArray);

                    const partialData = calculatePartialStats(
                        routeLegsArray,
                        transportMode
                    );
                    carbonFootprintCount += partialData[0];
                    duration += partialData[1];
                    calculateStats(REQUEST, carbonFootprintCount, duration);
                }, 800);
            }, 800);
            // If TRANSIT & =2
        } else {
            const request = {
                origin: from,
                destination: waypoints[waypoints.length - 1],
                waypoints: [],
                travelMode: transportMode,
                optimizeWaypoints: optimizeRoute,
                unitSystem: google.maps.UnitSystem.METRIC,
                region: "SG",
            };
            gdirectionsService.route(request, function (result, status) {
                if (status === "OK") {
                    directionsRenderer.setDirections(result);
                    const to = request["destination"];
                    const toString = formatRouteString(to);
                    routeString +=
                        formatRouteString(from) +
                        toString.substring(0, toString.length - 4);
                    setCurrentRouteOverview(routeString);
                    localStorage.setItem("routeOverview", routeString);

                    setLat_LngArray(getLat_LngArray(result));
                    const partialData = calculatePartialStats(
                        result["routes"][0]["legs"],
                        transportMode
                    );
                    carbonFootprintCount += partialData[0];
                    duration += partialData[1];
                    calculateStats(REQUEST, carbonFootprintCount, duration);

                } else {
                    directionsPanel.innerHTML = `<h1>${status}</h1>`;
                }
            });
        }
        // If DRIVING/WALKING/BICYCLING
    } else {
        const request = {
            origin: from,
            destination: waypoints[waypoints.length - 1],
            waypoints: waypoints
                .slice(0, waypoints.length)
                .map((waypoint) => {
                    return {
                        location: waypoint,
                        stopover: true,
                    };
                }),
            travelMode: transportMode,
            optimizeWaypoints: optimizeRoute,
            unitSystem: google.maps.UnitSystem.METRIC,
            region: "SG",
        };
        gdirectionsService.route(request, async function (result, status) {
            if (status === "OK") {
                directionsRenderer.setDirections(result);
                let routeString = createRouteString(result, waypoints);
                setCurrentRouteOverview(routeString);
                localStorage.setItem("routeOverview", routeString);

                setLat_LngArray(getLat_LngArray(result));
                const partialData = calculatePartialStats(
                    result["routes"][0]["legs"],
                    transportMode
                );
                carbonFootprintCount += partialData[0];
                duration += partialData[1];
                calculateStats(REQUEST, carbonFootprintCount, duration);

            } else {
                directionsPanel.innerHTML = `<h1>${status}</h1>`;
            }
        });
    }
};

return (
    <>
        <Helmet>
            <script
                src={
                    "https://maps.googleapis.com/maps/api/js?key=" +
                    "AIzaSyBthJKxacm0pSrgo2yEEM_BUjmIryn8VOI" +
                    "&libraries=places,geometry,marker&v=beta&callback=initMap"
                }
                async
                defer
            ></script>

            <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"></script>
        </Helmet>
        <div className="mapPage">
            <div id="map"></div>
            {
                (showLeftSidebar) ? <LeftSidebar {...{ fromRef, toRef, waypointsNum, setWaypointsNum, waypointValues, setWaypointValues, addWaypoint, calcRoute, currentRouteOverview, currentRoute, showLeftSidebar, setShowLeftSideBar, resetWaypoints}} />
                    :
                    <button className="openLeftSidebarButton" onClick={() => setShowLeftSideBar(!showLeftSidebar)}>
                        <FaChevronRight />
                    </button>
            }
            {
                (showRightSidebar) ? <RightSidebar {...{showRightSidebar, setShowRightSideBar, currentRoute, user}}/> :
                <button className="openRightSidebarButton" onClick={() => setShowRightSideBar(!showRightSidebar)}>
                        <FaChevronLeft />
                    </button>
            }
            
        </div>
    </>

);
}

export default Map;