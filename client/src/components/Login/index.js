import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'
import { TfiEye } from 'react-icons/tfi'
import { PiEyeClosed } from 'react-icons/pi'
import { IoIosLock } from 'react-icons/io'
import { TbMail } from 'react-icons/tb'
import { TbTrainFilled } from "react-icons/tb";
import './index.css'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const history = useHistory()

  const token = Cookie.get('jwt_token')
  if (token !== undefined) {
    history.replace('/home')
  }

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onSubmit = async event => {
    event.preventDefault()
    setError('')

    const { email, password } = form

    if (!email || !password) {
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
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()

      if (response.status === 404) {
        setError('Account not found! Redirecting to register...')
        setTimeout(() => history.replace('/register'), 2000)
        return
      }
      if (response.status === 400) {
        setError('Wrong password!')
        return
      }
      if (response.ok) {
        Cookie.set('jwt_token', data.token, { expires: 7 })
        localStorage.setItem('user', JSON.stringify(data.user))
        history.replace('/home')
      }
    } catch (err) {
      setError('Something went wrong!')
    } finally {
      setLoading(false)
      setForm({ email: '', password: '' })
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="train-animation"><TbTrainFilled /></div>
        <h1>Welcome Back!</h1>
        <p>Book your journey across India with ease</p>
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <div className="stations">
          <div className="station">Hyderabad</div>
          <div className="arrow">to</div>
          <div className="station">Visakhapatnam</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Login</h2>
            <p>Enter your credentials to continue</p>
          </div>

          {error && <div className="error-box">{error}</div>}

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

          <button
            className="login-btn"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Login'}
          </button>

          <p className="register-link">
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login