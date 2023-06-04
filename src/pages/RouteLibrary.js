import {useEffect, useState} from "react";
import "../styles/libraryroute.css";
import {IoInformationCircle, IoLeafSharp} from "react-icons/io5";
import {
    equalTo,
    getDatabase,
    limitToLast,
    onValue,
    orderByChild,
    query,
    ref,
} from "@firebase/database";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";

const RouteLibrary = () => {
    const countryinfo = localStorage.getItem("Countryinfo");

    const [isPreset, setIsPreset] = useState(true);
    const [isCommunity, setIsCommunity] = useState(false);

    const [communityRoutes, setCommunityRoutes] = useState({});
    const [communityRoutesNum, setCommunityRoutesNum] = useState(0);

    const [presetRoutes, setPresetRoutes] = useState({});
    const [presetRoutesNum, setPresetRoutesNum] = useState(0);

    const [topRoutes, setTopRoutes] = useState({});
    const [topRoutesNum, setTopRoutesNum] = useState(0);

    const navigate = useNavigate();

    const db = getDatabase();
    const publishedRoutesRef = ref(db, "publishedroutes/");

    const retrieveCommunityRoutes = () => {
        const communityQuery = query(
            publishedRoutesRef,
            orderByChild("type"),
            equalTo("Community")
        );
        onValue(communityQuery, (snapshot) => {
            setCommunityRoutes(snapshot.val());
            setCommunityRoutesNum(snapshot.size);
        });
    };

    const retrievePresetRoutes = () => {
        const presetQuery = query(
            publishedRoutesRef,
            orderByChild("type"),
            equalTo("Preset")
        );
        onValue(presetQuery, (snapshot) => {
            setPresetRoutes(snapshot.val());
            setPresetRoutesNum(snapshot.size);
        });
    };

    const retrieveTopRoutes = () => {
        const topQuery = query(publishedRoutesRef, orderByChild("score"));
        onValue(topQuery, (snapshot) => {
            setTopRoutes(snapshot.val());
            setTopRoutesNum(snapshot.size);
        });
    };

    useEffect(() => {
        retrieveCommunityRoutes();
    }, [communityRoutesNum]);

    useEffect(() => {
        retrievePresetRoutes();
    }, [presetRoutesNum]);

    useEffect(() => {
        retrieveTopRoutes();
    }, [topRoutesNum]);

    return (
        <div className="libraryroute">
            <div className="header_section">
                <div className="left_header">
                    <h1>Route Library</h1>
                    <button
                        className={isPreset ? "buttonSelected" : ""}
                        onClick={() => {
                            setIsPreset(true);
                            setIsCommunity(false);
                        }}
                    >
                        Preset
                    </button>
                    <button
                        className={isCommunity ? "buttonSelected" : ""}
                        onClick={() => {
                            setIsCommunity(true);
                            setIsPreset(false);
                        }}
                    >
                        Community
                    </button>
                </div>
            </div>
            <div className="body_section">
                <div className="body_title">
                    <h2>{isPreset ? "Preset Routes" : "Community Routes"}</h2>
                </div>
                <p className="body_desc">
                    {isPreset
                        ? "Discover the handpicked routes curated by the Routourist Team!"
                        : "Discover and explore the routes created by fellow users!"}
                </p>
                <div className="recommended_section cat_section">
                    <h3>Recommended</h3>
                    <p className="infoNote">
                        <IoInformationCircle /> These routes are recommended due
                        to their top Sustainability Scores. Sustainability
                        Scores are evaluated based on how well the route
                        promotes sustainable tourism, such as encouraging the
                        use of eco-friendly modes of transport and support local
                        businesses.
                    </p>
                    <div className="cards_section">
                        {Object.values(topRoutes)
                            .reverse()
                            .filter(
                                (route) =>
                                    route.type ===
                                    (isPreset ? "Preset" : "Community")
                            )
                            .map((r, i) => (
                                <div className="routeCard" key={i} onClick={() =>
                                    navigate("/routelibrary/" + r.id)
                                }>
                                    <img
                                        src="/assets/MapThumbnailSG.png"
                                        alt=""
                                    />
                                    <h3>{r.name}</h3>
                                    <p className="routeCardLocations">
                                        {r.route.waypoints.length === 1
                                            ? 2
                                            : r.route.waypoints.length}{" "}
                                        locations
                                    </p>
                                    <p className="routeCardScore">
                                        <IoLeafSharp /> Score: {r.score}
                                    </p>
                                    <p className="routeCardCat">
                                        Category: {r.category}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="cat_section">
                    <h3>Nature & Wildlife</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter(
                            (route) => route.category === "Nature & Wildlife"
                        ).length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) =>
                                        route.category === "Nature & Wildlife"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="cat_section">
                    <h3>Cultural Heritage</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter(
                            (route) => route.category === "Cultural Heritage"
                        ).length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) =>
                                        route.category === "Cultural Heritage"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Sustainable Education & Awareness</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter(
                            (route) =>
                                route.category ===
                                "Sustainable Education & Awareness"
                        ).length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) =>
                                        route.category ===
                                        "Sustainable Education & Awareness"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Culinary Delights</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter(
                            (route) => route.category === "Culinary Delights"
                        ).length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) =>
                                        route.category === "Culinary Delights"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Romantic</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter((route) => route.category === "Romantic")
                            .length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) => route.category === "Romantic"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Iconic Landmarks</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter(
                            (route) => route.category === "Iconic Landmarks"
                        ).length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) =>
                                        route.category === "Iconic Landmarks"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Shopping</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter((route) => route.category === "Shopping")
                            .length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter(
                                    (route) => route.category === "Shopping"
                                )
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cat_section">
                    <h3>Others</h3>
                    <div className="cards_section">
                        {Object.values(
                            isPreset ? presetRoutes : communityRoutes
                        ).filter((route) => route.category === "Others")
                            .length !== 0 ? (
                            Object.values(
                                isPreset ? presetRoutes : communityRoutes
                            )
                                .filter((route) => route.category === "Others")
                                .map((r, i) => (
                                    <div
                                        key={i}
                                        className="routeCard"
                                        onClick={() =>
                                            navigate("/routelibrary/" + r.id)
                                        }
                                    >
                                        <img
                                            src="/assets/MapThumbnailSG.png"
                                            alt=""
                                        />
                                        <h3>{r.name}</h3>
                                        <p className="routeCardLocations">
                                            {r.route.waypoints.length === 1
                                                ? 2
                                                : r.route.waypoints.length}{" "}
                                            locations
                                        </p>
                                        <p className="routeCardScore">
                                            <IoLeafSharp /> Score: {r.score}
                                        </p>
                                        <p className="routeCardAuthor">
                                            Author: {r.author}
                                        </p>
                                    </div>
                                ))
                        ) : (
                            <div className="noRoutesCard">
                                <p>No Routes</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RouteLibrary;
