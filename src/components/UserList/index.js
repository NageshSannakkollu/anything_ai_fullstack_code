import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const UserList = (props) => {
    const {userDetails} = props
    const {id,email,password,role} = userDetails
  
    return (
      <li key={id} className='task_list_items_container'>
          <p className='id'>{id}</p>
          <p className='email'>{email}</p>
          <p className='password'>{password}</p>
          <p className='created_by'>{role}</p>
          <div className='action buttons'>
              <button className='edit_button'>EDIT</button>
              <button className='delete_button'>DELETE</button>
          </div>  
          <div className='action icons'>
              <button className='edit_icon'><CiEdit className='edit_icon_style'/></button>
              <button className='delete_icon'><MdOutlineDelete className='edit_icon_style'/></button>
          </div>
      </li>
    )
}

export default UserList