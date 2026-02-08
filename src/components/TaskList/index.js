import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

import "./index.css"
import { Link } from 'react-router-dom';
const TaskList = (props) => {
    const {taskDetails,deleteTask} = props
    const {id,title,description,createdBy,createdAt} = taskDetails

    const clickOnDelete = () => {
        //console.log("Delete Task with ID:", id);
        deleteTask(id)
    }

  return (
    <li key={id} className='task_list_items_container'>
        <p className='id'>{id}</p>
        <h4 className='title'>{title}</h4>
        <p className='description'>{description}</p>
        <p className='created_by'>{createdBy}</p>
        <p className='created_at'>{createdAt}</p>
        <div className='action buttons'>
            <Link to={`/update_task/${id}`}>
                <button className='edit_button'>EDIT</button>
            </Link>
            <button className='delete_button' onClick={clickOnDelete}>DELETE</button>
        </div>  
        <div className='action icons'>
            <Link to={`/update_task/${id}`}>
                <button className='edit_icon'><CiEdit className='edit_icon_style'/></button>
            </Link>
            <button className='delete_icon' onClick={clickOnDelete}><MdOutlineDelete className='edit_icon_style'/></button>
        </div>
    </li>
  )
}   

export default TaskList