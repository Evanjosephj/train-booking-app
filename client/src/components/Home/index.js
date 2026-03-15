import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { IoSearchSharp } from 'react-icons/io5'
import { FaCircleArrowDown, FaCircleArrowUp } from 'react-icons/fa6'
import { MdOutlineDateRange } from 'react-icons/md'
import { BsTrainFreightFrontFill } from 'react-icons/bs'
import { MdOutlineRecentActors } from "react-icons/md";
import { BsTrainFreightFront } from "react-icons/bs";
import Header from '../Headers'
import AllTrains from '../AllTrains'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: [],
    errorMsg: null
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [activeTab, setActiveTab] = useState('recent') // ← default recent
  const [search, setSearch] = useState({
    source: '',
    destination: '',
    date: ''
  })
  const history = useHistory()

  // eslint-disable-next-line
  useEffect(() => {
    getTrains()
    getRecentBookings()
  }, [])

  const getTrains = async () => {
    setApiResponse({ status: apiStatusConstants.inProgress, data: [], errorMsg: null })
    try {
      const response = await fetch('http://localhost:5000/trains')
      const data = await response.json()
      if (response.ok) {
        setApiResponse({ status: apiStatusConstants.success, data, errorMsg: null })
      }
    } catch (error) {
      setApiResponse({ status: apiStatusConstants.failure, data: [], errorMsg: 'Something went wrong!' })
    }
  }

  const getRecentBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return
      const response = await fetch(`http://localhost:5000/booking/user/${user.id}`)
      const data = await response.json()
      if (response.ok) {
        setRecentBookings(data)
        // bookings లేకపోతే available trains tab show చేయి
        if (data.length === 0) setActiveTab('available')
      }
    } catch (error) {
      console.log('Error fetching bookings:', error)
    }
  }

  const onSearch = () => {
    if (!search.source && !search.destination) return
    history.push(
      `/search?source=${search.source}&destination=${search.destination}&date=${search.date}`
    )
  }

  // 1+ booking ఉంటే tabs show చేయి
  const showTabs = recentBookings.length >= 1

  const renderLoadingView = () => (
    <div className="loading-div">
      <div className="train-loader"></div>
      <p>Loading trains...</p>
    </div>
  )

  const renderSuccessView = () => (
    <AllTrains trainsList={apiResponse.data} />
  )

  const renderFailureView = () => (
    <div className="failure-div">
      <h2>{apiResponse.errorMsg}</h2>
      <button onClick={getTrains} className="retry-btn">Retry</button>
    </div>
  )

  const renderView = () => {
    switch (apiResponse.status) {
      case apiStatusConstants.inProgress: return renderLoadingView()
      case apiStatusConstants.success: return renderSuccessView()
      case apiStatusConstants.failure: return renderFailureView()
      default: return null
    }
  }

  return (
    <div className="home-wrapper">
      <Header />

      <div className="hero-section">
        <div className="hero-title">
          <BsTrainFreightFrontFill className="hero-train-icon" />
          <div className="hero-text">
            <h1>Train Ticket Booking</h1>
            <p>IRCTC Authorised Partner</p>
          </div>
        </div>

        <div className="search-box">
          <div className="search-input">
            <FaCircleArrowDown className="search-field-icon from-icon" />
            <input
              type="text"
              placeholder="From"
              value={search.source}
              onChange={(e) => setSearch({ ...search, source: e.target.value })}
            />
          </div>
          <div className="divider-line"></div>
          <div className="search-input">
            <FaCircleArrowUp className="search-field-icon to-icon" />
            <input
              type="text"
              placeholder="To"
              value={search.destination}
              onChange={(e) => setSearch({ ...search, destination: e.target.value })}
            />
          </div>
          <div className="divider-line"></div>
          <div className="search-input">
            <MdOutlineDateRange className="search-field-icon date-icon" />
            <input
              type="date"
              value={search.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
            />
          </div>
          <button onClick={onSearch} className="search-btn">
            <IoSearchSharp className="search-btn-icon" />
            Search Trains
          </button>
        </div>
      </div>

      <div className="trains-section">

        {/* Tabs */}
        {showTabs && (
          <div className="tabs-container">
            <button
              className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
              onClick={() => setActiveTab('recent')}
            >
              <MdOutlineRecentActors /> Recent Bookings
            </button>
            <button
              className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              <BsTrainFreightFront /> Available Trains
            </button>
          </div>
        )}

        {/* Available Trains */}
        {(!showTabs || activeTab === 'available') && (
          <>
            {!showTabs && <h2>Available Trains</h2>}
            <div className="trains-scroll-container">
              {renderView()}
            </div>
          </>
        )}

        {/* Recent Bookings */}
        {showTabs && activeTab === 'recent' && (
          <div className="recent-bookings">
            <div className="recent-grid">
              {recentBookings.map((booking, i) => (
                <div
                  key={i}
                  className="recent-card"
                  onClick={() => history.push(
                    `/search?source=${encodeURIComponent(booking.source)}&destination=${encodeURIComponent(booking.destination)}`
                  )}
                >
                  <div className="recent-card-top">
                    <p className="recent-train">{booking.trainName}</p>
                    <span className="recent-status confirmed">✅ Confirmed</span>
                  </div>

                  <div className="recent-route">
                    <p className="recent-city">{booking.source}</p>
                    <span className="recent-arrow">→</span>
                    <p className="recent-city">{booking.destination}</p>
                  </div>

                  <div className="recent-card-bottom">
                    <span className="recent-class">{booking.classType}</span>
                    <p className="recent-fare">₹ {booking.totalFare}</p>
                  </div>

                  <div className="recent-footer">
                    <p className="recent-pnr">PNR: {booking.pnrNumber}</p>
                    <p className="recent-seat">Seat: {booking.seatNumber}</p>
                  </div>

                  <p className="recent-hint">🔁 Click to book again</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default Home