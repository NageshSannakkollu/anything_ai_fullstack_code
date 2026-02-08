import { Link, useNavigate } from "react-router-dom"
import CustomProfilePage from "../CustomProfilePage"
import "./index.css"

const HeaderPage =() => {
    const navigate = useNavigate()
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken !== null){
        const userProfile = CustomProfilePage()
        var userProfiles = userProfile
    }
    const signOut = () => {
        localStorage.removeItem("jwtToken")
        navigate("/signin")
    }
    return (
        <div className="header_main_container">
        <h3 className="main_title">ANYTHING.<span className="ai_title">ai</span></h3>
            <div className="header_links_container">
            {jwtToken !== null ? 
                <>
                    <button className="get_start_register_button signin_button" onClick={signOut}>Sign Out</button>
                    <div className='user_profile_username_container'>
                        <img src='https://res.cloudinary.com/dksgsqhdk/image/upload/v1712485559/profile_eakmb7.png' alt='profile' className='profile_image'/>
                        <strong className='role'>{userProfiles.role}</strong>
                    </div>
                </>
                :
                <>
                    <Link to="/signin" className="get_start_register_button signin_button">Sign In</Link>
                    <Link to="/signup" className="get_start_register_button">Get Start</Link>
                </>
            }
            </div>
        </div>
        
    )
}

export default HeaderPage