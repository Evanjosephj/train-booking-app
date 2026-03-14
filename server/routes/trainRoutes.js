const express = require("express")

const router = express.Router()
const Train = require("../models/Train")

const formatTrain = (t) => {
  const {
    _id, trainNumber, trainName, type,
    source, destination, departureTime,
    arrivalTime, duration, status,
    isActive, createdAt, updatedAt,
    runningDays, class: classList, stops
  } = t

  return {
    id: _id,
    trainNumber, trainName, type,
    source, destination,
    departureTime, arrivalTime, duration,
    status, isActive, createdAt, updatedAt,
    runningDays,
    class: classList.map(({ classType, totalSeats, availableSeats, farePerKm }) => ({
      classType, totalSeats, availableSeats, farePerKm
    })),
    stops: stops.map(({ stationName, arrivalTime, departureTime, distance }) => ({
      stationName, arrivalTime, departureTime, distance
    }))
  }
}

// GET all trains
router.get("/", async (req, res) => {
  try {
    const trains = await Train.find().lean()
    res.send(trains.map(formatTrain))
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// GET search
router.get("/search", async (req, res) => {
  try {
    const { id, source, destination, trainName, trainNumber, classType, day } = req.query

    if (id) {
      const trainById = await Train.findById(id).lean()
      if (!trainById) return res.status(404).json({ message: "No train found" })
      return res.send(formatTrain(trainById))
    }

    const filter = {}
    if (source) filter.source = { $regex: source, $options: "i" }
    if (destination) filter.destination = { $regex: destination, $options: "i" }
    if (trainName) filter.trainName = { $regex: trainName, $options: "i" }
    if (trainNumber) filter.trainNumber = trainNumber
    if (classType) filter["class.classType"] = classType
    if (day) filter.runningDays = day
    filter.isActive = true

    const trains = await Train.find(filter).lean()
    if (trains.length === 0) {
      return res.status(404).json({ message: "No trains found" })
    }
    res.send(trains.map(formatTrain))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET by train number
router.get("/:trainNumber", async (req, res) => {
  try {
    const train = await Train.findOne({ trainNumber: req.params.trainNumber }).lean()
    if (!train) return res.status(404).json({ error: "Train not found" })
    res.send(formatTrain(train))
  } catch (err) {
    res.status(400).json({ error: "Train not found" })
  }
})

// POST bulk insert
router.post("/", async (req, res) => {
  try {
    const trains = await Train.insertMany(req.body)
    res.status(201).send(trains)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})



module.exports = router