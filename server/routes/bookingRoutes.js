const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")
const Train = require("../models/Train")

router.post("/", async (req, res) => {
  try {
    const {
      userId, trainId, trainName, source, destination,
      classType, passengers, totalFare, departure, arrival,
      pnrNumber, seatNumber, bookingId
    } = req.body

    // 1. Booking save చేయి
    const newBooking = new Booking({
      userId, trainName, source, destination,
      classType,
      passengers: Number(passengers),
      totalFare: Number(totalFare),
      departure, arrival, pnrNumber, seatNumber, bookingId
    })
    await newBooking.save()

    // 2. trainId valid అయితే మాత్రమే seats decrease చేయి
    if (trainId && trainId !== 'undefined') {
      const train = await Train.findById(trainId)
      if (train) {
        const classIndex = train.class.findIndex(c => c.classType === classType)
        if (classIndex !== -1) {
          train.class[classIndex].availableSeats -= Number(passengers)
          await train.save()
        }
      }
    }

    res.status(201).json({ message: "Booking successful!", booking: newBooking })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router