# 🚂 TrainBooking App

A full-stack train ticket booking web application built with the MERN stack, 
inspired by IRCTC. Users can search trains, book tickets, and make payments 
seamlessly.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Hooks, React Router v5)
- React Icons
- CSS (Custom Styling)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

## ✨ Features

- 🔐 User Authentication (Register / Login with JWT)
- 🔍 Search Trains by Source, Destination & Date
- 🎫 Book Tickets with Class Selection (AC1, AC2, AC3, Sleeper)
- 💺 Real-time Seat Availability Updates
- 💳 UPI Payment Flow (PhonePe, Google Pay, Paytm)
- 📋 Booking History & Recent Bookings
- 🧾 PNR Number & Seat Number Generation
- 🖨️ Print Ticket Feature
- 📱 Responsive Design

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

**Clone the repository**
```bash
git clone https://github.com/yourusername/train-booking-app.git
cd train-booking-app
```

**Backend Setup**
```bash
cd server
npm install
node index.js
```

**Frontend Setup**
```bash
cd client
npm install
npm start
```

## 📁 Project Structure
```
Train-Booking-App/
├── client/                 # React Frontend
│   └── src/
│       └── components/
│           ├── Login/
│           ├── Register/
│           ├── Home/
│           ├── Headers/
│           ├── Footer/
│           ├── AllTrains/
│           ├── SearchResults/
│           ├── Booking/
│           ├── Payment/
│           ├── Confirmation/
│           └── MyBookings/
└── server/                 # Node.js Backend
    ├── models/
    │   ├── User.js
    │   ├── Train.js
    │   └── Booking.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── trainRoutes.js
    │   └── bookingRoutes.js
    └── index.js
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /user/register | Register new user |
| POST | /user/login | Login user |
| GET | /trains | Get all trains |
| GET | /trains/search | Search trains |
| POST | /booking | Create booking |
| GET | /booking/user/:id | Get user bookings |

## 📸 Screenshots

> Add your screenshots here

## 🙏 Acknowledgements

- IRCTC for inspiration
- React Icons
- MongoDB Atlas

## 📄 License

MIT License — feel free to use and modify!