import { Link, useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'
import { BsTrainFreightFrontFill } from 'react-icons/bs'
import { IoHelpCircleSharp } from 'react-icons/io5'
import { MdPersonOutline } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import './index.css'

const Header = () => {
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    Cookie.remove('jwt_token')
    localStorage.removeItem('user')
    history.replace('/')
  }

  return (
    <nav className="navbar">

      {/* Left — Logo */}
      <div className="nav-logo">
        <BsTrainFreightFrontFill className="train-icon" />
        <p>TrainBooking</p>
      </div>

      {/* Right — Links */}
      <ul className="nav-links">
        <li>
          
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
          <Link to="/home" className="help-link">
            <AiOutlineQuestionCircle className="help-icon" />
            Help
          </Link>
        </li>
        <li className="nav-user">
          <MdPersonOutline className="person-icon" />
          <span>{user?.name}</span>
        </li>
        <li>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>

    </nav>
  )
}

export default Header