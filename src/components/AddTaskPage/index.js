import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomProfilePage from '../CustomProfilePage';
import { toast } from 'react-toastify';
import axios from 'axios';

import "./index.css"

const AddTaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const userProfile = CustomProfilePage();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const newTask = {
                title: title.trim(),
                description: description.trim(),
                createdBy: userProfile.id,
            }
            const response = await axios.post ("https://anything-ai-backend-code.onrender.com/api/v1/tasks", newTask);
            if(response.data.success){
                toast.success(response.data.message);
                navigate("/task-list");
            }else{
                toast.error(response.data.message);
            }
            // Reset form
            setTitle('');
            setDescription('');
            
            // Notify parent (refresh task list)
        } catch (err) {
            console.error("Create task failed:", err);
            setError(err.message || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-task-form">
            <h2>Add New Task</h2>
            {error && (
                <div className="error-message" style={{color: 'red', marginBottom: '1rem'}}>
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                        maxLength={100}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description"
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
                    {loading ? 'Creating...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTaskPage;
