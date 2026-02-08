import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPage from '../HeaderPage'; 
import TaskList from '../TaskList'; 
import CustomProfilePage from '../CustomProfilePage'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import "./index.css"
const TaskMainPage = () => {
    const [taskList, setTaskList] = useState([]);
    const [taskDeleted, setTaskDeleted] = useState(true);
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem("jwtToken");
    // console.log("JWT Token in TaskMainPage:", jwtToken);
    useEffect(() => {
        if (!jwtToken) {
            navigate("/signin");
    }   
    }, [jwtToken, navigate]);
    const userProfile = CustomProfilePage();  
    console.log("User Profile in TaskMainPage:", typeof(userProfile.id));  
    // Fetch tasks only if authenticated
    useEffect(() => {
        const fetchTasks = async () => {
            if(taskDeleted){
                setTaskDeleted(false)
            }
            try {
                const response = await fetch("https://anything-ai-backend-code.onrender.com/api/v1/tasks", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                
                const data = await response.json();
                setTaskList(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [jwtToken,taskDeleted]);

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(`https://anything-ai-backend-code.onrender.com/api/v1/tasks/${id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                setTaskDeleted(true);
            }
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    // console.log("User Profile:", userProfile);
    console.log("TaskList:", taskList);
    const filteredTaskList = userProfile.role === "admin" ? taskList : taskList.filter(task => parseInt(task.createdBy) === parseInt(userProfile.id));

    return (
        <div>
            <HeaderPage />
            <div className='add_task_user_list_container'>
                <Link to="/add_task">
                    <button type='button' className='user_list_button add_task_button'>Add Task</button>
                </Link>
                {userProfile.role === "admin" && (
                <Link to="/user_list">
                    <button className="user_list_button">
                        User List
                    </button>
                </Link>
                )}
            </div>
            
            
            {/* Table Headers */}

            <ul className='task_list_headings'>
                <li className='id'><strong>ID</strong></li>
                <li className='title'><strong>Title</strong></li>
                <li className='description'><strong>Description</strong></li>
                <li className='created_by'><strong>Created By</strong></li>
                <li className='created_at'><strong>Created At</strong></li>
                <li className='action'><strong>Action</strong></li>
                
            </ul>

            <ul className='task_list_container'>
                {filteredTaskList.length > 0 ? (
                    filteredTaskList.map(task => (
                        <TaskList key={task.id} taskDetails={task} deleteTask={deleteTask}/>
                    ))
                ) : (
                    <li>No tasks found</li>
                )}
            </ul> 
        </div>
    );
};

export default TaskMainPage;
