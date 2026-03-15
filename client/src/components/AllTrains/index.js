import { useHistory } from 'react-router-dom'
import './index.css'

const AllTrains = ({ trainsList }) => {
  const history = useHistory()

 const onBookNow = (train) => {
  const trainId = train.id || train._id
  history.push(
    `/booking?trainId=${trainId}&trainName=${encodeURIComponent(train.trainName)}&source=${encodeURIComponent(train.source)}&destination=${encodeURIComponent(train.destination)}&departure=${train.departureTime}&arrival=${train.arrivalTime}&duration=${train.duration}&classes=${encodeURIComponent(JSON.stringify(train.class))}`
  )
}

  if (trainsList.length === 0) {
    return (
      <div className="no-trains">
        <h2>No trains found!</h2>
        <p>Try different source, destination or date</p>
        <button className="back-btn" onClick={() => history.push('/home')}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="trains-grid">
        {trainsList.map(train => (
          <div key={train.trainNumber} className="train-card">

            <div className="card-top">
              <div>
                <h3>{train.trainName}</h3>
                <p>#{train.trainNumber}</p>
              </div>
              <span className={`type-badge ${train.type}`}>{train.type}</span>
            </div>

            <div className="card-route">
              <div className="route-point">
                <p className="time">{train.departureTime}</p>
                <p className="city">{train.source}</p>
              </div>
              <div className="route-middle">
                <p className="duration">{train.duration}</p>
                <div className="route-line"></div>
              </div>
              <div className="route-point">
                <p className="time">{train.arrivalTime}</p>
                <p className="city">{train.destination}</p>
              </div>
            </div>

            <div className="card-classes">
              {train.class?.map((c, i) => (
                <div key={i} className="class-tag">
                  <p>{c.classType}</p>
                  <p className="seats">{c.availableSeats} seats</p>
                </div>
              ))}
            </div>

            <div className="card-bottom">
              <div className="days">
                {train.runningDays?.map((day, i) => (
                  <span key={i} className="day">{day}</span>
                ))}
              </div>
              <span className={`status ${train.status}`}>{train.status}</span>
            </div>

            <button
              className="book-btn"
              onClick={() => onBookNow(train)}
            >
              Book Now
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTrains