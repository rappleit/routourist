import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/countryinfo.css';
import {BsChevronDown} from 'react-icons/bs';
import { FlareSharp } from "@mui/icons-material";

const CountryInfo = () => {
    const navigate = useNavigate()
    const [lawinfo,setLawInfo] =useState(false)
    const [cultureinfo,setCultureInfo] =useState(false)
    const [weatherinfo,setWeatherInfo] =useState(false)
    const country= localStorage.getItem("Country");
    const language= localStorage.getItem("Language")
    const malaysiaInfo = {'Law':['Follows Islamic Law, meaning Muslims must follow Sharia Law', 'Strict Drug Laws','Restricted Religious Activities, prohibited to preselytizing Muslims'],'Culture':['Languages Spoken: Malay, English','Multicultural society, mainly made out of Malay, Chinese and Indian','Multireligious society, mainly Islam, Buddhism and Christianity','The monarchy is highly respected'],'Weather':['Tropical Climate', 'From 25°C to 35°C','Potential Tropical Storms']}
    const singaporeInfo = {'Law':[''],'Culture':['Languages Spoken: English, Chinese, Malay and Tamil','Multicultural society, mainly made out of Chinese, Malay and Indian','Multireligious society, mainly Buddhism, Christianity and Islam','',''],'Weather':['']}
    const [LawPoints,setLawPoints] = useState('')
    const [CulturePoints,setCulturePoints] = useState('')
    const [WeatherPoints,setWeatherPoints] = useState('')

    const setChange = (buttonswitch) =>{
        if (buttonswitch == 'country'){
            navigate('/country')
        }
        else if (buttonswitch == 'preset'){
            navigate('/routelibrary')
        }
        if (buttonswitch == 'build'){
            navigate('/map')
        }
    }

    const setOpen = (information_cat) =>{
        if (information_cat == 'law_info'){
            if (lawinfo==false){
                setLawInfo(true)
                if(country=='Singapore'){
                    setLawPoints(singaporeInfo['Law'].map((point)=>
                    <li>{point}</li>))}
                if(country=='Malaysia'){
                    setLawPoints(malaysiaInfo['Law'].map((point)=>
                    <li>{point}</li>))}
                }
            else{
                setLawInfo(false)
            }}
        
        if (information_cat == 'culture_info'){
            if (cultureinfo==false){
                setCultureInfo(true)
                if(country=='Singapore'){
                    setCulturePoints(singaporeInfo['Culture'].map((point)=>
                    <li>{point}</li>))
                }
                if(country=='Malaysia'){
                    setCulturePoints(malaysiaInfo['Culture'].map((point)=>
                    <li>{point}</li>))}
            }
            else{
                setCultureInfo(false)
            }
        } 
        if (information_cat == 'weather_info'){
            if (weatherinfo==false){
                setWeatherInfo(true)
                if(country=='Singapore'){
                    setWeatherPoints(singaporeInfo['Weather'].map((point)=>
                    <li>{point}</li>))
                }
                if(country=='Malaysia'){
                    setWeatherPoints(malaysiaInfo['Weather'].map((point)=>
                    <li>{point}</li>))}
            }
            else{
                setWeatherInfo(false)
            }
        }
    }

        
  

    return(
        <div className="countryinfo_section">
            <div className="head_section">
                <h1>Things to note in <span className="country_section">{country}</span></h1>
                <div className="buttons_section">
                    <button onClick={()=> setChange('country')}>Select Country</button>
                    <button onClick={()=> setChange('preset')}>Preset Route</button>
                    <button onClick={()=> setChange('build')}>Build Route</button>
                    <div className="button_description">
                        <ul>
                            <li>To go back to country selection, click 'Select Country'</li>
                            <li>If you wish to discover places in {country}, click 'Preset Route'</li>
                            <li>If you wish to build your multi destination route, click 'Build Route'</li>
                        </ul> 
                    </div>
                </div>
            </div>

            <div className="information_section">
                <div className="law_section" onClick={()=> setOpen('law_info')}>
                    <h3>Law</h3>
                    <BsChevronDown/>
                </div>
                {lawinfo && <ul className="law_info">
                {LawPoints}
                </ul>}
                
                <div className="culture_section" onClick={()=> setOpen('culture_info')}>
                    <h3>Culture</h3>
                    <BsChevronDown/>
                </div>
                {cultureinfo && <ul className="culture_info">
                {CulturePoints}
                </ul>}

                <div className="weather_section" onClick={()=> setOpen('weather_info')}>
                    <h3>Weather</h3>
                    <BsChevronDown/>
                </div>
                {weatherinfo &&<ul className="weather_info">
                {WeatherPoints}
                </ul> }
            </div>

            <div className="sus_events">

            </div>

            <div className="sus_locations">

            </div>
        </div>
    )
}

export default CountryInfo