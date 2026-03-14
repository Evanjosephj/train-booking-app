const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")  // ✅ import

const JWT_SECRET = "train_booking_secret_key"  // ✅ Secret key

// GET all users
router.get("/", async (req, res) => {
  try {
    const allusers = await User.find().lean()
    res.send(allusers)
  } catch (error) {
    res.status(400).send({ error: "No users found" })
  }
})

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ message: "Email already exists!" })
    }
    const newUser = new User({ name, email, password, phoneNumber })
    await newUser.save()
    res.status(201).json({ message: "Registered Successfully!", user: newUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({
      message: "Account not found! Please register first.",
      redirect: "/register"
    })

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password!" })
    }

    // ✅ JWT Token generate చేయి
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }  // 7 days valid
    )

    res.json({
      message: "Login successful!",
      token,  // ✅ token పంపు
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router