import '../styles/landing.css';
import logo from '../images/routouristlogo.png';
import travel from '../images/travel.svg';
import firebase_logo from '../images/firebase_logo.png';
import map_logo from '../images/maps_logo.png';
import cloud_logo from '../images/cloud_logo.png';
import {BsCheckCircleFill} from 'react-icons/bs';
import { useState,useEffect } from 'react';

const Landing = () => {
    const [isBusiness,setIsBusiness] = useState(false);

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
                <button className='consumer'>Consumer</button>
                <button className='business'>Business</button>
            </div>

            <div className="features_section">

            </div>

            <div className="comment_section">

            </div>

            <div className="procedure_section">

            </div>

            <div className="callToAction_section">

            </div>

            <div className="footer_section">

            </div>
        </div>
     );
}
 
export default Landing;