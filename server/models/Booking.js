const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  trainId: { type: String},
  trainName: { type: String, required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  classType: { type: String, required: true },
  passengers: { type: Number, required: true },
  totalFare: { type: Number, required: true },
  departure: { type: String },
  arrival: { type: String },
  pnrNumber: { type: String, required: true },
  seatNumber: { type: String, required: true },
  bookingId: { type: String, required: true },
  status: { type: String, default: 'confirmed' }
}, { timestamps: true })

module.exports = mongoose.model("booking", bookingSchema)