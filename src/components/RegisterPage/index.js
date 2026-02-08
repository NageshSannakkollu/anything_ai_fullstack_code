import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import "./index.css"
const RegisterPage = () => {
    const [registerValues,setRegValues] = useState({email:'',password:'',role:""})
    const navigate = useNavigate()

    const registerHandler = async(event) => {
        event.preventDefault()
        // console.log("registerValues:",registerValues)
        const response = await axios.post("https://anything-ai-backend-code.onrender.com/api/v1/auth/signup",registerValues)
        console.log("RegResponse:",response);
        if(response.data.success){
            toast.success(response.data.message)
            navigate("/signin")
        }else{
            toast.error(response.data.message)
        }
    }

  return (
    <div className='login_page_main_container'>
        <form className='login_page_inside_container' onSubmit={registerHandler}>
            <div className='login_left_container'>
            <div className='login_page_titles_container'>
                <h2>Create an account</h2>
                <p className='job_finder_para'>Exploring AI agents or ready to deploy at scale? We're here to help.</p>
            </div>  
                <input type='email' placeholder='Email' onChange={e => setRegValues({...registerValues,email:e.target.value})} className='email_input' required/>
                <input type='password' placeholder='Password' onChange={e => setRegValues({...registerValues,password:e.target.value})} className='email_input' required/>
                <select className='email_input' onChange={e => setRegValues({...registerValues,role:e.target.value})} required>
                    <option value="" disabled selected>Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <div className='terms_policy_checkbox_container'>
                    <input type='checkbox' id="checkbox" />
                    <label htmlFor='checkbox'>By Creating an account, I agree to our terms of use and privacy policy</label>
                </div>
                <button type='submit' className='submit_button create_acc_btn'>SIGN UP</button>
                <p className='dont_have_acc'>Already have an account? <Link to="/signin" className='sign_up_link'>Sign In</Link> </p>
            </div>
        </form>
    </div>
  )
}

export default RegisterPage
