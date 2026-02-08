import React, { useEffect, useState } from 'react'
import CustomProfilePage from '../CustomProfilePage'
import HeaderPage from '../HeaderPage'
import UserList from '../UserList'

import "./index.css"
const UserListPage = () => {
    const [userList,setUserList] = useState([])
    useEffect(() => {
        const fetchUsers = async() => {
            const response = await fetch("https://anything-ai-backend-code.onrender.com/api/v1/auth/all-users")
            const data = await response.json()
            // console.log("Data:",data.users)
            setUserList(data.users)
        }
        fetchUsers()
    },[])
    const userProfile = CustomProfilePage()
    console.log("UserList:",userList)

  return (
    <div>
        <HeaderPage/>
        <ul className='task_list_headings'>
            <li className='id'><strong>ID</strong></li>
            <li className='email'><strong>EMAIL</strong></li>
           <li className='password'><strong>PASSWORD</strong></li>
           <li className='created_by'><strong>ROLE</strong></li>
           <li className='created_by'><strong>ACTIONS</strong></li>
        </ul>
        <ul className='task_list_container'>
            {userList.map(user =>
                <UserList key={user.id} userDetails={user}/>
            )}
        </ul>
    </div>
  )
}

export default UserListPage