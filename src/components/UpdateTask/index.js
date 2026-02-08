import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomProfilePage from '../CustomProfilePage';
import { toast } from 'react-toastify';
import axios from 'axios';

import "./index.css"
const UpdateTask  = () => {
    const [taskData,setTaskData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userProfile = CustomProfilePage();
    const navigate = useNavigate();
    const {id} = useParams()
    console.log("updatedId:",id)

    useEffect(() => {
        const getSpecificTask = async() => {
            try {
                const response = await axios.get(`https://anything-ai-backend-code.onrender.com/api/v1/tasks/${id}`)
                const data = await response.data;
                console.log("Data:",data)
                setTaskData(data)
            } catch (error) {
                console.log(error.message)
            }
        }
        getSpecificTask()
    },[id])

        const updateHandler = async(event) => {
        event.preventDefault()
        const taskDetailsInfo = taskData
        console.log("taskDetailsInfo:",taskDetailsInfo)
        const response = await axios.patch(`https://anything-ai-backend-code.onrender.com/api/v1/tasks/update/${id}`,taskDetailsInfo)
            const data = await response.data;
            if(data.success){
                toast.success(data.message)
                navigate("/task-list")
            }else{
                toast.error(data.message)
            }
    }

    return (
        <div className="add-task-form">
            <h2>Update Task</h2>
            {error && (
                <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>
                    {error}
                </div>
            )}
            
            <form onSubmit={updateHandler} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        value={taskData.title}
                        onChange={(e) => setTaskData({...taskData,title:e.target.value})}
                        required
                        maxLength={100}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={taskData.description}
                        onChange={(e) => setTaskData({...taskData,description:e.target.value})}
                        rows={3}
                        maxLength={500}
                        disabled={loading}
                    />
                </div>

                {/* Auto-filled fields (read-only) */}
                <div className="form-group">
                    <label>Created By:</label>
                    <input 
                        type="text" 
                        value={userProfile.id} 
                        readOnly 
                        style={{backgroundColor: '#f5f5f5'}}
                    />
                </div>
                <button 
                    type="submit" 
                    className="submit-task-btn"
                >
                    {loading ? 'Updating...' : 'Update Task'}
                </button>
            </form>
        </div>
    );
};

export default UpdateTask;
