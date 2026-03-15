import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Header from '../Headers'
import Footer from '../Footer'
import { IoSearchSharp } from 'react-icons/io5'
import { FaCircleArrowDown, FaCircleArrowUp } from 'react-icons/fa6'
import { MdOutlineDateRange } from 'react-icons/md'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE'
}

const SearchResults = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: [],
    errorMsg: null
  })
  const [search, setSearch] = useState({
    source: '',
    destination: '',
    date: ''
  })

  const location = useLocation()
  const history = useHistory()

  // eslint-disable-next-line
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSearch({
      source: params.get('source') || '',
      destination: params.get('destination') || '',
      date: params.get('date') || ''
    })
    searchTrains()
  }, [location.search])

  const searchTrains = async () => {
    setApiResponse({ status: apiStatusConstants.inProgress, data: [], errorMsg: null })
    const params = new URLSearchParams(location.search)
    const source = params.get('source') || ''
    const destination = params.get('destination') || ''
    const date = params.get('date') || ''

    try {
      const queryParams = new URLSearchParams()
      if (source) queryParams.append('source', source)
      if (destination) queryParams.append('destination', destination)
      if (date) queryParams.append('date', date)

      const response = await fetch(`http://localhost:5000/trains/search?${queryParams}`)
      const data = await response.json()

      if (response.status === 404) {
        setApiResponse({ status: apiStatusConstants.success, data: [], errorMsg: null })
      } else {
        setApiResponse({ status: apiStatusConstants.success, data, errorMsg: null })
      }
    } catch (error) {
      setApiResponse({ status: apiStatusConstants.failure, data: [], errorMsg: 'Something went wrong!' })
    }
  }

  const onSearch = () => {
    if (!search.source && !search.destination) return
    history.push(`/search?source=${search.source}&destination=${search.destination}&date=${search.date}`)
  }

const onBookNow = (train) => {
  const trainId = train.id || train._id
  history.push(
    `/booking?trainId=${trainId}&trainName=${encodeURIComponent(train.trainName)}&source=${encodeURIComponent(train.source)}&destination=${encodeURIComponent(train.destination)}&departure=${train.departureTime}&arrival=${train.arrivalTime}&duration=${train.duration}&classes=${encodeURIComponent(JSON.stringify(train.class))}`
  )
}
  const params = new URLSearchParams(location.search)
  const source = params.get('source') || ''
  const destination = params.get('destination') || ''
  const date = params.get('date') || ''

  const renderTrains = () => {
    const { data } = apiResponse
    if (data.length === 0) {
      return (
        <div className="no-trains">
          <div className="no-trains-icon">🚂</div>
          <h2>No Trains Found</h2>
          <p>Try different source, destination or date</p>
          <button className="back-btn" onClick={() => history.push('/home')}>
            Back to Home
          </button>
        </div>
      )
    }

    return (
      <div className="trains-list">
        {data.map(train => (
          <div key={train.trainNumber} className="train-card">

            {/* Left */}
            <div className="card-left">
              <div className="train-name-row">
                <h3>{train.trainName}</h3>
                <span className={`type-badge ${train.type}`}>{train.type}</span>
              </div>
              <p className="train-number">#{train.trainNumber}</p>

              <div className="route-row">
                <div className="route-point">
                  <p className="time">{train.departureTime}</p>
                  <p className="city">{train.source}</p>
                </div>
                <div className="route-middle">
                  <p className="duration">{train.duration}</p>
                  <div className="route-line">
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="dot"></div>
                  </div>
                </div>
                <div className="route-point">
                  <p className="time">{train.arrivalTime}</p>
                  <p className="city">{train.destination}</p>
                </div>
              </div>

              <div className="days-row">
                {train.runningDays?.map((day, i) => (
                  <span key={i} className="day">{day}</span>
                ))}
                <span className={`status ${train.status}`}>{train.status}</span>
              </div>
            </div>

            {/* Right — Classes + Book */}
            <div className="card-right">
              <p className="class-title">Available Classes</p>
              <div className="classes-list">
                {train.class?.map((c, i) => (
                  <div key={i} className="class-item">
                    <p className="class-name">{c.classType}</p>
                    <p className="class-seats">{c.availableSeats} seats</p>
                    <p className="class-fare">Rs. {c.farePerKm * 100}/km</p>
                  </div>
                ))}
              </div>
              <button
                className="book-btn"
                onClick={() => onBookNow(train)}
              >
                Book Now
              </button>
            </div>

          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="search-wrapper">
      <Header />

      {/* Search Bar */}
      <div className="search-bar-section">
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
            <IoSearchSharp />
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="results-section">
        <div className="results-header">
          <button className="back-btn" onClick={() => history.push('/home')}>
            Back to Home
          </button>
          {apiResponse.status === apiStatusConstants.success && apiResponse.data.length > 0 && (
            <h2>
              {apiResponse.data.length} Trains Found
              {source && destination && (
                <span className="route-info"> {source} to {destination}</span>
              )}
              {date && <span className="date-info"> on {date}</span>}
            </h2>
          )}
        </div>

        {apiResponse.status === apiStatusConstants.inProgress && (
          <div className="loading-div">
            <div className="train-loader"></div>
            <p>Searching trains...</p>
          </div>
        )}

        {apiResponse.status === apiStatusConstants.success && renderTrains()}

        {apiResponse.status === apiStatusConstants.failure && (
          <div className="no-trains">
            <h2>{apiResponse.errorMsg}</h2>
            <button className="back-btn" onClick={searchTrains}>Retry</button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SearchResults