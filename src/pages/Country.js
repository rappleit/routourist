import "../styles/country.css";
import {FaHandsHelping} from "react-icons/fa";
import {TbTrees} from "react-icons/tb";
import {BsFillPeopleFill} from "react-icons/bs";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import allLangs from "../data/AllLangs.json";
import allRegions from "../data/AllRegions.json";

const Country = () => {
    const [country, setCountry] = useState("");
    const [lang, setLang] = useState("");
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        e.preventDefault();
        const {value} = e.target;
        const {textContent} = e.target.options[e.target.selectedIndex];
        if (e.target.classList.contains("country_selection")) {
            localStorage.setItem("countryCode", value);
            setCountry(textContent);
            localStorage.setItem("countryName", textContent);
        }
        if (e.target.classList.contains("lang_selection")) {
            localStorage.setItem("languageCode", value);
            setLang(textContent);
            localStorage.setItem("languageName", textContent);
        }
    };

    return (
        <div className="country_page">
            <div className="sustainable_section">
                <div className="sustainable_container">
                    <div className="sus_box">
                        <FaHandsHelping />
                        <h3>Support Locals</h3>
                        <p>
                            Embrace local experiences by staying in local-owned
                            accommodations and visiting sustainable businesses
                            and events. <br></br>
                            <br></br>Not only will you enjoy authentic
                            experiences, but you'll also contribute to
                            preserving local culture and livelihoods.
                        </p>
                    </div>
                    <div className="sus_box">
                        <TbTrees />
                        <h3>Care for the Environment</h3>
                        <p>
                            4.3 Billion Tonnes of carbon is emitted annually due
                            to tourism according to the{" "}
                            <a
                                className="linkjournal"
                                target="_blank"
                                href="https://doi.org/10.1093/ijlct/ctab026"
                            >
                                International Journal of Low-Carbon
                                Technologies, September 2021
                            </a>
                            . <br></br>
                            <br></br>Make a positive impact by choosing
                            sustainable transportation options, such as
                            optimized routes or public transport, to reduce your
                            carbon footprint and protect the environment.{" "}
                        </p>
                    </div>
                    <div className="sus_box">
                        <BsFillPeopleFill />
                        <h3>Respect the Law and Culture</h3>
                        <p>
                            When traveling, it's important to respect the laws
                            and cultural norms of the countries you visit.{" "}
                            <br></br>
                            <br></br>Take the time to familiarize yourself with
                            some of local customs and guidelines provided below
                            to ensure a harmonious and respectful experience for
                            both locals and tourists. <br></br>
                            <br></br>To view them, please set the country you
                            wish to visit.{" "}
                        </p>
                    </div>
                </div>
            </div>
            <div className="form_section">
                <div className="input_section">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (country !== "" && lang !== "") {
                                navigate("/countryinfo");
                            }
                        }}
                    >
                        <select
                            className="country_selection"
                            onChange={handleOnChange}
                        >
                            <option value="" disabled selected hidden>
                                Country
                            </option>
                            {allRegions.map((region) => (
                                <option
                                    value={region["code"]}
                                    disabled={
                                        region["name"] !== "Singapore" &&
                                        region["name"] !== "Malaysia"
                                    }
                                    hidden={
                                        region["name"] !== "Singapore" &&
                                        region["name"] !== "Malaysia"
                                    }
                                >
                                    {region["name"]}
                                </option>
                            ))}
                        </select>
                        <select
                            className="lang_selection"
                            onChange={handleOnChange}
                        >
                            <option value="" disabled selected hidden>
                                Language
                            </option>
                            {allLangs.map((language) => (
                                <option value={language["code"]}>
                                    {language["name"]}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Set</button>
                    </form>
                </div>
            </div>

            <div className="footer_section">
                <h2>Please set the country of interest.</h2>
            </div>
        </div>
    );
};

export default Country;
