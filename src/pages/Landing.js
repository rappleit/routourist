import '../styles/landing.css';
import logo from '../images/routouristlogo.png';
import travel from '../images/travel.svg';
import firebase_logo from '../images/firebase_logo.png';
import map_logo from '../images/maps_logo.png';
import cloud_logo from '../images/cloud_logo.png';
import environment from '../images/environment_logo.png';
import economic from '../images/economic_logo.png';
import ethics from '../images/ethics_logo.png';
import social from '../images/social_logo.png';
import modifyroute from '../images/modifyroute.svg';
import selectroute from '../images/selectroute.svg';
import saveroute from '../images/saveroute.svg';
import shareroute from '../images/shareroute.svg';
import {BsCheckCircleFill} from 'react-icons/bs';
import {FaClipboardList} from 'react-icons/fa'
import {ImLocation} from 'react-icons/im'
import {FiThumbsUp} from 'react-icons/fi'
import { useState,useEffect } from 'react';


const Landing = () => {
    const businessContent = document.getElementsByClassName('business_section');
    const consumerContent = document.getElementsByClassName('consumer_section');

    const businessButton = document.getElementsByClassName("business");
    const consumerButton = document.getElementsByClassName("consumer");
    const setBusiness = () => {
        businessContent[0].style.display = 'block'
        consumerContent[0].style.display = 'none'

        businessButton[0].style.background = '#393939'
        businessButton[0].style.color = '#E0E0E0'
        businessButton[0].style.boxShadow = 'none'

        consumerButton[0].style.background = "#E0E0E0"
        consumerButton[0].style.color = "#393939"
        consumerButton[0].style.boxShadow = '0 3px 10px rgb(0 0 0 / 0.2)'
    }

    const setConsumer = () => {
        businessContent[0].style.display = 'none'
        consumerContent[0] .style.display = 'block'

        businessButton[0].style.background = '#E0E0E0'
        businessButton[0].style.color = '#393939'
        businessButton[0].style.boxShadow = '0 3px 10px rgb(0 0 0 / 0.2)'

        consumerButton[0].style.background = "#393939"
        consumerButton[0].style.color = "#E0E0E0"
        consumerButton[0].style.boxShadow = 'none'
    }
    return ( 
        
        <div className="landingPage">
            <div className='firstsection'>
                <div className="topheader">
                    <div className='headerlogo'>
                        <img src={logo} alt='routourist logo'></img>
                        <h2>Routourist</h2>
                    </div>
                    
                    <div className='headerbutton'>
                        <a className='faq_button'>FAQ</a>
                        <a href='/map'>Try Now</a>
                    </div>
                </div>

                <div className="title_section">
                    <div className='left_section'>
                        <div className='main_title'>
                            <h1 className='main_titletxt'>All in one guide<br></br>
                            for anybody<br></br>
                            in any country
                            </h1>
                        </div>
                        

                        <div className='sub_title'>
                            <div className='sub_title1'>
                                <BsCheckCircleFill/>
                                <p className='sub_title2'>Save time in planning trips</p>
                            </div>
                            <div className='sub_title1'>
                                <BsCheckCircleFill/>
                                <p className='sub_title2'>Be more informed in trips</p>
                            </div>
                            <div className='sub_title1'>
                                <BsCheckCircleFill/>
                                <p className='sub_title2'>Sustainable travelling</p>
                            </div>
                        </div>

                        <div className='business_collab'>
                            <button>Collab Now</button>
                            <p>For Business collaboration, click this button to apply now!</p>
                        </div>
                    </div>
                    <div className='right_section'>
                        <img src={travel} alt='travel'></img>
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
                <button className='consumer' onClick={()=> setConsumer()}>Consumer</button>
                <button className='business' onClick={()=> setBusiness()}>Business</button>
            </div>
            <div className='consumer_section'>
                <div className="sus_section">
                    <h1>We aspire Sustainable Travelling.</h1>
                    <p>We made your travelling more sustainble to enchance your experience
                        and the future of travelling.
                    </p>

                    <div className='sus_sub'>
                        <div className='sus_sub1'>
                            <img src={environment}></img>
                            <p>Environmental: Reduce your carbon footprint and help you to recycle your trash whenever you can.</p>
                        </div>
                        <div className='sus_sub1'>
                            <img src={social}></img>
                            <p>Social: Immerse yourself in an authentic once in a lifetime experience and learn their traditions/laws.</p>
                        </div>
                        <div className='sus_sub1'>
                            <img src={economic}></img>
                            <p>Economic: Support the local businesses </p>
                        </div>
                    </div>

                </div>

                <div className='feature_section'>
                    <h2>Features</h2>
                    <div className='feature_sub'>
                        <div className='feature_sub_1'>
                            <ImLocation className='icon'/>
                            <h3>Routing System</h3>
                            <p>Optimised multi-Destination travelling with a list of preset routes and community routes</p>
                        </div>
                        <div className='feature_sub_1'>
                            <FaClipboardList className='icon'/>
                            <h3>Information Bar</h3>
                            <p>Access data that will affect your travel and others such as carbon footprint, weather, culture of the surrounding area and more</p>
                        </div>
                        <div className='feature_sub_1'>
                            <FiThumbsUp className='icon'/>
                            <h3>Recommendation Service</h3>
                            <p>As you travel, make impromptu plans and live a little through our smart recommendation system.</p>
                        </div>
                    </div>
                </div>

                <div className="comment_section">
                    <hr></hr>
                    <div className='comment_sub'>
                        
                        <p>"Seamless travel. Multiple planned out routes to choose from. Information in a click of a button. I can now travel anywhere seamlessly anywhere. I even used this app during my travel in Cambodia. It showed me a whole new side to Cambodia"</p>
                        <h3>- Amy, Singapore</h3>
                        
                        <div>
                            <span>

                            </span>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <div className="procedure_section">
                    <div className='procedure_sub'>
                        <img src={selectroute}></img>
                        <div className='procedure_text'>
                            <h1>Start with a selection of presetted/community routes</h1>
                            <p>Choose a wide range of routes from different categories to best suit your needs.</p>
                        </div>
                    </div>

                    <div className='procedure_sub'>
                        <div className='procedure_text'>
                            <h1>Customise your route</h1>
                            <p>Seamlessly remove and add any location to your selected route.</p>
                        </div>
                        <img src={modifyroute}></img>
                    </div>

                    <div className='procedure_sub'>
                        <img src={saveroute}></img>
                        <div className='procedure_text'>
                            <h1>Save your route</h1>
                            <p>Who knows? Maybe youll need it in the future.</p>
                        </div>
                    </div>

                    <div className='procedure_sub'>
                        <div className='procedure_text'>
                            <h1>Share your route to others</h1>
                            <p>Share your route to share others the same experience. It can also be used for your safety.</p>
                        </div>
                        <img src={shareroute}></img>
                    </div>


                </div>

                <div className="callToAction_section">

                </div>
            </div>









            <div className='business_section'>
                <div className="sus_section">
                    <h1>Boost your sustainable business with our platform</h1>
                    <p>We want to support sustainable businesses by increasing exposure of their products and services to our users.
                    </p>

                    <div className='sus_sub'>
                        <div className='sus_sub1'>
                            <img src={environment}></img>
                            <p>Environmental: Products and Services that are made through sustainable means or promotes sustainability</p>
                        </div>
                        <div className='sus_sub1'>
                            <img src={social}></img>
                            <p>Social: Products and Services that have cultural significance.</p>
                        </div>
                        <div className='sus_sub1'>
                            <img src={ethics}></img>
                            <p>Economic: Ethically sourced products and services that prioritize fair labor practices.</p>
                        </div>
                    </div>

                </div>

                <div className="comment_section">

                </div>

                <div className="procedure_section">

                </div>

                <div className="callToAction_section">

                </div>
            </div>
            

            <div className="footer_section">

            </div>
        </div>
     );
}
 
export default Landing;