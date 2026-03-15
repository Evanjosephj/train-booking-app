// imports:
// useState, useEffect → react నుండి
// BrowserRouter, Switch, Route → react-router-dom నుండి

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import SearchResults from './components/SearchResults'
import ProtectedRoute from './components/ProtectedRoute'
import Booking from './components/Booking'
import Payment from './components/Payment'
import Confirmation from './components/Confirmation'
import MyBookings from './components/MyBookings'


import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* Protected Routes — token లేకపోతే / కి redirect */}
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/search" component={SearchResults} />
        <ProtectedRoute exact path="/booking" component={Booking} />
        <ProtectedRoute exact path="/payment" component={Payment} />
        <ProtectedRoute exact path="/confirmation" component={Confirmation} />
        <ProtectedRoute exact path="/bookings" component={MyBookings} />
      </Switch>
    </BrowserRouter>
  )
}

export default App