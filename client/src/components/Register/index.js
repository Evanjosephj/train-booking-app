import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { TfiEye } from 'react-icons/tfi'
import { PiEyeClosed } from 'react-icons/pi'
import { IoIosLock } from 'react-icons/io'
import { TbMail } from 'react-icons/tb'
import { GoPersonFill } from 'react-icons/go'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { TbTrainFilled } from "react-icons/tb";
import './index.css'

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phoneNumber: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = async event => {
    event.preventDefault()
    setError('')

    const { name, email, password, phoneNumber } = form

    if (!name || !email || !password || !phoneNumber) {
      setError('Please fill all fields!')
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Enter valid email! (name@gmail.com)')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()

      if (response.status === 400) {
        setError('Email already exists! Please login.')
        return
      }
      if (response.ok) {
        alert('Registered successfully! Please login.')
        history.replace('/')
      }
    } catch (err) {
      setError('Something went wrong!')
    } finally {
      setLoading(false)
      setForm({ name: '', email: '', password: '', phoneNumber: '' })
    }
  }

  return (
    <div className="register-wrapper">
      <div className="register-left">
        <div className="train-animation"><TbTrainFilled /></div>
        <h1>Join Us Today!</h1>
        <p>Create your account and start booking trains across India</p>
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <div className="features">
          <div className="feature">Easy Booking</div>
          <div className="feature">Track Your Train</div>
          <div className="feature">Best Prices</div>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <div className="register-header">
            <h2>Register</h2>
            <p>Fill in your details to get started</p>
          </div>

          {error && <div className="error-box">{error}</div>}

          {/* Name */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <GoPersonFill className="input-icon" />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <TbMail className="input-icon" />
              <input
                name="email"
                type="text"
                placeholder="name@gmail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <IoIosLock className="input-icon" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <TfiEye /> : <PiEyeClosed />}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <IoPhonePortraitOutline className="input-icon" />
              <input
                name="phoneNumber"
                type="number"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="register-btn"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Register'}
          </button>

          <p className="login-link">
            Already have an account?{' '}
            <Link to="/">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register