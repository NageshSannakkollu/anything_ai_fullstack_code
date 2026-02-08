import  { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const CustomProfilePage = () => {
    const navigate = useNavigate()
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken === null){
        navigate("/signin")
    }
    const [userProfile,setUserProfile] = useState([])
    useEffect(() => {
            const getProfileDetails = async() => {
            try {
                const response = await fetch("https://anything-ai-backend-code.onrender.com/api/v1/auth/profile",{
                    method:'GET',
                    headers:{
                        "Authorization":`Bearer ${jwtToken}`,
                        'Content-Type':"application/json"
                    }
                });
                const data = await response.json();
                // console.log("Prof:",data.user)
                setUserProfile(data.user)

            } catch (error) {
                console.error('Error Fetching profile Details')
            }
        }
        getProfileDetails()
    },[jwtToken])

    // console.log("UserProfileUnit:",userProfile)

  return userProfile
}

export default CustomProfilePage