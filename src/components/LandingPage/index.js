import HeaderPage from '../HeaderPage'
import { Link, useNavigate } from 'react-router-dom'

import "./index.css"
const LandingPage = () => {
  return (  
    <div>
        <HeaderPage/>
        <div className='landing_page_main_container'>
            <div className='landing_page_inside_container'>
                <h1 className='welcome_title'>Welcome to Anything.ai</h1>
                <h1 className='sub_title'>Autonomous AI agents for banks,governments & enterprises</h1>
                <p className='description'>Make critical decisions faster with full transparency. Auditable AI agents that execute workflows, not just predictions — built for regulated industries.</p>
            </div>
        </div>
        <Link to="/task-list">
            <button className="task_list_button" >Get Task List</button>
        </Link>
        </div>
  )
}

export default LandingPage  