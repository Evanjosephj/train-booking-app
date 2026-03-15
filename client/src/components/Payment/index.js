import { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import Header from '../Headers'
import './index.css'

const Payment = () => {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)

  const trainName = decodeURIComponent(params.get('trainName') || '')
  const source = decodeURIComponent(params.get('source') || '')
  const destination = decodeURIComponent(params.get('destination') || '')
  const classType = params.get('classType')
  const passengers = params.get('passengers')
  const totalFare = params.get('totalFare')
  const departure = params.get('departure')
  const arrival = params.get('arrival')
  const trainId = params.get('trainId')  
  const [step, setStep] = useState(1)
  const [selectedApp, setSelectedApp] = useState(null)
  const [selectedBank, setSelectedBank] = useState(null)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  const pnrNumber = 'PNR' + Math.floor(Math.random() * 9000000 + 1000000)
  const seatNumber = classType + '-' + Math.floor(Math.random() * 90 + 10)
  const bookingId = 'BK' + Date.now().toString().slice(-8)

  const upiApps = [
    {
      id: 'phonepe',
      name: 'PhonePe',
      logo: 'https://i.pinimg.com/736x/36/a7/0a/36a70adac7365614aa77202faa04d227.jpg',
      upiLink: `phonepe://pay?pa=7569937140@ybl&pn=TrainBooking&am=${totalFare}&cu=INR`
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      logo: 'https://i.pinimg.com/736x/67/28/d8/6728d8f618ff531833c69bd830569376.jpg',
      upiLink: `tez://upi/pay?pa=7569937140@ybl&pn=TrainBooking&am=${totalFare}&cu=INR`
    },
    {
      id: 'paytm',
      name: 'Paytm',
      logo: 'https://i.pinimg.com/1200x/44/3e/e6/443ee69c25583b436877b0d7924a08c2.jpg',
      upiLink: `paytmmp://pay?pa=7569937140@ybl&pn=TrainBooking&am=${totalFare}&cu=INR`
    },
  ]

  const banks = [
    { id: 'sbi', name: 'State Bank of India', short: 'SBI', color: '#2d6a4f' },
    { id: 'hdfc', name: 'HDFC Bank', short: 'HDFC', color: '#004c8f' },
    { id: 'icici', name: 'ICICI Bank', short: 'ICICI', color: '#f07b22' },
    { id: 'axis', name: 'Axis Bank', short: 'Axis', color: '#97144d' },
    { id: 'kotak', name: 'Kotak Bank', short: 'Kotak', color: '#e3122d' },
    { id: 'pnb', name: 'Punjab National Bank', short: 'PNB', color: '#c8102e' },
  ]

  const onSelectApp = (app) => {
    setSelectedApp(app)
    window.location.href = app.upiLink
    setTimeout(() => {
      setStep(2)
    }, 2000)
  }

  const onSelectBank = (bank) => {
    setSelectedBank(bank)
    setStep(3)
  }

  const onPinChange = (val) => {
    if (val.length <= 6 && /^\d*$/.test(val)) {
      setPin(val)
      setPinError('')
    }
  }

 

const onPay = () => {
    if (pin.length < 4) {
      setPinError('Please enter valid PIN (4-6 digits)')
      return
    }
    setStep(4)
    setTimeout(() => {
      history.push(
        `/confirmation?trainName=${encodeURIComponent(trainName)}&source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}&classType=${classType}&passengers=${passengers}&totalFare=${totalFare}&departure=${departure}&arrival=${arrival}&pnr=${pnrNumber}&seat=${seatNumber}&bookingId=${bookingId}&trainId=${trainId}`
      )
    }, 3000)
  }

  return (
    <div className="payment-wrapper">
      <Header />

      <div className="payment-container">
        <button
          className="back-btn"
          onClick={() => step === 1 ? history.goBack() : setStep(step - 1)}
        >
          ← Back
        </button>

        {/* Amount Banner */}
        <div className="amount-banner">
          <p className="amount-label">Total Amount to Pay</p>
          <p className="amount-value">₹ {totalFare}</p>
          <p className="amount-route">{source} → {destination} · {classType} · {passengers} passenger(s)</p>
        </div>

        {/* Step Indicator */}
        <div className="steps-indicator">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        <div className="step-labels">
          <p>Select App</p>
          <p>Select Bank</p>
          <p>Enter PIN</p>
        </div>

        {/* Step 1 — Select UPI App */}
        {step === 1 && (
          <div className="step-card">
            <h3>Pay Using UPI App</h3>
            <p className="step-subtitle">Select your preferred UPI app</p>
            <div className="upi-apps-grid">
              {upiApps.map(app => (
                <div
                  key={app.id}
                  className="upi-app-card"
                  onClick={() => onSelectApp(app)}
                >
                  <img
                    src={app.logo}
                    alt={app.name}
                    className="app-logo"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <p className="app-name">{app.name}</p>
                  <div className="app-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Select Bank */}
        {step === 2 && (
          <div className="step-card">
            <div className="selected-app-badge">
              <img
                src={selectedApp?.logo}
                alt={selectedApp?.name}
                className="badge-logo"
              />
              {selectedApp?.name} selected
            </div>
            <h3>Select Your Bank</h3>
            <p className="step-subtitle">Choose the bank account to pay from</p>
            <div className="banks-grid">
              {banks.map(bank => (
                <div
                  key={bank.id}
                  className="bank-card"
                  onClick={() => onSelectBank(bank)}
                >
                  <div
                    className="bank-logo"
                    style={{ background: bank.color }}
                  >
                    {bank.short}
                  </div>
                  <p className="bank-name">{bank.name}</p>
                  <div className="bank-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Enter PIN */}
        {step === 3 && (
          <div className="step-card pin-card">
            <div className="pin-app-info">
              <img
                src={selectedApp?.logo}
                alt={selectedApp?.name}
                className="pin-app-logo"
              />
              <span>{selectedApp?.name}</span>
              <span className="pin-separator">·</span>
              <span
                className="pin-bank-badge"
                style={{ background: selectedBank?.color }}
              >
                {selectedBank?.short}
              </span>
            </div>

            <h3>Enter UPI PIN</h3>
            <p className="step-subtitle">Enter your {selectedBank?.name} UPI PIN</p>

            <div className="pin-input-wrapper">
              <input
                type="password"
                className="pin-input"
                placeholder="● ● ● ● ● ●"
                value={pin}
                onChange={(e) => onPinChange(e.target.value)}
                maxLength={6}
                autoFocus
              />
              <div className="pin-dots">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`pin-dot-circle ${i < pin.length ? 'filled' : ''}`}
                  ></div>
                ))}
              </div>
            </div>

            {pinError && <p className="pin-error">{pinError}</p>}

            <div className="pin-info">
              <p>🔒 Your PIN is encrypted and secure</p>
            </div>

            <button className="pay-btn" onClick={onPay}>
              Pay ₹ {totalFare}
            </button>
          </div>
        )}

        {/* Step 4 — Processing */}
        {step === 4 && (
          <div className="step-card processing-card">
            <div className="processing-animation">
              <div className="processing-circle"></div>
              <img
                src={selectedApp?.logo}
                alt={selectedApp?.name}
                className="processing-logo"
              />
            </div>
            <h3>Processing Payment...</h3>
            <p className="step-subtitle">Please wait, do not press back</p>
            <p className="processing-amount">₹ {totalFare}</p>
            <div className="processing-bar">
              <div className="processing-fill"></div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Payment