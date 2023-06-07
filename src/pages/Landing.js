import "../styles/landing.css";
import logo from "../images/routouristlogo.png";
import travel from "../images/travel.svg";
import firebase_logo from "../images/firebase_logo.png";
import map_logo from "../images/maps_logo.png";
import cloud_logo from "../images/cloud_logo.png";
import environment from "../images/environment_logo.png";
import economic from "../images/economic_logo.png";
import ethics from "../images/ethics_logo.png";
import social from "../images/social_logo.png";
import modifyroute from "../images/modifyroute.svg";
import selectroute from "../images/selectroute.svg";
import saveroute from "../images/saveroute.svg";
import shareroute from "../images/shareroute.svg";
import {BsCheckCircleFill} from "react-icons/bs";
import {FaClipboardList} from "react-icons/fa";
import {ImLocation} from "react-icons/im";
import {FiThumbsUp} from "react-icons/fi";
import {useState, useEffect} from "react";

const Landing = () => {
    const businessContent = document.getElementsByClassName("business_section");
    const consumerContent = document.getElementsByClassName("consumer_section");

    const businessButton = document.getElementsByClassName("business");
    const consumerButton = document.getElementsByClassName("consumer");
    const setBusiness = () => {
        businessContent[0].style.display = "block";
        consumerContent[0].style.display = "none";

        businessButton[0].style.background = "#393939";
        businessButton[0].style.color = "#E0E0E0";
        businessButton[0].style.boxShadow = "none";

        consumerButton[0].style.background = "#E0E0E0";
        consumerButton[0].style.color = "#393939";
        consumerButton[0].style.boxShadow = "0 3px 10px rgb(0 0 0 / 0.2)";
    };

    const setConsumer = () => {
        businessContent[0].style.display = "none";
        consumerContent[0].style.display = "block";

        businessButton[0].style.background = "#E0E0E0";
        businessButton[0].style.color = "#393939";
        businessButton[0].style.boxShadow = "0 3px 10px rgb(0 0 0 / 0.2)";

        consumerButton[0].style.background = "#393939";
        consumerButton[0].style.color = "#E0E0E0";
        consumerButton[0].style.boxShadow = "none";
    };
    return (
        <div className="landingPage">
            <div className="firstsection">
                <div className="topheader">
                    <div className="headerlogo">
                        <img src={logo} alt="routourist logo"></img>
                        <h2>Routourist</h2>
                    </div>

                    <div className="headerbutton">
                        <a href="/country">Try Now</a>
                        <a href="/login">Login</a>
                    </div>
                </div>

                <div className="title_section">
                    <div className="left_section">
                        <div className="main_title">
                            <h1 className="main_titletxt">
                                All in one guide<br></br>
                                for anybody<br></br>
                                in any country
                            </h1>
                        </div>

                        <div className="sub_title">
                            <div className="sub_title1">
                                <BsCheckCircleFill />
                                <p className="sub_title2">
                                    Save time in planning trips
                                </p>
                            </div>
                            <div className="sub_title1">
                                <BsCheckCircleFill />
                                <p className="sub_title2">
                                    Stay informed, travel smart
                                </p>
                            </div>
                            <div className="sub_title1">
                                <BsCheckCircleFill />
                                <p className="sub_title2">
                                    Sustainable travelling
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="right_section">
                        <img src={travel} alt="travel"></img>
                    </div>
                </div>
            </div>

            <div className="powered_section">
                <div>Powered By:</div>
                <div>
                    <img src={firebase_logo}></img>
                    <img src={cloud_logo}></img>
                    <img src={map_logo}></img>
                </div>
            </div>

            <div className="switch_section">
                <button className="consumer" onClick={() => setConsumer()}>
                    Consumer
                </button>
                <button className="business" onClick={() => setBusiness()}>
                    Business
                </button>
            </div>
            <div className="consumer_section">
                <div className="sus_section">
                    <h1>We aspire Sustainable Travelling.</h1>
                    <p>
                        We made your travelling more sustainable to enhance your
                        experience and the future of travelling, while we're at
                        it.
                    </p>

                    <div className="sus_sub">
                        <div className="sus_sub1">
                            <img src={environment}></img>
                            <p>
                                Environmental: Minimize your carbon footprint
                                and embrace sustainable practices wherever
                                possible.
                            </p>
                        </div>
                        <div className="sus_sub1">
                            <img src={social}></img>
                            <p>
                                Social: Immerse yourself in an authentic
                                culturally rich experiences and learn about
                                their traditions and laws.
                            </p>
                        </div>
                        <div className="sus_sub1">
                            <img src={economic}></img>
                            <p>
                                Economic: Support local businesses and
                                contribute to the growth and prosperity of the
                                community.{" "}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="feature_section">
                    <h2>Features</h2>
                    <div className="feature_sub">
                        <div className="feature_sub_1">
                            <ImLocation className="icon" />
                            <h3>Routing System</h3>
                            <p>
                                Optimized multi-destination travelling with a
                                curated selection of preset and community
                                routes.
                            </p>
                        </div>
                        <div className="feature_sub_1">
                            <FaClipboardList className="icon" />
                            <h3>Information Bar</h3>
                            <p>
                                Access valuable data that enhances your travel
                                experience, including details on carbon
                                footprint, weather conditions, local culture,
                                and much more.
                            </p>
                        </div>
                        <div className="feature_sub_1">
                            <FiThumbsUp className="icon" />
                            <h3>Recommendation Service</h3>
                            <p>
                                Live a little! Our intelligent recommendation
                                service guides you to unique experiences and
                                hidden gems along your journey.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="comment_section">
                    <hr></hr>
                    <div className="comment_sub">
                        <p>
                            Effortless exploration. A variety of well-crafted
                            routes at my fingertips. Instant access to valuable
                            information. Thanks to this app, my travels have
                            become seamless and exhilarating. I recently
                            ventured to Cambodia and discovered a whole new
                            perspective on the country. Highly recommended!
                        </p>
                        <h3>- Amy, Singapore</h3>

                        <div>
                            <span></span>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <div className="procedure_section">
                    <div className="procedure_sub">
                        <div className="procedure_text">
                            <h1>Begin. Build.</h1>
                            <p>
                                <li>Comprehensive selection of countries.</li>
                                <li>
                                    Exciting preset or community routes across
                                    various categories to perfectly match your
                                    preferences and interests!
                                </li>
                            </p>
                        </div>
                        <img src={selectroute}></img>
                    </div>

                    <div className="procedure_section">
                        <div className="procedure_sub">
                            <img src={selectroute}></img>
                            <div className="procedure_text">
                                <h1>Informed. In touch.</h1>
                                <p>
                                    {" "}
                                    <li>
                                        On the country's laws, cultures and
                                        weather.
                                    </li>
                                    <li>
                                        With the country's local sustainable
                                        events or businesses.
                                    </li>
                                    <li>
                                        Being a sustainable tourist is easy!
                                    </li>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="procedure_sub">
                        <div className="procedure_text">
                            <h1>Customize. Craft.</h1>
                            <p>
                                <li>
                                    Seamlessly add or remove locations to
                                    personalize your selected route, ensuring a
                                    unique and memorable journey.
                                </li>
                                <li>
                                    Recommendations nearby help you make the
                                    more sustainable choice.
                                </li>
                            </p>
                        </div>
                        <img src={modifyroute}></img>
                    </div>

                    <div className="procedure_sub">
                        <img src={saveroute}></img>
                        <div className="procedure_text">
                            <h1>Preserve. Ponder.</h1>
                            <p>
                                <li>
                                    Who knows? Your saved route might come in
                                    handy for your next thrilling escapade!{" "}
                                    <br></br>
                                    <span style={{fontSize: "12px"}}>
                                        * You must log in to enjoy this feature
                                    </span>
                                </li>
                            </p>
                        </div>
                    </div>

                    <div className="procedure_sub">
                        <div className="procedure_text">
                            <h1>Share. Spark.</h1>
                            <p>
                                <li>
                                    Spread the joy by sharing your route with
                                    others via a direct link, and receive
                                    sustainable ratings and badges to highlight
                                    the sustainability of your route!
                                </li>
                                <li>
                                    It's also a great way to ensure everyone's
                                    safety!
                                </li>
                            </p>
                        </div>
                        <img src={shareroute}></img>
                    </div>
                </div>

                <div className="callToAction_section"></div>
            </div>

            <div className="business_section">
                <div className="sus_section">
                    <h1>Elevate your sustainable business with our platform</h1>
                    <p>
                        We are dedicated to empowering sustainable businesses by
                        enhancing their visibility and connecting them with our
                        user base.
                    </p>
                    <div className="sus_sub">
                        <div className="sus_sub1">
                            <img src={environment}></img>
                            <p>
                                Environmental: Products and services that are
                                created through sustainable practices or promote
                                sustainability.
                            </p>
                        </div>
                        <div className="sus_sub1">
                            <img src={social}></img>
                            <p>
                                Social: Products and services that hold cultural
                                significance, fostering a deeper appreciation
                                for local traditions.
                            </p>
                        </div>
                        <div className="sus_sub1">
                            <img src={ethics}></img>
                            <p>
                                Economic: Ethically sourced products and
                                services that prioritize fair labor practices,
                                promoting a more equitable economy.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="comment_section"></div>

                <div className="procedure_section"></div>

                <div className="callToAction_section"></div>
            </div>

            <div className="footer_section"></div>
        </div>
    );
};

export default Landing;
