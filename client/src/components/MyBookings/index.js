import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Headers'
import Footer from '../Footer'
import './index.css'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  // eslint-disable-next-line
  useEffect(() => {
    getBookings()
  }, [])

  const getBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) return
      const response = await fetch(`http://localhost:5000/booking/user/${user.id}`)
      const data = await response.json()
      if (response.ok) setBookings(data)
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="mybookings-wrapper">
      <Header />

      <div className="mybookings-container">
        <div className="mybookings-header">
          <button className="back-btn" onClick={() => history.push('/home')}>
            ← Back
          </button>
          <h2>My Bookings</h2>
          <p className="bookings-count">{bookings.length} ticket(s) booked</p>
        </div>

        {loading && (
          <div className="loading-div">
            <div className="train-loader"></div>
            <p>Loading bookings...</p>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="no-bookings">
            <p className="no-bookings-icon">🎫</p>
            <h3>No bookings yet!</h3>
            <p>Book your first train ticket now</p>
            <button
              className="book-now-btn"
              onClick={() => history.push('/home')}
            >
              Browse Trains
            </button>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="bookings-list">
            {bookings.map((booking, i) => (
              <div key={i} className="booking-card">

                {/* Card Header */}
                <div className="booking-card-header">
                  <div className="booking-train-info">
                    <h3>{booking.trainName}</h3>
                    <p className="booking-id">Booking ID: {booking.bookingId}</p>
                  </div>
                  <span className={`booking-status ${booking.status}`}>
                    {booking.status === 'confirmed' ? '✅ Confirmed' : booking.status}
                  </span>
                </div>

                {/* Route */}
                <div className="booking-route">
                  <div className="b-point">
                    <p className="b-time">{booking.departure}</p>
                    <p className="b-city">{booking.source}</p>
                  </div>
                  <div className="b-middle">
                    <div className="b-line"></div>
                    <p className="b-class">{booking.classType}</p>
                  </div>
                  <div className="b-point">
                    <p className="b-time">{booking.arrival}</p>
                    <p className="b-city">{booking.destination}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="booking-details-grid">
                  <div className="b-detail">
                    <p className="b-label">PNR Number</p>
                    <p className="b-value pnr">{booking.pnrNumber}</p>
                  </div>
                  <div className="b-detail">
                    <p className="b-label">Seat Number</p>
                    <p className="b-value seat">{booking.seatNumber}</p>
                  </div>
                  <div className="b-detail">
                    <p className="b-label">Passengers</p>
                    <p className="b-value">{booking.passengers}</p>
                  </div>
                  <div className="b-detail">
                    <p className="b-label">Amount Paid</p>
                    <p className="b-value amount">₹ {booking.totalFare}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="booking-card-footer">
                  <p className="booking-date">
                    🗓️ Booked on: {formatDate(booking.createdAt)}
                  </p>
                  <button
                    className="rebook-btn"
                    onClick={() => history.push(
                      `/search?source=${encodeURIComponent(booking.source)}&destination=${encodeURIComponent(booking.destination)}`
                    )}
                  >
                    Book Again →
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyBookings