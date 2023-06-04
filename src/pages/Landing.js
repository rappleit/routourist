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
import {BsFillPeopleFill} from "react-icons/bs";
import {useState, useEffect} from "react";
import {ImEarth} from "react-icons/im";

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
                        experience and the future of travelling.
                    </p>

                    <div className="sus_sub">
                        <div className="sus_sub1">
                            <img src={environment}></img>
                            <p>
                                Environmental: Reduce your carbon footprint and
                                enjoy partaking in environmentally friendly
                                activities
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
                            <p>Economic: Support the local businesses</p>
                        </div>
                    </div>
                </div>

                <div className="feature_section">
                    <h2>But why?</h2>
                    <div className="feature_sub">
                        <div className="feature_sub_1">
                            <ImLocation className="landingIcon" />
                            <h3>Unsatisfied Tourist</h3>
                            <p>
                                Tourists getting arrested and shamed for
                                disrespecting culture and laws they werent very
                                aware of
                            </p>
                        </div>
                        <div className="feature_sub_1">
                            <BsFillPeopleFill className="landingIcon" />
                            <h3>Annoyed Locals</h3>
                            <p>
                                Disrespect towards local and resource
                                competition makes prices rises, causes locals to
                                be less accepting of tourists.{" "}
                            </p>
                        </div>
                        <div className="feature_sub_1">
                            <ImEarth className="landingIcon" />
                            <h3>Mother Earth suffering</h3>
                            <p>
                                Carbon emissions, irresponsible consumption,
                                environmental deterioration{" "}
                            </p>
                        </div>
                    </div>
                    <h3 className="feature_subtext">
                        We would like to avoid such things from happening which
                        is a result from Unsustainable Tourism.{" "}
                    </h3>
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
                            <h1>
                                Start off with a selection of country of
                                interest
                            </h1>
                            <ul>
                                <li>
                                    Information on the general ways to be a
                                    sustainable tourist is available as well
                                </li>
                                <li>
                                    Being a sustainable tourist can be
                                    applicable in every country!
                                </li>
                            </ul>
                        </div>
                        <img src={selectroute}></img>
                    </div>
                    <div className="procedure_sub">
                        <img src={selectroute}></img>
                        <div className="procedure_text">
                            <h1>Be informed</h1>
                            <ul>
                                <li>
                                    Be updated on the country's laws, cultures
                                    and weather
                                </li>
                                <li>
                                    Learn about the country's local sustainable
                                    events/businesses
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="procedure_sub">
                        <div className="procedure_text">
                            <h1>Select and Customise your route</h1>
                            <ul>
                                <li>
                                    Explore the many routes recommended for you
                                    that will quench your every tourist needs
                                </li>
                                <li>
                                    Add and remove any locations without the
                                    route to make it your own
                                </li>
                                <li>
                                    Recommendations nearby are sent to you to
                                    make your journery more sustainable{" "}
                                </li>
                            </ul>
                        </div>
                        <img src={modifyroute}></img>
                    </div>

                    <div className="procedure_sub">
                        <img src={saveroute}></img>
                        <div className="procedure_text">
                            <h1>Save your route</h1>
                            <ul>
                                <li>
                                    Smoothly save your ammended route to your
                                    saved route library for future uses
                                </li>
                                <li>
                                    However, take note that you must login to be
                                    able to enjoy the feature
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="procedure_sub">
                        <div className="procedure_text">
                            <h1>Share your route to others</h1>
                            <ul>
                                <li>
                                    Share it to others through community routes
                                    and receive sustainable ratings and <br />{" "}
                                    badges to show that your route is truly
                                    sustainable
                                </li>
                                <li>Share it with a direct link</li>
                            </ul>
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
