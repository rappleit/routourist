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
                    <BsChevronDown className="arrowdown"/>
                </div>
                {lawinfo && <ul className="law_info">
                {LawPoints}
                </ul>}
                
                <div className="culture_section" onClick={()=> setOpen('culture_info')}>
                    <h3>Culture</h3>
                    <BsChevronDown className="arrowdown"/>
                </div>
                {cultureinfo && <ul className="culture_info">
                {CulturePoints}
                </ul>}

                <div className="weather_section" onClick={()=> setOpen('weather_info')}>
                    <h3>Weather</h3>
                    <BsChevronDown className="arrowdown"/>
                </div>
                {weatherinfo &&<ul className="weather_info">
                {WeatherPoints}
                </ul> }
            </div>
            <h1 className="sus_header">Sustainable Events</h1>
            {(country=='Singapore')?
            <div className="sus_events">
                
            <div className="event_box">
                <div>
                    <h3 className="event_header">iLight</h3>
                    <h4 className="event_sub">01-25 June 2023</h4>
                    <h4 className="event_sub">Marina Bay</h4>
                </div>
                <div>
                    <a target="_blank" href="https://www.ilightsingapore.gov.sg/about/the-festival/">Learn More</a>
                </div>
                
            </div>
            <div className="event_box">
                <div>
                    <h3 className="event_header">Nature and Sustainability Tour: Biodiversity and Ecosystems</h3>
                    <h4 className="event_sub">10-25 June 2023</h4>
                    <h4 className="event_sub">Gardens by the Bay, Singapore, 018953</h4>
                </div>
                
                <div>
                    <a target="_blank" href="https://www.eventbrite.sg/e/nature-and-sustainability-tour-biodiversity-and-ecosystems-jun-tickets-616912300297?aff=ebdssbdestsearch&keep_tld=1">Learn More</a>
                </div>
            </div>
            <div className="event_box">
                <div>
                    <h3 className="event_header">Yummy Food Expo</h3>
                    <h4 className="event_sub">22-25 June 2023</h4>
                    <h4 className="event_sub">Singapore Expo Hall 5</h4>
                </div>
                <div>
                    <a target="_blank" href="https://www.eventbrite.sg/e/farm-visit-to-hay-dairies-bollywood-farm-tickets-635282175087?aff=ebdssbdestsearch">Learn More</a>
                </div>
            </div>
            
            <div className="event_box">
                <div>
                    <h3 className="event_header">Farm Visit to Hay Dairies & Bollywood Farm</h3>
                    <h4 className="event_sub">10 June 2023</h4>
                    <h4 className="event_sub">Hay Dairies Pte Ltd 3 Lim Chu Kang Lane 4 Singapore, 718859</h4>
                </div>
                <div>
                    <a target="_blank" href="https://www.singaporeexpo.com.sg/sg/what-s-on/events-expo/Yummy-Food-Expo-2023-">Learn More</a>
                </div>
            </div>
        </div>
        :

        <div className="sus_events">
                
        <div className="event_box">
            <div>
                <h3 className="event_header">Rainforest World Music Festival</h3>
                <h4 className="event_sub">23-25 June 2023</h4>
                <h4 className="event_sub">Sarawak Cultural Village, Kuching, Sarawak</h4>
            </div>
            <div>
                <a target="_blank" href="https://rwmf.net/">Learn More</a>
            </div>
            
        </div>
        <div className="event_box">
            <div>
                <h3 className="event_header">Georgetown Festival</h3>
                <h4 className="event_sub">15-30 July 2023</h4>
                <h4 className="event_sub">Georgetown, Penang</h4>
            </div>
            
            <div>
                <a target="_blank" href="https://georgetownfestival.com/2023/">Learn More</a>
            </div>
        </div>
        <div className="event_box">
            <div>
                <h3 className="event_header">Malaysia International Dive Expo</h3>
                <h4 className="event_sub">26-28 May 2023</h4>
                <h4 className="event_sub">MITEC, Kuala Lumpur</h4>
            </div>
            <div>
                <a target="_blank" href="https://www.mide.com.my/">Learn More</a>
            </div>
        </div>
        
        <div className="event_box">
            <div>
                <h3 className="event_header">Langkawi International Maritime and Aerospace Exhibition</h3>
                <h4 className="event_sub">23-27 May 2023</h4>
                <h4 className="event_sub">Mahsuri International Exhibition Centre, MIEC
                and Resort World Langkawi, RWL</h4>
            </div>
            <div>
                <a target="_blank" href="https://limamalaysia.com.my/">Learn More</a>
            </div>
        </div>
    </div>
            
        }
            
            




            <h1 className="sus_header">Businesses & Locations</h1>

            {(country=='Singapore')?
            <div className="sus_locations">
                <div className="event_box">
                    <div>
                        <h3 className="event_header">The Green Collective SG</h3>
                        <h4 className="event_sub">#02-18, Funan Mall, 107 North Bridge Rd, 179105</h4>
                    </div>
                    <div>
                        <a target="_blank" href="https://www.thegreencollective.sg/">Learn More</a>
                    </div>
                </div>

                <div className="event_box">
                    <div>
                        <h3 className="event_header">Bamboo Straw Girl</h3>
                        <h4 className="event_sub">Online e-commerce</h4>
                    </div>
        
                    <div>
                        <a target="_blank" href="https://bamboostrawgirl.com/pages/about-us">Learn More</a>
                    </div>
                </div>
                <div className="event_box">
                    <div>
                        <h3 className="event_header">The Sustainability Project</h3>
                        <h4 className="event_sub">21 Bukit Batok Cres, #06-78 Wcega Tower, Singapore 658065</h4>
                    </div>
                    <div>
                        <a target="_blank" href="https://thesustainabilityproject.life/">Learn More</a>
                    </div>
                </div>
                <div className="event_box">
                    <div>
                        <h3 className="event_header">Bollywood Farms</h3>
                        <h4 className="event_sub">100 Neo Tiew Rd, Singapore 719026</h4>
                    </div>
                    <div>
                        <a target="_blank" href="https://bollywoodfarms.com/">Learn More</a>
                    </div>
                </div>
            </div>
            
            :

            <div className="sus_locations">
            <div className="event_box">
                <div>
                    <h3 className="event_header">The Green Collective SG</h3>
                    <h4 className="event_sub">#02-18, Funan Mall, 107 North Bridge Rd, 179105</h4>
                </div>
                <div>
                    <a target="_blank" href="https://www.thegreencollective.sg/">Learn More</a>
                </div>
            </div>

            <div className="event_box">
                <div>
                    <h3 className="event_header">Bamboo Straw Girl</h3>
                    <h4 className="event_sub">Online e-commerce</h4>
                </div>
    
                <div>
                    <a target="_blank" href="https://bamboostrawgirl.com/pages/about-us">Learn More</a>
                </div>
            </div>
            <div className="event_box">
                <div>
                    <h3 className="event_header">The Sustainability Project</h3>
                    <h4 className="event_sub">21 Bukit Batok Cres, #06-78 Wcega Tower, Singapore 658065</h4>
                </div>
                <div>
                    <a target="_blank" href="https://thesustainabilityproject.life/">Learn More</a>
                </div>
            </div>
            <div className="event_box">
                <div>
                    <h3 className="event_header">Bollywood Farms</h3>
                    <h4 className="event_sub">100 Neo Tiew Rd, Singapore 719026</h4>
                </div>
                <div>
                    <a target="_blank" href="https://bollywoodfarms.com/">Learn More</a>
                </div>
            </div>
        </div>
        }
        </div>
    )
}

export default CountryInfo