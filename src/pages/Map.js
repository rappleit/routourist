import { useEffect, useRef, useState } from "react";
import "../styles/map.css";
import { Helmet } from "react-helmet";
import LeftSidebar from "../components/LeftSidebar";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import RightSidebar from "../components/rightSidebar/RightSidebar";
import { UserAuth } from "../context/AuthContext";
import { Store } from "react-notifications-component";
import * as Cesium from "cesium";
import ResearchedData from "../data/ResearchedData.json";
import BlueSGData from "../data/BlueSGData.json";
import OneMapData from "../data/OneMapData.json";

const Map = () => {
    //user information
    const { user } = UserAuth();

    const gApiKey = "AIzaSyBthJKxacm0pSrgo2yEEM_BUjmIryn8VOI";
    const google = (window.google = window.google ? window.google : {});
    // const region = document.querySelector(#region) (region="SG")
    // const language = ...
    // const mapCenter = document.querySelector(#regionMapCenter) (hidden, center=mapCenter)
    const gAutoCompleteOptions = {
        componentRestrictions: { country: "SG" },
        // "rating", "user_ratings_total" for data
        fields: ["name", "geometry"],
    };

    //sidebars
    const [showLeftSidebar, setShowLeftSideBar] = useState(true);
    const [showRightSidebar, setShowRightSideBar] = useState(true);

    const fromPlaceNameRef = useRef("");
    const toPlaceNameRef = useRef("");

    const [gmap, setGMap] = useState(null);
    const [gGeocoder, setGGeocoder] = useState(null);
    const [gDirectionsService, setGDirectionsService] = useState(null);
    const originLat_Lng = useRef({});
    const [cesiumMapVisible, setCesiumMapVisible] = useState(false);
    const [cesiumBtnsVisible, setCesiumBtnsVisible] = useState(false);
    const [gMapVisible, setGMapVisible] = useState(true);
    const cesiumCreated = useRef(false);
    const cesiumViewer = useRef(null);
    const rotateCesium = useRef(null);
    const [waypointsNum, setWaypointsNum] = useState(1);
    const [gToAutoComplete, setGToAutoComplete] = useState(null);
    const [weatherForecasts, setWeatherForecasts] = useState([]);
    const [crowdMapData, setCrowdMapData] = useState({
        heatMaps: [],
        heatMapData: [],
        day: null,
        time: null,
    });
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
    const [categoriesChecked, setCategoriesChecked] = useState([]);
    const [waypointValues, setWaypointValues] = useState([""]);

    const [travelStats, setTravelStats] = useState({
        chosen: "",
        DRIVING: { carbonFootprintCount: 0, travelDuration: 0 },
        TRANSIT: { carbonFootprintCount: 0, travelDuration: 0 },
        WALKING: { carbonFootprintCount: 0, travelDuration: 0 },
        BICYCLING: { carbonFootprintCount: 0, travelDuration: 0 },
    });

    /*const travelStats = useRef({
        chosen: "",
        DRIVING: { carbonFootprintCount: 0, travelDuration: 0 },
        TRANSIT: { carbonFootprintCount: 0, travelDuration: 0 },
        WALKING: { carbonFootprintCount: 0, travelDuration: 0 },
        BICYCLING: { carbonFootprintCount: 0, travelDuration: 0 },
    });*/

    //FOR SAVING ROUTES
    const [currentRoute, setCurrentRoute] = useState({});
    const [currentRouteOverview, setCurrentRouteOverview] = useState("");
    const [savedRouteName, setSavedRouteName] = useState("");



    if (typeof window != "undefined") {
        window.initMap = () => {
            /**
             * Initializes the Google Map, Geocoder, DirectionsService, Autocomplete for the first origin and destination inputs
             * Creates controls for the layers and weather forecast overviews, Gathers user's location using HTML5 geolocation
             *
             * Note:
             * For custom marker images, add {suppressMarkers:true}, https://thewebstorebyg.wordpress.com/2013/01/11/custom-directions-panel-with-google-maps-api-v3/
             */

            const map = new google.maps.Map(document.querySelector("#map"), {
                mapId: "741626712eb9af1",
                center: { lat: 1.3521, lng: 103.8198 },
                zoom: 12,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER,
                },
                zoomControl: false,
                scaleControl: true,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER,
                },
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER,
                },
            });
            google.maps.event.addListener(map, "click", function () {
                this.setOptions({ scrollwheel: true });
            });

            const geocoder = new google.maps.Geocoder();

            const directionsService = new google.maps.DirectionsService();

            const fromAutocomplete = new google.maps.places.Autocomplete(
                document.querySelector("#fromPlaceName"),
                gAutoCompleteOptions
            );
            const toAutocomplete = new google.maps.places.Autocomplete(
                document.querySelector("#firstToPlaceName"),
                gAutoCompleteOptions
            );

            autocompleteAddListener(fromAutocomplete, 0);
            autocompleteAddListener(toAutocomplete, waypointsNum);
            // createLayersControl();
            // createWeatherControl();

            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        // speed, heading, accuracy
                        const { latitude, longitude } = position["coords"];
                        originLat_Lng.current = {
                            lat: latitude,
                            lng: longitude,
                        };
                        // When gps tracker gets near to destination, start vector map camera animation?
                        new google.maps.Marker({
                            position: originLat_Lng.current,
                            map: gmap,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 6,
                                fillOpacity: 1,
                                strokeWeight: 3,
                                fillColor: "#5384ED",
                                strokeColor: "#ffffff",
                            },
                        });
                    },
                    (error) => {
                        switch (error["code"]) {
                            case 1:
                                console.log("Permission denied");
                                return;
                            case 2:
                                console.log("Position unavailable");
                                return;
                            case 3:
                                console.log(
                                    "Unable to retrieve the location information within timeout"
                                );
                                return;
                            default:
                                console.log("Unknown error");
                                return;
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        // Doesn't cache position
                        maximumAge: 0,
                    }
                );
            } else {
                console.log("Your browser doesn't support Geolocation");
            }

            setGMap(map);
            setGGeocoder(geocoder);
            setGDirectionsService(directionsService);
            setGToAutoComplete(toAutocomplete);
        };
    }



    const toggleMapClick = () => {
        /**
         * Toggles the visibility of map elements and performs actions based on the state of the Cesium map.
         * @returns {void}
         */

        setCesiumMapVisible(!cesiumMapVisible);
        setCesiumBtnsVisible(!cesiumBtnsVisible);
        setGMapVisible(!gMapVisible);

        switch (cesiumCreated.current) {
            case false:
                createCesium();
                cesiumCreated.current = true;
            case true:
                const fromPlaceName =
                    document.querySelector("#fromPlaceName").value;
                const toPlaceNames = Array.from(
                    document.querySelectorAll(".toPlaceName")
                );

                if (
                    fromPlaceName !== "" &&
                    toPlaceNames.every(
                        (toPlaceName) => toPlaceName.value !== ""
                    )
                ) {
                    updateCesium();
                } else {
                    resetCesiumViewer();
                }
                break;
        }
    };

    const createCesium = () => {
        /**
         * Sets up the Cesium map and handles interactions with the map.
         * @returns {void}
         */

        const cesiumPlace = document.querySelector("#cesiumPlace");

        // https://developers.google.com/maps/documentation/tile/use-renderer
        // Cesium in React: https://cesium.com/blog/2018/03/05/integrating-cesium-and-react/
        // Alternative: https://developers.google.com/maps/documentation/aerial-view/get-video

        // Enable simultaneous requests
        Cesium.RequestScheduler.requestsByServer[
            "tile.googleapis.com:443"
        ] = 18;

        // Create the viewer.
        cesiumViewer.current = new Cesium.Viewer("cesiumMap", {
            imageryProvider: false,
            baseLayerPicker: false,
            homeButton: false,
            vrButton: false,
            sceneModePicker: false,
            geocoder: false,
            globe: false,
            infobox: false,
            selectionIndicator: false,
            timeline: false,
            projectionPicker: false,
            clockViewModel: null,
            animation: false,
            fullscreenButton: true,
            navigationHelpButton: true,
            requestRenderMode: true,
        });

        // Add 3D Tiles tileset.
        Cesium.Cesium3DTileset.fromUrl(
            `https://tile.googleapis.com/v1/3dtiles/root.json?key=${gApiKey}`,
            {
                // skipLevelOfDetail: true,
                // baseScreenSpaceError: 1024,
                // skipScreenSpaceErrorFactor: 16,
                // skipLevels: 1,
                // immediatelyLoadDesiredLevelOfDetail: false,
                // loadSiblings: false,
                // cullWithChildrenBounds: true,
                showCreditsOnScreen: true,
            }
        )
            .then((tileset) => {
                cesiumViewer.current.scene.primitives.add(tileset);
            })
            .catch((status) =>
                status.code === 429
                    ? alert(
                        "Sorry, 3D viewer quota exceeded, please try again in a few hours!"
                    )
                    : console.log(
                        `${createCesium.name} failed due to ${status}`
                    )
            );

        // Text Search API to get user's origin location, without needing to click on autocomplete option & automatically show on Cesium
        if (!originLat_Lng.current) {
            originLat_Lng.current = { lat: 1.3521, lng: 103.8198 };
        }

        gGeocoder
            .geocode({
                location: originLat_Lng.current,
                region: "SG",
            })
            .then((response) => {
                if (response["results"]) {
                    const place = response["results"][0];
                    cesiumPlace.value = place["formatted_address"];
                    const viewport = place["geometry"]["viewport"];

                    cesiumViewer.current.entities.add({
                        polyline: {
                            positions: Cesium.Cartesian3.fromDegreesArray([
                                viewport.getNorthEast().lng(),
                                viewport.getNorthEast().lat(),
                                viewport.getSouthWest().lng(),
                                viewport.getNorthEast().lat(),
                                viewport.getSouthWest().lng(),
                                viewport.getSouthWest().lat(),
                                viewport.getNorthEast().lng(),
                                viewport.getSouthWest().lat(),
                                viewport.getNorthEast().lng(),
                                viewport.getNorthEast().lat(),
                            ]),
                            width: 10,
                            material: Cesium.Color.RED,
                        },
                    });
                    cesiumViewer.current.flyTo(cesiumViewer.current.entities);
                } else {
                    console.log("origin location not found");
                    return "";
                }
            })
            .catch((status) =>
                console.log(`${createCesium.name} failed due to ${status}`)
            );

        // If user wants to use Cesium
        const cesiumAutocomplete = new google.maps.places.Autocomplete(
            cesiumPlace,
            gAutoCompleteOptions
        );
        cesiumAutocomplete.addListener("place_changed", () => {
            const place = cesiumAutocomplete.getPlace();
            cesiumPlace.value = place["name"];
            resetCesiumViewer();
            cesiumViewPlace(JSON.parse(JSON.stringify(place)));
        });
    };

    const updateCesium = () => {
        /**
         * Handles updating the Cesium map view based on waypoint input fields
         * @returns {void}
         */
        resetCesiumViewer();
        const colors = [
            "#B10DC9",
            "#0074D9",
            "#7FDBFF",
            "#F012BE",
            "#3D9970",
            "#2ECC40",
            "#8FB7B3",
            "#9C4C4E",
            "#F67280",
            "#C06C84",
            "#6C5B7B",
            "#F8B195",
            "#264653",
        ];
        const cesiumPlace = document.querySelector("#cesiumPlace");
        const cesiumCheckbox = document.querySelector("#cesiumCheckbox");
        let currentCesiumViewIndex = -1;
        let cesiumViews = Array.from(document.querySelectorAll(".toPlace")).map(
            (toPlaceBox) => JSON.parse(toPlaceBox.value)
        );
        cesiumViews.unshift(
            JSON.parse(document.querySelector("#fromPlace").value)
        );

        cesiumCheckbox.addEventListener("change", () => {
            cesiumPlace.disabled = cesiumCheckbox.checked;
            if (!cesiumCheckbox.checked) {
                currentCesiumViewIndex = -1;
                cesiumPlace.value = "";
            }
        });
        document
            .querySelector("#cesiumBackward")
            .addEventListener("click", () => {
                if (currentCesiumViewIndex > 0) {
                    cesiumPlace.disabled = true;
                    cesiumCheckbox.checked = true;
                    currentCesiumViewIndex--;
                    cesiumViewPlace(cesiumViews[currentCesiumViewIndex]);
                    cesiumPlace.value =
                        cesiumViews[currentCesiumViewIndex]["name"];
                }
            });
        document
            .querySelector("#cesiumForward")
            .addEventListener("click", () => {
                if (currentCesiumViewIndex < cesiumViews.length - 1) {
                    cesiumPlace.disabled = true;
                    cesiumCheckbox.checked = true;
                    currentCesiumViewIndex++;
                    cesiumViewPlace(cesiumViews[currentCesiumViewIndex]);
                    cesiumPlace.value =
                        cesiumViews[currentCesiumViewIndex]["name"];
                }
            });

        // for (let i = 1; i < cesiumViews.length + 1; i++) {
        //     const prevViewport = cesiumViews[i - 1]["geometry"]["viewport"];
        //     const prevPosition = Cesium.Cartesian3.fromDegreesArray([
        //         prevViewport["east"],
        //         prevViewport["north"],
        //         prevViewport["west"],
        //         prevViewport["north"],
        //         prevViewport["west"],
        //         prevViewport["south"],
        //         prevViewport["east"],
        //         prevViewport["south"],
        //         prevViewport["east"],
        //         prevViewport["north"],
        //     ]);
        //     console.log(prevPosition);
        //     if (i < cesiumViews.length) {
        //         const currViewport = cesiumViews[i]["geometry"]["viewport"];
        //         const currPosition = Cesium.Cartesian3.fromDegreesArray([
        //             currViewport["east"],
        //             currViewport["north"],
        //             currViewport["west"],
        //             currViewport["north"],
        //             currViewport["west"],
        //             currViewport["south"],
        //             currViewport["east"],
        //             currViewport["south"],
        //             currViewport["east"],
        //             currViewport["north"],
        //         ]);
        //         console.log(currPosition);
        //         cesiumViewer.current.entities.add({
        //             polyline: {
        //                 positions: [prevPosition, currPosition],
        //                 width: 3,
        //                 material: colors[i - 1],
        //                 clampToGround: true,
        //                 classificationType:
        //                     Cesium.ClassificationType.CESIUM_3D_TILE,
        //             },
        //         });
        //     }
        //     cesiumViewer.current.entities.add({
        //         position: prevPosition,
        //         ellipsoid: {
        //             radii: new Cesium.Cartesian3(1, 1, 1),
        //             material: Cesium.Color.WHITE,
        //         },
        //     });
        //     cesiumViewer.current.entities.add({
        //         position: prevPosition,
        //         label: {
        //             text: String.fromCharCode(65 + i),
        //             disableDepthTestDistance: Number.POSITIVE_INFINITY,
        //             pixelOffset: new Cesium.Cartesian2(0, -10),
        //             showBackground: true,
        //             verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //         },
        //     });
        // }
    };

    const cesiumViewPlace = async (place) => {
        /**
         * Adjusts the camera view in a Cesium map to focus on a specific place by retrieving its elevation and rotating the camera around it
         * @param {Object} place - The autocomplete place object containing location and viewport information
         * @returns {void}
         */

        // Get place elevation using the ElevationService.
        const elevatorService = new google.maps.ElevationService();
        const elevationResponse =
            await elevatorService.getElevationForLocations({
                locations: [place["geometry"]["location"]],
            });
        const elevation =
            elevationResponse["results"][0]["elevation"] * 40 || 100;
        rotateCameraAround(
            place["geometry"]["location"],
            place["geometry"]["viewport"],
            elevation
        );
    };

    const rotateCameraAround = (location, viewport, elevation) => {
        /**
         * Rotates the camera view in a Cesium map around a specific location
         * @param {Object} location - The location object with latitude and longitude coordinates
         * @param {Object} viewport - The viewport object with the bounds of the area to focus on
         * @param {number} elevation - The elevation of the camera view
         * @returns {void}
         */
        pointCameraAt(location, viewport, elevation);
        if (!rotateCesium.current) {
            rotateCesium.current =
                cesiumViewer.current.clock.onTick.addEventListener(() => {
                    cesiumViewer.current.camera.rotate(
                        Cesium.Cartesian3.UNIT_Z,
                        Math.PI / 10800
                    );
                });
        }
    };
    const pointCameraAt = (location, viewport, elevation) => {
        /**
         * Adjusts the camera view in a Cesium map to point at a specific location
         * @param {Object} location - The location object with latitude and longitude coordinates
         * @param {Object} viewport - The viewport object with the bounds of the area to focus on
         * @param {number} elevation - The elevation of the camera view
         * @returns {void}
         */
        const distance =
            Cesium.Cartesian3.distance(
                Cesium.Cartesian3.fromDegrees(
                    // SouthWest.lng = west, SouthWest.lat = south
                    viewport["west"],
                    viewport["south"],
                    elevation
                ),
                Cesium.Cartesian3.fromDegrees(
                    viewport["east"],
                    viewport["north"],
                    elevation
                )
            ) / 50;
        const target = new Cesium.Cartesian3.fromDegrees(
            location["lng"],
            location["lat"],
            elevation
        );
        const pitch = -Math.PI / 4;
        const heading = 0;

        cesiumViewer.current.camera.lookAt(
            target,
            new Cesium.HeadingPitchRange(heading, pitch, distance)
        );
    };

    const addWaypoint = (e) => {
        /**
         * Increases the number of waypoints, adds an input field for the new waypoint and sets up the corresponding autocomplete for the new input field
         * @returns {void}
         */
        e.preventDefault();
        if (waypointsNum < 8) {
            setWaypointsNum(waypointsNum + 1);
            setWaypointValues((prevWaypoints) => [...prevWaypoints, ""]);
        } else if (waypointsNum === 8) {
            Store.addNotification({
                title: "Error",
                message: "You may only add up till 8 waypoints",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
            });
        }
    };

    useEffect(() => {
        /**
         * Sets up autocomplete functionality for the "To" input field based on waypointsNum whenever waypointsNum changes
         * @returns {void}
         */
        if (waypointsNum > 1) {
            const newToAutoComplete = new google.maps.places.Autocomplete(
                document.querySelectorAll("input.toPlaceName")[
                waypointsNum - 1
                ],
                gAutoCompleteOptions
            );
            autocompleteAddListener(newToAutoComplete, waypointsNum);
        }
    }, [waypointsNum]);


    const resetWaypoints = (e) => {
        /**
         * Resets waypoints and waypointsNum
         * @param {Event} e - The event object that triggered the reset.
         */
        e.preventDefault();
        setWaypointsNum(1);
        if (fromPlaceNameRef.current.value != null) {
            fromPlaceNameRef.current.value = null;
        }
        const firstWaypoint = document.querySelector("#firstToPlaceName");
        firstWaypoint.value = null;
        setWaypointValues([""]);
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
        const from = {
            name: document.querySelector("#fromPlaceName").value,
            lat_lng: getLat_LngFromPlace(
                document.querySelector("#fromPlace").value
            ),
        };
        const waypoints = [];
        for (
            let i = 0;
            i < document.querySelectorAll(".toPlaceName").length;
            i++
        ) {
            waypoints[i] = {
                name: document.querySelectorAll(".toPlaceName")[i].value,
                lat_lng: getLat_LngFromPlace(
                    document.querySelectorAll(".toPlace")[i].value
                ),
            };
        }
        const transportMode = document
            .querySelector("#transportModeMenu")
            .value.toUpperCase();
        const optimizeRoute = document.querySelector("#optimizeRoute").checked;

        const reqRoute = {
            request: {
                origin: from,
                destination: waypoints[waypoints.length - 1],
                waypoints: waypoints,
                travelMode: transportMode,
                optimizeWaypoints: optimizeRoute,
            },
        };

        retrieveRoute(reqRoute);
    };

    const retrieveRoute = (route) => {
        /**
         * Retrieves route information, performs route calculation, and renders the route on the map.
         * @param {Object} route - The route object containing information about the route.
         * @returns {void}
         */

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

        // un/optimized + transit -> Directions, Roads API
        if (transportMode === "TRANSIT") {
            switch (optimizeRoute) {
                case true:
                    if (waypoints.length > 1) {
                        // Uses driving (roads, ∴ Mostly accurate to buses only) to optimize order first
                        const optimizeRequest = {
                            origin: from["lat_lng"],
                            destination:
                                waypoints[waypoints.length - 1]["lat_lng"],
                            waypoints: waypoints
                                .slice(0, waypoints.length)
                                .map((waypoint) => {
                                    return {
                                        location: waypoint["lat_lng"],
                                        stopover: true,
                                    };
                                }),
                            travelMode: "DRIVING",
                            optimizeWaypoints: optimizeRoute,
                            unitSystem: google.maps.UnitSystem.METRIC,
                            region: "SG",
                        };
                        gDirectionsService.route(
                            optimizeRequest,
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
                                    console.log(
                                        `${retrieveRoute.name
                                        } with optimizeRequest ${JSON.stringify(
                                            optimizeRequest
                                        )} failed due to ${status}`
                                    );
                                }
                            }
                        );
                    }
                // Intentional fall-through
                case false:
                    setTimeout(() => {
                        waypoints.unshift(from);
                        const routeLegsAndPolylineArray = [];
                        for (let i = 0; i < waypoints.length - 1; i++) {
                            const request = {
                                origin: waypoints[i]["lat_lng"],
                                destination: waypoints[i + 1]["lat_lng"],
                                travelMode: transportMode,
                                unitSystem: google.maps.UnitSystem.METRIC,
                                region: "SG",
                            };

                            gDirectionsService.route(
                                request,
                                function (result, status) {
                                    if (status === "OK") {
                                        // ASYNC nature resolves promises with less data faster, so .push doesn't guarantee order.
                                        // Specifying order within array guarantees resolved promises will be slotted in that order.
                                        routeLegsAndPolylineArray[i] =
                                            result["routes"][0];
                                    } else {
                                        console.log(
                                            `${retrieveRoute.name
                                            } with request ${JSON.stringify(
                                                request
                                            )} failed due to ${status}`
                                        );
                                    }
                                }
                            );
                        }

                        setTimeout(() => {
                            waypoints.shift(from);
                            setCurrentRouteOverview(
                                createRoutePath(from, waypoints)
                            );
                            directionsPanel.innerHTML = drawRoute(
                                createRoutePath(from, waypoints),
                                routeLegsAndPolylineArray,
                                "directions"
                            );
                            nearbyPlaceSearch(
                                getLat_LngArray(
                                    routeLegsAndPolylineArray.map(
                                        (route) => route["legs"]
                                    ),
                                    "directions"
                                ),
                                categoriesChecked
                            );
                            const partialData = calculatePartialStats(
                                routeLegsAndPolylineArray,
                                transportMode,
                                "directions"
                            );
                            carbonFootprintCount += partialData[0];
                            duration += partialData[1];
                            calculateStats(
                                REQUEST,
                                carbonFootprintCount,
                                duration
                            );

                            setTravelStats((prevStats) => {
                                return {
                                    ...prevStats,
                                    chosen: transportMode,
                                    [transportMode]: {
                                        carbonFootprintCount:
                                            carbonFootprintCount,
                                        travelDuration: duration,
                                    },
                                };
                            });
                            /*travelStats.current["chosen"] = transportMode;
                            travelStats.current[transportMode][
                                "carbonFootprintCount"
                            ] = carbonFootprintCount;
                            travelStats.current[transportMode][
                                "travelDuration"
                            ] = duration;*/

                            // saveRoute(user["userID"], user["request"], routeString);
                        }, 750);
                    }, 750);
            }
        } else {
            const routeLegsArray = [];
            const request = {
                origin: {
                    location: {
                        latLng: {
                            latitude: from["lat_lng"]["lat"],
                            longitude: from["lat_lng"]["lng"],
                        },
                    },
                },
                travelMode: transportMode,
                polylineQuality: "HIGH_QUALITY",
                polylineEncoding: "ENCODED_POLYLINE",
                units: "METRIC",
                regionCode: "SG",
            };

            switch (optimizeRoute) {
                case true:
                    // optimized + non-transit -> Directions, Routes API
                    if (waypoints.length > 1) {
                        const optimizeRequest = {
                            origin: from["lat_lng"],
                            destination:
                                waypoints[waypoints.length - 1]["lat_lng"],
                            waypoints: waypoints
                                .slice(0, waypoints.length)
                                .map((waypoint) => {
                                    return {
                                        location: waypoint["lat_lng"],
                                        stopover: true,
                                    };
                                }),
                            travelMode: transportMode,
                            optimizeWaypoints: optimizeRoute,
                            unitSystem: google.maps.UnitSystem.METRIC,
                            region: "SG",
                        };
                        gDirectionsService.route(
                            optimizeRequest,
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
                                    console.log(
                                        `${retrieveRoute.name
                                        } with optimizeRequest ${JSON.stringify(
                                            optimizeRequest
                                        )} failed due to ${status}`
                                    );
                                }
                            }
                        );
                    }

                // Intentional fall-through
                case false:
                    // unoptimized + non-transit -> Routes API
                    setTimeout(() => {
                        const waypointsLat_Lng = waypoints.map(
                            (waypoint) => waypoint["lat_lng"]
                        );
                        request["destination"] = {
                            location: {
                                latLng: {
                                    latitude:
                                        waypointsLat_Lng[
                                        waypointsLat_Lng.length - 1
                                        ]["lat"],
                                    longitude:
                                        waypointsLat_Lng[
                                        waypointsLat_Lng.length - 1
                                        ]["lng"],
                                },
                            },
                        };
                        request["intermediates"] = waypointsLat_Lng.map(
                            (waypointLat_Lng) => ({
                                location: {
                                    latLng: {
                                        latitude: waypointLat_Lng["lat"],
                                        longitude: waypointLat_Lng["lng"],
                                    },
                                },
                            })
                        );
                        switch (transportMode) {
                            case "DRIVING":
                                request["travelMode"] = "DRIVE";
                                request["origin"]["vehicleStopover"] = true;
                                request["origin"]["sideOfRoad"] = true;
                                request["destination"][
                                    "vehicleStopover"
                                ] = true;
                                request["destination"]["sideOfRoad"] = true;
                                request["intermediates"].forEach(
                                    (intermediate) => {
                                        intermediate["vehicleStopover"] = true;
                                        intermediate["sideOfRoad"] = true;
                                    }
                                );
                                request["extraComputations"] = [
                                    "TRAFFIC_ON_POLYLINE",
                                ];
                                request["routingPreference"] =
                                    "TRAFFIC_AWARE_OPTIMAL";
                                break;
                            case "WALKING":
                                request["travelMode"] = "WALK";
                                break;
                            case "BICYCLING":
                                request["travelMode"] = "BICYCLE";
                                break;
                        }
                        fetch(
                            "https://routes.googleapis.com/directions/v2:computeRoutes",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-Goog-FieldMask":
                                        "routes.legs,routes.travelAdvisory,routes.routeLabels",
                                    "X-Goog-Api-Key": gApiKey,
                                },
                                body: JSON.stringify(request),
                            }
                        )
                            .then((response) => response.json())
                            .then((response) => {
                                const tempLegs = response["routes"][0]["legs"];
                                tempLegs
                                    .splice(0, tempLegs.length - 1)
                                    .forEach((tempLeg, i) => {
                                        routeLegsArray[i] = tempLeg;
                                    });
                                setCurrentRouteOverview(
                                    createRoutePath(from, waypoints)
                                );
                                directionsPanel.innerHTML = drawRoute(
                                    createRoutePath(from, waypoints),
                                    routeLegsArray,
                                    "routes"
                                );

                                nearbyPlaceSearch(
                                    getLat_LngArray(routeLegsArray, "routes"),
                                    categoriesChecked
                                );
                                const partialData = calculatePartialStats(
                                    routeLegsArray,
                                    transportMode,
                                    "routes"
                                );
                                carbonFootprintCount += partialData[0];
                                duration += partialData[1];
                                calculateStats(
                                    REQUEST,
                                    carbonFootprintCount,
                                    duration
                                );
                                setTravelStats((prevStats) => {
                                    return {
                                        ...prevStats,
                                        chosen: transportMode,
                                        [transportMode]: {
                                            carbonFootprintCount:
                                                carbonFootprintCount,
                                            travelDuration: duration,
                                        },
                                    };
                                });
                                /*(travelStats.current["chosen"] = transportMode;
                                travelStats.current[transportMode][
                                    "carbonFootprintCount"
                                ] = carbonFootprintCount;
                                travelStats.current[transportMode][
                                    "travelDuration"
                                ] = duration;*/
                            });
                        // .catch((status) =>
                        //     console.log(
                        //         `${
                        //             retrieveRoute.name
                        //         } with request ${JSON.stringify(
                        //             request
                        //         )} failed due to ${status}`
                        //     )
                        // );
                    }, 500);

                    break;
            }
        }
    };

    const createRoutePath = (from, waypoints) => {
        /**
         * Generates a string representation of a route based on the provided result and waypoints
         * @param {object} result - Result object from a Google Maps Directions or Routes API request
         * @param {string[]} waypoints - Array of string waypoints in the route
         * @returns {string} String representation of the route
         */
        let routePath = formatRouteName(from["name"]) + " ➡️ ";
        const waypointsName = waypoints.map((waypoint) =>
            formatRouteName(waypoint["name"])
        );
        waypointsName
            .splice(0, waypointsName.length - 1)
            .map((waypointName) => (routePath += waypointName + " ➡️ "));
        routePath += waypointsName[waypointsName.length - 1];

        return routePath;

    };

    const drawRoute = (routePath, result, api) => {
        /**
         * Draws a route on the map.
         * @param {string} routePath - Path of the route
         * @param {Object[]} result - Result object returned by the Google Maps Directions or Routes API
         * @param {string} api - API type: "directions" or "routes"
         * @returns {string} - String representation of the route directions
         */

        const routePathSplit = routePath.split(" ➡️ ");
        let routeDirections = "";
        const trafficColors = {
            SLOW: "#FFA500",
            TRAFFIC_JAM: "#FF0000",
        };
        const colors = [
            "#B10DC9",
            "#0074D9",
            "#7FDBFF",
            "#F012BE",
            "#3D9970",
            "#2ECC40",
            "#8FB7B3",
            "#9C4C4E",
            "#F67280",
            "#C06C84",
            "#6C5B7B",
            "#F8B195",
            "#264653",
        ];

        switch (api) {
            case "directions":
                const routeLegsArray = result.map((route) => route["legs"]);
                const routePolylinesArray = result.map(
                    (route) => route["overview_polyline"]
                );

                for (let i = 0; i < result.length; i++) {
                    markersPolylines.push(
                        new google.maps.Polyline({
                            path: google.maps.geometry.encoding.decodePath(
                                routePolylinesArray[i]
                            ),
                            strokeColor: colors[i],
                            strokeOpacity: 0.75,
                            strokeWeight: 3,
                            geodesic: true,
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
                                glyphColor: "white",
                            }).element,
                            map: gmap,
                        })
                    );

                    routeDirections +=
                        `${String.fromCharCode(65 + i)} (${routePathSplit[i]
                        }) ➡️ ${String.fromCharCode(66 + i)} (${routePathSplit[i + 1]
                        })<br>${routeLegsArray[i][0]["distance"]["text"]
                        }. About ${secondsToHms(
                            routeLegsArray[i][0]["duration"]["value"]
                        )} <hr>` +
                        routeLegsArray[i][0]["steps"]
                            .map((step, index) => {
                                if (step["transit"]) {
                                    markersPolylines.push(
                                        new google.maps.marker.AdvancedMarkerView(
                                            {
                                                position:
                                                    step["transit"][
                                                    "departure_stop"
                                                    ]["location"],
                                                content:
                                                    new google.maps.marker.PinView(
                                                        {
                                                            scale: 1.2,
                                                            background:
                                                                colors[i],
                                                            glyph: `${String.fromCharCode(
                                                                65 + i
                                                            )}${index + 1} (D)`,
                                                            glyphColor: "white",
                                                        }
                                                    ).element,
                                                map: gmap,
                                            }
                                        )
                                    );
                                    markersPolylines.push(
                                        new google.maps.marker.AdvancedMarkerView(
                                            {
                                                position:
                                                    step["transit"][
                                                    "arrival_stop"
                                                    ]["location"],
                                                content:
                                                    new google.maps.marker.PinView(
                                                        {
                                                            scale: 1.2,
                                                            background:
                                                                colors[i],
                                                            glyph: `${String.fromCharCode(
                                                                65 + i
                                                            )}${index + 1} (A)`,
                                                            glyphColor: "white",
                                                        }
                                                    ).element,
                                                map: gmap,
                                            }
                                        )
                                    );
                                    return `${index + 1}. Take ${step["transit"]["line"]["name"].length <
                                        4 ||
                                        step["transit"]["line"][
                                            "name"
                                        ].includes("Sentosa") ||
                                        step["transit"]["line"][
                                            "name"
                                        ].includes("Shuttle")
                                        ? "🚌 BUS"
                                        : "🚄 MRT"
                                        } <b>${step["transit"]["line"]["name"]
                                        }</b>  ${step["transit"]["departure_stop"][
                                        "name"
                                        ]
                                        } -> ${step["transit"]["arrival_stop"]["name"]
                                        } for ${step["transit"]["num_stops"]} ${step["transit"]["num_stops"] > 1
                                            ? "stops"
                                            : "stop"
                                        }
                                    (<i>${step["distance"]["text"]}</i>)`;
                                }
                                return `${index + 1}. 🚶${step["instructions"]
                                    } (<i>${step["distance"]["text"]}</i>)`;
                            })
                            .join("<br>") +
                        "<br><br>";
                }

                markersPolylines.push(
                    new google.maps.marker.AdvancedMarkerView({
                        position:
                            routeLegsArray[routeLegsArray.length - 1][0][
                            "end_location"
                            ],
                        content: new google.maps.marker.PinView({
                            scale: 1,
                            background: colors[routePolylinesArray.length - 1],
                            glyph: String.fromCharCode(
                                65 + routePolylinesArray.length
                            ),
                            glyphColor: "white",
                        }).element,
                        map: gmap,
                    })
                );

                break;

            case "routes":
                // https://developers.google.com/maps/documentation/routes/demo
                for (let i = 0; i < result.length; i++) {
                    const polylineArray =
                        google.maps.geometry.encoding.decodePath(
                            result[i]["polyline"]["encodedPolyline"]
                        );

                    try {
                        // Driving
                        result[i]["travelAdvisory"][
                            "speedReadingIntervals"
                        ].forEach((interval) => {
                            markersPolylines.push(
                                new google.maps.Polyline({
                                    path: [...polylineArray].splice(
                                        interval["startPolylinePointIndex"],
                                        interval["endPolylinePointIndex"]
                                    ),
                                    strokeColor: Object.keys(
                                        trafficColors
                                    ).includes(interval["speed"])
                                        ? trafficColors[interval["speed"]]
                                        : colors[i],
                                    strokeOpacity: 0.75,
                                    strokeWeight: 3,
                                    geodesic: true,
                                    map: gmap,
                                })
                            );
                        });
                    } catch (TypeError) {
                        // Walking / Bicycling
                        markersPolylines.push(
                            new google.maps.Polyline({
                                path: polylineArray,
                                strokeColor: colors[i],
                                strokeOpacity: 0.75,
                                strokeWeight: 3,
                                geodesic: true,
                                map: gmap,
                            })
                        );
                    }

                    // let infowindow = new google.maps.InfoWindow()
                    // infowindow.setContent/setPosition/open
                    const startLat_Lng = result[i]["startLocation"]["latLng"];

                    markersPolylines.push(
                        new google.maps.marker.AdvancedMarkerView({
                            position: {
                                lat: startLat_Lng["latitude"],
                                lng: startLat_Lng["longitude"],
                            },
                            content: new google.maps.marker.PinView({
                                scale: 1,
                                background: colors[i],
                                glyph: String.fromCharCode(65 + i),
                                glyphColor: "white",
                            }).element,
                            map: gmap,
                        })
                    );
                    routeDirections +=
                        `${String.fromCharCode(65 + i)} (${routePathSplit[i]
                        }) ➡️ ${String.fromCharCode(66 + i)} (${routePathSplit[i + 1]
                        })<br>${metersToKm(
                            result[i]["distanceMeters"]
                        )}. About ${secondsToHms(
                            result[i]["duration"].replace("s", "")
                        )} <hr>` +
                        result[i]["steps"]
                            .map((step, index) => {
                                if (step["navigationInstruction"]) {
                                    return `${index}. ${step["navigationInstruction"][
                                        "instructions"
                                    ]
                                        } (<i>${metersToKm(
                                            step["distanceMeters"]
                                        )}</i>)<br>`;
                                }
                            })
                            .join("");
                    routeDirections += "<br>";
                }

                const endLat_Lng =
                    result[result.length - 1]["endLocation"]["latLng"];
                markersPolylines.push(
                    new google.maps.marker.AdvancedMarkerView({
                        position: {
                            lat: endLat_Lng["latitude"],
                            lng: endLat_Lng["longitude"],
                        },
                        content: new google.maps.marker.PinView({
                            scale: 1,
                            background: colors[result.length - 1],
                            glyph: String.fromCharCode(65 + result.length),
                            glyphColor: "white",
                        }).element,
                        map: gmap,
                    })
                );
                break;
        }
        return routeDirections;
    };

    const nearbyPlaceSearch = (lat_lngArray, categoriesChecked) => {
        /**
         * Searches for nearby places based on the given latitude-longitude pairs and categories
         * @param {Array} lat_lngArray - Array of latitude-longitude pairs to search
         * @param {Array} categoriesChecked - Array of categories to search for
         * @returns {void}
         */

        const dataSets = [ResearchedData, BlueSGData, OneMapData];
        // createCrowdControl();

        for (const lat_lng of lat_lngArray) {
            for (const dataSet of dataSets) {
                for (const [theme, themePlace] of Object.entries(dataSet)) {
                    if (categoriesChecked.includes(theme)) {
                        for (const place of themePlace) {
                            if (
                                haversine_distance(lat_lng, place["address"]) <=
                                0.8
                            ) {
                                createAttractionMarker({
                                    position: place["address"],
                                    url: `https://www.google.com/search?q=${encodeURIComponent(
                                        place["name"] +
                                        " " +
                                        place["formatted_address"]
                                    )}`,
                                    content: buildContent({
                                        type: place["type"],
                                        name: place["name"],
                                        formatted_address:
                                            place["formatted_address"],
                                        description: place["description"],
                                        rating: place["rating"],
                                        reviews: place["reviews"],
                                        price: place["price"],
                                    }),
                                });

                                // crowdMapData["heatMapData"].push({
                                //     placeLocation: new google.maps.LatLng(
                                //         place["address"]["lat"],
                                //         place["address"]["lng"]
                                //     ),
                                //     placeCrowds: place["crowds"],
                                // });
                            }
                        }
                    }
                }
            }
        }
    };

    const createAttractionMarker = (details) => {
        /**
         * Creates advanced marker on the map
         * @param {object} details - Details of the marker to be created
         * @param {google.maps.LatLngLiteral} details.position - Position of the marker on the map
         * @param {string} details.title - Title of the marker
         * @param {HTMLElement} details.content - HTML content of the marker
         * @param {google.maps.Map} map - Map on which to place the marker
         * @returns {void}
         *
         * Note: background: result[i]["icon_background_color"]
         *       glyph: new URL(`${result[i]["icon_mask_base_uri"]}.png`)
         *       May configure collisionBehaviour + zoomBehaviour
         */

        const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
            // location on map
            position: details["position"],
            // hover-over text
            title: details["url"],
            content: details["content"],
            map: gmap,
        });
        markersPolylines.push(advancedMarkerView);
        const element = advancedMarkerView.element;

        ["focus", "pointerenter"].forEach((event) => {
            element.addEventListener(event, () => {
                highlight(advancedMarkerView);
            });
        });
        ["blur", "pointerleave"].forEach((event) => {
            element.addEventListener(event, () => {
                unhighlight(advancedMarkerView);
            });
        });
        advancedMarkerView.addEventListener("gmp-click", (event) => {
            window.open(advancedMarkerView["title"], "_blank");
        });
    };

    const buildContent = (property) => {
        /**
         * Creates HTML content for a marker, displaying the name, address, rating, user ratings total, and price level of the associated place
         * @param {Object} property - Object containing the properties of the place to be displayed
         * @param {string} property.type - Type of the place
         * @param {string} property.name - Name of the place
         * @param {string} property.formatted_address - Formatted address of the place
         * @param {number} property.rating - Rating of the place
         * @param {number} property.reviews - Total number of user reviews of the place
         * @param {number} property.price - Price of the place (from 1 to 4)
         * @returns {Element} - Div element containing the HTML content for the marker
         *
         * References: https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers#maps_advanced_markers_html-javascript, https://fontawesome.com/search
         */
        const content = document.createElement("div");
        content.classList.add("property");
        property["type"] = "building";

        content.innerHTML = `
        <div class="icon">
            <i aria-hidden="true" class="fa fa-icon fa-${property["type"]
            }" title="${property["type"]}"></i>
            <span class="fa-sr-only">${property["type"]}</span>
        </div>
        <div class="details">
            <div class="name">${property["name"]}</div>
            <div class="address">${property["formatted_address"] || ""}</div>
            <div class="description">${property["description"]}</div>
            <div class="features">
            <div>
                <i aria-hidden="true" class="fa fa-solid fa-star rating" title="rating"></i>
                <span class="fa-sr-only">rating</span>
                <span>${property["rating"]}/5</span>
            </div>
            <div>
                <i aria-hidden="true" class="fa fa-solid fa-user review" title="review"></i>
                <span class="fa-sr-only">review</span>
                <span>${property["reviews"]}</span>
            </div>
            <div>
                <i aria-hidden="true" class="fa fa-solid fa-dollar price" title="price"></i>
                <span class="fa-sr-only">price</span>
                <span${property["price"] * "$" || property["price"] || "$$$$$$$$"
            }  span>
            </div>
            </div>
        </div>
        `;
        return content;
    };

    const highlight = (markerView) => {
        /**
         * Highlights a marker by adding the 'highlight' class to its content element and setting its z-index to 1
         * @param {object} markerView - The marker to highlight
         */
        markerView.content.classList.add("highlight");
        markerView.element.style.zIndex = 1;
    };

    const unhighlight = (markerView) => {
        /**
         * Removes the highlight from marker by removing the 'highlight' class from its content element and resetting its z-index to the default value
         * @param {object} markerView - The marker to unhighlight
         */
        markerView.content.classList.remove("highlight");
        markerView.element.style.zIndex = "";
    };

    const calculatePartialStats = (routeLegsArray, transportMode, api) => {
        /**
         * Calculates the carbon footprint and duration for a given route segment based on the provided route legs array, transport mode, and API type.
         * @param {Array} routeLegsArray - Array of route legs for the segment
         * @param {string} transportMode - A string representing mode of transportation for the segment
         * @param {string} api - A string representing API type (either "directions" or "routes")
         * @returns {Array} - Array containing the carbon footprint count (in kg CO2 equivalent) and duration (in seconds) of the route
         * *References: https://www.bikeradar.com/features/long-reads/cycling-environmental-impact/, https://www.eco-business.com/news/singapores-mrt-lines-be-graded-green-ness/
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

        switch (api) {
            case "directions":
                if (transportMode === "TRANSIT") {
                    routeLegsArray = routeLegsArray.map(
                        (leg) => leg["legs"][0]
                    );
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
                }
                break;
            case "routes":
                duration += routeLegsArray
                    .map((leg) => Number(leg["duration"].replace("s", "")))
                    .reduce((total, current) => total + current, 0);
                const routeDistance = routeLegsArray
                    .map((leg) => leg["distanceMeters"])
                    .reduce((total, current) => total + current, 0);
                const stepMode =
                    transportMode === "DRIVING"
                        ? "Conventional Car"
                        : transportMode === "BICYCLING"
                            ? "Conventional Bicycle"
                            : "Walk";
                carbonFootprintCount +=
                    carbonFootprintBase[stepMode] * (routeDistance / 1000);
                break;
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
         *                 saves these stats in travelStats for future use
         *
         * Intention: Carbon footprint depending on mode of transport and their cumulative distance + time as a tradeoff to make informed decisions
         */

        const statsPanel = document.querySelector("#statsPanel");

        const from = request["origin"];
        const waypoints = request["waypoints"];
        const optimizeRoute = request["optimizeWaypoints"];
        const transportMode = request["travelMode"];
        const otherTravelModes = [
            "DRIVING",
            "TRANSIT",
            "WALKING",
            "BICYCLING",
        ].filter((mode) => mode !== transportMode);
        const outputStringArray = [];
        outputStringArray[0] = `Through your ${transportMode} journey, ${carbonFootprintCount.toFixed(
            2
        )} kg CO2e is emitted, taking ${secondsToHms(duration)}<br>`;

        for (let i = 0; i < otherTravelModes.length; i++) {
            let otherDuration = 0;
            let otherCarbonFootprintCount = 0;
            outputStringArray[i + 1] = `${otherTravelModes[i]} `;

            if (otherTravelModes[i] === "TRANSIT") {
                switch (optimizeRoute) {
                    case true:
                        if (waypoints.length > 1) {
                            const optimizeRequest = {
                                origin: from["lat_lng"],
                                destination:
                                    waypoints[waypoints.length - 1]["lat_lng"],
                                waypoints: waypoints
                                    .slice(0, waypoints.length)
                                    .map((waypoint) => {
                                        return {
                                            location: waypoint["lat_lng"],
                                            stopover: true,
                                        };
                                    }),
                                travelMode: "DRIVING",
                                optimizeWaypoints: optimizeRoute,
                                unitSystem: google.maps.UnitSystem.METRIC,
                                region: "SG",
                            };
                            gDirectionsService.route(
                                optimizeRequest,
                                function (result, status) {
                                    if (status === "OK") {
                                        const waypoints_copy =
                                            waypoints.slice();
                                        result["routes"][0][
                                            "waypoint_order"
                                        ].map((optimalOrder, index) => {
                                            waypoints[index] =
                                                waypoints_copy[optimalOrder];
                                        });
                                    } else {
                                        console.log(
                                            `${calculateStats.name} failed due to ${status}`
                                        );
                                    }
                                }
                            );
                        }
                    case false:
                        setTimeout(() => {
                            waypoints.unshift(from);
                            const routeLegsArray = [];
                            for (let j = 0; j < waypoints.length - 1; j++) {
                                request = {
                                    origin: waypoints[j]["lat_lng"],
                                    destination: waypoints[j + 1]["lat_lng"],
                                    travelMode: "TRANSIT",
                                    unitSystem: google.maps.UnitSystem.METRIC,
                                    region: "SG",
                                };

                                gDirectionsService.route(
                                    request,
                                    function (result, status) {
                                        if (status === "OK") {
                                            routeLegsArray[j] =
                                                result["routes"][0];
                                        } else {
                                            console.log(
                                                `${calculateStats.name} failed due to ${status}`
                                            );
                                        }
                                    }
                                );
                            }

                            setTimeout(() => {
                                const partialData = calculatePartialStats(
                                    routeLegsArray,
                                    "TRANSIT",
                                    "directions"
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
                                setTravelStats((prevStats) => {
                                    return {
                                        ...prevStats,
                                        [otherTravelModes[i]]: {
                                            carbonFootprintCount:
                                                otherCarbonFootprintCount,
                                            travelDuration: otherDuration,
                                        },
                                    };
                                });
                                /*travelStats.current[otherTravelModes[i]][
                                    "carbonFootprintCount"
                                ] = otherCarbonFootprintCount;
                                travelStats.current[otherTravelModes[i]][
                                    "travelDuration"
                                ] = otherDuration;*/

                            }, 750);
                        }, 750);
                }
            } else {
                const routeLegsArray = [];
                const request = {
                    origin: {
                        location: {
                            latLng: {
                                latitude: from["lat_lng"]["lat"],
                                longitude: from["lat_lng"]["lng"],
                            },
                        },
                    },
                    travelMode: otherTravelModes[i],
                    polylineQuality: "HIGH_QUALITY",
                    polylineEncoding: "ENCODED_POLYLINE",
                    units: "METRIC",
                    regionCode: "SG",
                };

                switch (optimizeRoute) {
                    case true:
                        if (waypoints.length > 1) {
                            const optimizeRequest = {
                                origin: from["lat_lng"],
                                destination:
                                    waypoints[waypoints.length - 1]["lat_lng"],
                                waypoints: waypoints
                                    .slice(0, waypoints.length)
                                    .map((waypoint) => {
                                        return {
                                            location: waypoint["lat_lng"],
                                            stopover: true,
                                        };
                                    }),
                                travelMode: otherTravelModes[i],
                                optimizeWaypoints: optimizeRoute,
                                unitSystem: google.maps.UnitSystem.METRIC,
                                region: "SG",
                            };
                            gDirectionsService.route(
                                optimizeRequest,
                                function (result, status) {
                                    if (status === "OK") {
                                        const waypoints_copy =
                                            waypoints.slice();
                                        result["routes"][0][
                                            "waypoint_order"
                                        ].map((optimalOrder, index) => {
                                            waypoints[index] =
                                                waypoints_copy[optimalOrder];
                                        });
                                    } else {
                                        console.log(
                                            `${calculateStats.name} failed due to ${status}`
                                        );
                                    }
                                }
                            );
                        }

                    case false:
                        const waypointsLat_Lng = waypoints.map(
                            (waypoint) => waypoint["lat_lng"]
                        );
                        request["destination"] = {
                            location: {
                                latLng: {
                                    latitude:
                                        waypointsLat_Lng[
                                        waypointsLat_Lng.length - 1
                                        ]["lat"],
                                    longitude:
                                        waypointsLat_Lng[
                                        waypointsLat_Lng.length - 1
                                        ]["lng"],
                                },
                            },
                        };
                        request["intermediates"] = waypointsLat_Lng.map(
                            (waypointLat_Lng) => ({
                                location: {
                                    latLng: {
                                        latitude: waypointLat_Lng["lat"],
                                        longitude: waypointLat_Lng["lng"],
                                    },
                                },
                            })
                        );
                        switch (otherTravelModes[i]) {
                            case "DRIVING":
                                request["travelMode"] = "DRIVE";
                                request["origin"]["vehicleStopover"] = true;
                                request["origin"]["sideOfRoad"] = true;
                                request["destination"][
                                    "vehicleStopover"
                                ] = true;
                                request["destination"]["sideOfRoad"] = true;
                                request["intermediates"].forEach(
                                    (intermediate) => {
                                        intermediate["vehicleStopover"] = true;
                                        intermediate["sideOfRoad"] = true;
                                    }
                                );
                                request["extraComputations"] = [
                                    "TRAFFIC_ON_POLYLINE",
                                ];
                                request["routingPreference"] =
                                    "TRAFFIC_AWARE_OPTIMAL";
                                break;
                            case "WALKING":
                                request["travelMode"] = "WALK";
                                break;
                            case "BICYCLING":
                                request["travelMode"] = "BICYCLE";
                                break;
                        }
                        fetch(
                            "https://routes.googleapis.com/directions/v2:computeRoutes",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-Goog-FieldMask":
                                        "routes.legs,routes.travelAdvisory,routes.routeLabels",
                                    "X-Goog-Api-Key": gApiKey,
                                },
                                body: JSON.stringify(request),
                            }
                        )
                            .then((response) => response.json())
                            .then((response) => {
                                const tempLegs = response["routes"][0]["legs"];
                                tempLegs
                                    .splice(0, tempLegs.length - 1)
                                    .forEach((tempLeg, i) => {
                                        routeLegsArray[i] = tempLeg;
                                    });
                                const partialData = calculatePartialStats(
                                    routeLegsArray,
                                    otherTravelModes[i],
                                    "routes"
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
                                /*travelStats.current[otherTravelModes[i]][
                                    "carbonFootprintCount"
                                ] = otherCarbonFootprintCount;
                                travelStats.current[otherTravelModes[i]][
                                    "travelDuration"
                                ] = otherDuration;*/
                                setTravelStats((prevStats) => {
                                    return {
                                        ...prevStats,
                                        [otherTravelModes[i]]: {
                                            carbonFootprintCount:
                                                otherCarbonFootprintCount,
                                            travelDuration: otherDuration,
                                        },
                                    };
                                });
                            })
                            .catch((status) =>
                                console.log(
                                    `${calculateStats.name} failed due to ${status}`
                                )
                            );
                        break;
                }
            }
            console.log(travelStats);
            // statsPanel.innerHTML = "Generating statistics!";
            // setTimeout(() => {
            //     statsPanel.innerHTML = outputStringArray.join("");
            //     if (!optimizeRoute) {
            //         statsPanel.innerHTML += `<br>Optimize your route now for greater efficiency!<br> Or perhaps you'd like to expand your search radius and look for more sustainable options?`;
            //     }
            // }, 2200);
        }
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

    // Helper Functions----------------------------------------------------------------------------------------------------------------------------------------------------------------
    const autocompleteAddListener = (autocomplete, waypointsNum) => {
        /**
         * Adds a listener to an autocomplete object and updates the corresponding input field with the selected place.
         * @param {google.maps.places.Autocomplete} autocomplete - The Autocomplete object to attach the listener to.
         * @param {number} waypointsNum - The number of waypoints associated with the autocomplete input field.
         * @returns {void} - Does not return anything, but updates the input field values when a place is selected.
         */

        google.maps.event.addListener(autocomplete, "place_changed", () => {
            const place = autocomplete.getPlace();

            // Stringify is problematic, doesn't preserve Dates, functions, undefined, RegExps, Maps, Sets, Blobs, FileLists
            // ∴ replacer parameter in Stringify and reviver parameter in Parse, but still doesn't preserve nested objects/functions
            // ∴ Create own recursive function / libraries
            if (waypointsNum > 0) {
                setWaypointValues((prevWaypoints) =>
                    prevWaypoints.map((input, i) =>
                        i === waypointsNum - 1
                            ? JSON.stringify(place)
                            : prevWaypoints[i]
                    )
                );
            } else {
                document.querySelector("#fromPlaceName").value = place["name"];
                document.querySelector("#fromPlace").value =
                    JSON.stringify(place);
            }
        });
    };

    const resetCesiumViewer = () => {
        /**
         * Resets the Cesium viewer by removing all entities and data sources.
         * @returns {void} - Does not return anything, but clears and resets the Cesium viewer.
         */
        cesiumViewer.current.entities.removeAll();
        cesiumViewer.current.dataSources.removeAll();
    };

    const clearMap = () => {
        /**
         * Clears all markers, polylines, and map elements from the map.
         * @returns {void} - Does not return anything, but clears the map.
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

    const formatRouteName = (locationName) => {
        /**
         * Generates the correct, readable string representation of the location name
         * @param {string} locationName - locationName
         * @returns {string} Formatted representation of the location name
         */
        const locationNameSplit = locationName.split(", ");
        return `${locationNameSplit.length > 2
            ? locationNameSplit[1].length > 4
                ? // if word more than 4 letters, takes word
                locationNameSplit[1]
                : // Else takes Postal Code
                // Eg. Suntec City became 3 Temasek Blvd, #1, #327-328, Singapore 038983
                locationNameSplit[locationNameSplit.length - 1]
            : locationNameSplit[0]
            }`;
    };

    const getLat_LngArray = (result, api) => {
        /**
         * Returns array of latitudes and longitudes from the given Google Maps Directions or Routes API result object
         * @param {Object} result - Result object returned by the Google Maps Directions or Routes API
         * @param {string} api - The API type, either "directions" or "routes"
         * @returns {Array} Array of latitudes and longitudes from the result object
         *
         * Eg. i % 100 takes every 100th lat_lng from each step, from each leg, from each route (Directions)
         * Eg. Decodes polyline and returns every 100th lat_lng from the decoded path (Routes)
         */
        let lat_lngArray;

        switch (api) {
            case "directions":
                lat_lngArray = result.map((leg) =>
                    leg[0]["steps"].map((step) =>
                        step["lat_lngs"].filter((info, i) => i % 100 === 0)
                    )
                );
                break;
            case "routes":
                lat_lngArray = result
                    .map((leg) =>
                        google.maps.geometry.encoding
                            .decodePath(leg["polyline"]["encodedPolyline"])
                            .filter((info, i) => i % 100 === 0)
                    )
                    .flat(2);
                break;
        }
        return lat_lngArray.flat(2);
    };

    const getLat_LngFromPlace = (place) => {
        /**
         * Returns the latitude and longitude from a Google Maps Place object
         * @param {Object} place - The Google Maps Place object.
         * @returns {Object} - An object containing the latitude and longitude
         */
        const placeLat_Lng = JSON.parse(place)["geometry"]["location"];
        return { lat: placeLat_Lng["lat"], lng: placeLat_Lng["lng"] };
    };

    const todayOrTomorrow = (givenDate) => {
        /**
         * Determines if a given date is today or tomorrow.
         * @param {string} givenDate - The date to check, a string in ISO 8601 format
         * @returns {string} - Returns "Today" if the given date is today or else "Tomorrow" if the given date is tomorrow
         */
        let date = new Date(givenDate);
        let currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === currentDate.getTime()) {
            return "Today";
        } else {
            return "Tomorrow";
        }
    };

    const get24Hr = (datetime) => {
        /**
         * Extracts the time portion (hours and minutes) in a 24-hour format from a given datetime string.
         * @param {string} datetime - The datetime string from which to extract the time portion
         * @returns {string} - The time portion in a 24-hour format (HH:mm)
         */
        return datetime.substring(11, 16).replace(":", "");
    };

    const haversine_distance = (pt1, pt2) => {
        /**
         * Calculates the great circle distance between two points using spherical trigonometry
         * @param {Object} pt1 - Coordinates of the origin point as an object with 'lat' and 'lng' properties/functions
         * @param {Object} pt2 - Coordinates of the point of interest as an object with 'lat' and 'lng' properties
         * @returns {number} Distance between the two points rounded to two decimal places, in kilometers
         */
        const R = 6371.071;
        const rlat1 = pt1.lat() * (Math.PI / 180);
        const rlat2 = pt2["lat"] * (Math.PI / 180);
        const difflat = rlat2 - rlat1;
        const difflon = (pt2["lng"] - pt1.lng()) * (Math.PI / 180);

        const distance =
            2 *
            R *
            Math.asin(
                Math.sqrt(
                    Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                    Math.cos(rlat1) *
                    Math.cos(rlat2) *
                    Math.sin(difflon / 2) *
                    Math.sin(difflon / 2)
                )
            );
        return distance.toFixed(2);
    };

    const metersToKm = (d) => {
        /**
         * Converts a distance value from meters to kilometers, with a precision of one decimal place.
         * @param {number} distance - The distance value in meters.
         * @returns {string} - The converted distance value with the appropriate unit (km or m).
         */
        return d > 100 ? `${(d / 1000).toFixed(1)} km` : `${d} m`;
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
    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <>
            <Helmet>
                <script
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBthJKxacm0pSrgo2yEEM_BUjmIryn8VOI&libraries=places,geometry,marker,visualization&v=beta&callback=initMap"
                    async defer></script>

                <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/cesiumjs/1.105/Build/Cesium/Cesium.js"></script>
                <link
                    href="https://ajax.googleapis.com/ajax/libs/cesiumjs/1.105/Build/Cesium/Widgets/widgets.css"
                    rel="stylesheet"
                ></link>
            </Helmet>
            <div className="mapPage">
                <div id="cesium">
                    <button id="toggleMap" onClick={toggleMapClick}>
                        Toggle 3D
                    </button>
                    <br />
                    <div
                        id="cesiumBtnsDiv"
                        style={{
                            display: cesiumBtnsVisible ? "block" : "none",
                        }}
                    >
                        <input id="cesiumCheckbox" type="checkbox" />
                        <input id="cesiumPlace" type="text" defaultValue="" />
                        <input
                            id="cesiumBackward"
                            type="button"
                            value="<"
                            readOnly
                        />
                        <input
                            id="cesiumForward"
                            type="button"
                            value=">"
                            readOnly
                        />
                    </div>
                </div>
                <div
                    id="map"
                    style={{
                        display: gMapVisible ? "block" : "none",
                    }}
                ></div>
                <div
                    id="cesiumMap"
                    style={{
                        display: cesiumMapVisible ? "block" : "none",
                    }}
                ></div>
                {showLeftSidebar ? (
                    <LeftSidebar
                        {...{
                            fromPlaceNameRef,
                            toPlaceNameRef,
                            waypointsNum,
                            setWaypointsNum,
                            waypointValues,
                            setWaypointValues,
                            addWaypoint,
                            calcRoute,
                            currentRouteOverview,
                            currentRoute,
                            showLeftSidebar,
                            setShowLeftSideBar,
                            resetWaypoints,
                        }}
                    />
                ) : (
                    <button
                        className="openLeftSidebarButton"
                        onClick={() => setShowLeftSideBar(!showLeftSidebar)}
                    >
                        <FaChevronRight />
                    </button>
                )}
                {showRightSidebar ? (
                    <RightSidebar
                        {...{
                            showRightSidebar,
                            setShowRightSideBar,
                            currentRoute,
                            user,
                            travelStats,
                        }}
                    />
                ) : (
                    <button
                        className="openRightSidebarButton"
                        onClick={() => setShowRightSideBar(!showRightSidebar)}
                    >
                        <FaChevronLeft />
                    </button>
                )}
            </div>
        </>
    );
};

export default Map;
