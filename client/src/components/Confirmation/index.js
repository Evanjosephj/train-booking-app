import { useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Header from '../Headers'
import './index.css'

const Confirmation = () => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  const bookingDone = useRef(false)

  const trainName = decodeURIComponent(params.get('trainName') || '')
  const source = decodeURIComponent(params.get('source') || '')
  const destination = decodeURIComponent(params.get('destination') || '')
  const classType = params.get('classType')
  const passengers = params.get('passengers')
  const totalFare = params.get('totalFare')
  const departure = params.get('departure')
  const arrival = params.get('arrival')
  const pnr = params.get('pnr')
  const seat = params.get('seat')
  const bookingId = params.get('bookingId')
  const trainId = params.get('trainId')

  // eslint-disable-next-line
  useEffect(() => {
    if (!bookingDone.current) {
      bookingDone.current = true
      saveBooking()
    }
  }, [])

  const saveBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log('user:', user)
      console.log('trainId:', trainId)
      console.log('pnr:', pnr)
      console.log('bookingId:', bookingId)

      const response = await fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          trainId,
          trainName,
          source,
          destination,
          classType,
          passengers,
          totalFare,
          departure,
          arrival,
          pnrNumber: pnr,
          seatNumber: seat,
          bookingId
        })
      })
      const data = await response.json()
      console.log('booking response:', data)
    } catch (error) {
      console.log('Booking save error:', error)
    }
  }

  return (
    <div className="confirm-wrapper">
      <Header />

      <div className="confirm-container">

        <div className="success-banner">
          <div className="success-icon">✅</div>
          <h2>Booking Confirmed!</h2>
          <p>Your ticket has been booked successfully</p>
        </div>

        <div className="ticket-card">
          <div className="ticket-top">
            <div className="ticket-ids">
              <div className="id-item">
                <p className="id-label">PNR Number</p>
                <p className="id-value pnr">{pnr}</p>
              </div>
              <div className="id-item">
                <p className="id-label">Booking ID</p>
                <p className="id-value">{bookingId}</p>
              </div>
              <div className="id-item">
                <p className="id-label">Seat Number</p>
                <p className="id-value seat">{seat}</p>
              </div>
            </div>
          </div>

          <div className="ticket-divider">
            <div className="circle left"></div>
            <div className="dashed-line"></div>
            <div className="circle right"></div>
          </div>

          <div className="ticket-body">
            <h3>{trainName}</h3>
            <div className="ticket-route">
              <div className="t-point">
                <p className="t-time">{departure}</p>
                <p className="t-city">{source}</p>
              </div>
              <div className="t-middle">
                <div className="t-line"></div>
                <p className="t-class">{classType}</p>
              </div>
              <div className="t-point">
                <p className="t-time">{arrival}</p>
                <p className="t-city">{destination}</p>
              </div>
            </div>
            <div className="ticket-details">
              <div className="detail-item">
                <p className="detail-label">Passengers</p>
                <p className="detail-value">{passengers}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Class</p>
                <p className="detail-value">{classType}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Amount Paid</p>
                <p className="detail-value green">₹ {totalFare}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <button className="home-btn" onClick={() => history.replace('/home')}>
            Back to Home
          </button>
          <button className="print-btn" onClick={() => window.print()}>
            🖨️ Print Ticket
          </button>
        </div>

      </div>
    </div>
  )
}

export default Confirmation