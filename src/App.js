import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LandingPage from './components/LandingPage'
import HeaderPage from './components/HeaderPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import TaskMainPage from './components/TaskMainPage'
import UserListPage from './components/UserListPage'

import './App.css'
import AddTaskPage from './components/AddTaskPage'
import UpdateTask from './components/UpdateTask'


const App = () => (
  <BrowserRouter>
    <ToastContainer position='top-center' autoClose={600} hideProgressBar={true} transition={Slide}/>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/header" element={<HeaderPage />} />
      <Route exact path='/signup' element={<RegisterPage/>}/>
      <Route exact path='/signin' element={<LoginPage/>}/>
      <Route exact path='/user_list' element={<UserListPage/>}/>
      <Route exact path='/task-list' element={<TaskMainPage/>}/>
      <Route exact path='/add_task' element={<AddTaskPage/>}/>
      <Route exact path='/update_task/:id' element={<UpdateTask/>}/>
      <Route path="*" element={<h1 style={{textAlign:"center"}}>404 Not Found</h1>} />
    </Routes>
  </BrowserRouter>
)

export default App