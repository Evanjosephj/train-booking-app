const mongoose = require("mongoose")

const trainSchema = new mongoose.Schema({
  trainNumber:   { type: String, required: true, unique: true },
  trainName:     { type: String, required: true },
  type:          { type: String, enum: ["express", "local", "superfast", "intercity"] },
  class: [{
    classType:      { type: String, enum: ["low", "middle", "high", "sleeper", "AC1", "AC2", "AC3"] },
    totalSeats:     { type: Number },
    availableSeats: { type: Number },
    farePerKm:      { type: Number },
  }],
  source:        { type: String, required: true },
  destination:   { type: String, required: true },
  stops: [{
    stationName:   { type: String },
    arrivalTime:   { type: String },
    departureTime: { type: String },
    distance:      { type: Number },
  }],
  departureTime: { type: String, required: true },
  arrivalTime:   { type: String, required: true },
  duration:      { type: String },
  runningDays:   { type: [String], enum: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] },
  status:        { type: String, enum: ["on-time", "delayed", "cancelled"], default: "on-time" },
  isActive:      { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model("train", trainSchema)