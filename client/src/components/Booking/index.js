import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Header from '../Headers'
import './index.css'

const Booking = () => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)

  const trainId = params.get('trainId')
  const trainName = decodeURIComponent(params.get('trainName') || '')
  const source = decodeURIComponent(params.get('source') || '')
  const destination = decodeURIComponent(params.get('destination') || '')
  const departure = params.get('departure')
  const arrival = params.get('arrival')
  const duration = params.get('duration')
  const classes = JSON.parse(decodeURIComponent(params.get('classes') || '[]'))

  const [selectedClass, setSelectedClass] = useState(null)
  const [passengers, setPassengers] = useState(1)
  const [error, setError] = useState('')

  const farePerKm = selectedClass ? selectedClass.farePerKm : 0
  const distance = 500
  const totalFare = farePerKm * distance * passengers

  const onProceed = () => {
    if (!selectedClass) {
      setError('Please select a class!')
      return
    }
    setError('')
    history.push(
      `/payment?trainId=${trainId}&trainName=${encodeURIComponent(trainName)}&source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&classType=${selectedClass.classType}&passengers=${passengers}&totalFare=${totalFare}&departure=${departure}&arrival=${arrival}`
    )
  }

  return (
    <div className="booking-wrapper">
      <Header />

      <div className="booking-container">
        <button className="back-btn" onClick={() => history.goBack()}>
          Back
        </button>

        <h2>Select Your Class</h2>

        {/* Train Info */}
        <div className="train-info-card">
          <div className="train-info-left">
            <h3>{trainName}</h3>
            <p>#{trainId}</p>
          </div>
          <div className="train-info-route">
            <div className="route-point">
              <p className="time">{departure}</p>
              <p className="city">{source}</p>
            </div>
            <div className="route-middle">
              <p className="dur">{duration}</p>
              <div className="route-line"></div>
            </div>
            <div className="route-point">
              <p className="time">{arrival}</p>
              <p className="city">{destination}</p>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="class-selection">
          <h3>Choose Class</h3>
          <div className="classes-grid">
            {classes.map((c, i) => (
              <div
                key={i}
                className={`class-card ${selectedClass?.classType === c.classType ? 'selected' : ''}`}
                onClick={() => setSelectedClass(c)}
              >
                <p className="class-type">{c.classType}</p>
                <p className="class-seats">{c.availableSeats} seats available</p>
                <p className="class-fare">Rs. {c.farePerKm * distance} total</p>
                <p className="per-km">Rs. {c.farePerKm}/km</p>
              </div>
            ))}
          </div>
        </div>

        {/* Passengers */}
        <div className="passengers-section">
          <h3>Number of Passengers</h3>
          <div className="passengers-control">
            <button
              className="count-btn"
              onClick={() => setPassengers(p => Math.max(1, p - 1))}
            >
              -
            </button>
            <span className="count">{passengers}</span>
            <button
              className="count-btn"
              onClick={() => setPassengers(p => Math.min(6, p + 1))}
            >
              +
            </button>
          </div>
        </div>

        {/* Fare Summary */}
        {selectedClass && (
          <div className="fare-summary">
            <div className="fare-row">
              <p>Class</p>
              <p>{selectedClass.classType}</p>
            </div>
            <div className="fare-row">
              <p>Passengers</p>
              <p>{passengers}</p>
            </div>
            <div className="fare-row">
              <p>Fare per passenger</p>
              <p>Rs. {farePerKm * distance}</p>
            </div>
            <div className="fare-divider"></div>
            <div className="fare-row total">
              <p>Total Fare</p>
              <p>Rs. {totalFare}</p>
            </div>
          </div>
        )}

        {error && <p className="error-msg">{error}</p>}

        <button className="proceed-btn" onClick={onProceed}>
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}

export default Booking