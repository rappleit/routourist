import { useEffect, useState } from 'react';
import '../styles/libraryroute.css';
import { BiSearch } from 'react-icons/bi'


const RouteLibrary = () => { 
    const [isPreset,setIsPreset] = useState(false)
    const [isCommunity,setIsCommunity] = useState(false)

    const [headername,setHeaderName] = useState('Route Library')
    const [subfirst,setSubFirst] = useState('Best of Preset')
    const [subsecond, setSubSecond] = useState('Best of Community')
    const [subthird,setSubThird] = useState('Discover')

    const presetButton = document.getElementsByClassName("preset");
    const communityButton = document.getElementsByClassName("community");
    const genreselector = document.getElementsByClassName("genre_selection");

    const setLibrary = () => {
        setIsCommunity(false)
        setIsPreset(false)
        setHeaderName('Route Library')
        setSubFirst('Best of Preset')
        setSubSecond('Best of Community')
        setSubThird('Discover')
        genreselector[0].style.display='none'

    }
    useEffect(() =>{
        if (isPreset || isCommunity){
            setSubFirst('Nature')
            setSubSecond('Romance')
            setSubThird('Tourist')
            genreselector[0].style.display = 'block'
        }
        if (isPreset){
            setIsCommunity(false)
            setHeaderName('Preset')

        }

        if (isCommunity){
            setIsPreset(false)
            setHeaderName('Community')
        }

    });
    return(
        <div className='libraryroute'>
            <div className='header_section'>
                <div className='left_header'>
                    <h1>{headername}</h1>
                    <button className='library' onClick={()=> setLibrary()}>Library</button>
                    <button className='preset' onClick={() => setIsPreset(!isPreset)}>Preset</button>
                    <button className='community' onClick={() => setIsCommunity(!isCommunity)}>Community</button>
                    
                </div>

                <div className='right_header'>
                    <div className='iconsearch'>
                        <BiSearch/>
                    </div>
                    
                </div>
                
            </div>
            <div className='body_section'>
                <div>
                    <form >
                        <select className='genre_selection'>
                            <option value="" disabled selected hidden>Genre</option>
                            <option value='Nature'> Nature</option>
                            <option value='Romance'>Romance</option>
                            <option value='Tourist'>Tourist</option>
                        </select>
                    </form>
                </div>
                <div className='recommended_section'>
                    <h2>Recommended</h2>
                    <div className='cards_section'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    
                </div>
                <div className='first_section'>
                    <h2>{subfirst}</h2>
                    <div className='cards_section'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className='second_section'>
                    <h2>{subsecond}</h2>
                    <div className='cards_section'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className='second_section'>
                    <h2>{subthird}</h2>
                    <div className='cards_section'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            
        </div>
    )



}


export default RouteLibrary;