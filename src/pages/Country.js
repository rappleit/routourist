import '../styles/country.css';
import {FaHandsHelping} from 'react-icons/fa'
import {TbTrees} from 'react-icons/tb'
import {BsFillPeopleFill} from 'react-icons/bs'
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Country = () => {
    const [isValid,setIsValid] = useState(false)
    const [country,setCountry] = useState("")
    const [lang,setLang] = useState("")
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const countrySelect = document.getElementsByClassName("country_selection");
        const langSelect = document.getElementsByClassName("lang_selection");
        e.preventDefault();
        if(country==""){
            setCountry(countrySelect[0].value);
            localStorage.setItem("Country", country)
        }
        if(lang==""){
            setLang(langSelect[0].value);
            localStorage.setItem("Language", lang)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(country=="" || lang==""){
            console.log('Nah')
        } else{
            navigate('/countryinfo')
        }
        
    }

    useEffect(()=>{
        localStorage.setItem("Country", country)
        localStorage.setItem("Language", lang)
        console.log(country)
        console.log(lang)
    },[lang])


    return(
        <div className="country_page">
            <div className="sustainable_section">
                <div className='sustainable_container'>
                    <div className="sus_box">
                        <FaHandsHelping/>
                        <h3>Support Locals</h3>
                        <p>Stay in local-owned accomodations and visit local sustainable businesses/events! Not only will you enjoy/learn authentic local experiences, you will help to preserve them.</p>
                    </div>
                    <div className="sus_box">
                        <TbTrees/>
                        <h3>Care for the Environment</h3> 
                        <p>4.3 Billion Ton of carbon is emitted annually due to tourism according to <a className='linkjournal' target="_blank" href='https://doi.org/10.1093/ijlct/ctab026'>Tianyue Huang , Zi Tang, Estimation of tourism carbon footprint and carbon capacity, International Journal of Low-Carbon Technologies,September 2021</a>. Take better alternatives for transportation eg an optimised route or public transport! </p>
                    </div>
                    <div className="sus_box">
                        <BsFillPeopleFill/>
                        <h3>Respect the Law and Culture</h3>
                        <p>In every country, they have their respective cultures and rules. To ensure locals are happy with tourists, please take note of some of the more important ones. We have provided digestable information it. To view it please set the country you wish to visit. </p>
                    </div>
                </div>
                
            </div>
            <div className='form_section'>
                <div className="input_section">
                    <form onSubmit={handleSubmit}>
                        <select className='country_selection' onChange={handleOnChange}>
                            <option value="" disabled selected hidden>Country</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                        </select>
                        <select className='lang_selection' onChange={handleOnChange}>
                            <option value="" disabled selected hidden>Language</option>
                            <option value="English">English</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Malay">Malay</option>
                        </select>
                        <button type='submit'>Set</button>
                    </form>
                </div>
                
            </div>
            

            <div className="footer_section">
                <h2>Please set the country of interest.</h2>
            </div>
        </div>
    )
}

export default Country