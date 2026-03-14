const express = require("express")
const listEndpoints = require("express-list-endpoints")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/trainsDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err))

app.use("/trains", require("./routes/trainRoutes"))
app.use("/user", require("./routes/userRoutes")) 
app.use("/booking", require("./routes/bookingRoutes")) 

console.log(listEndpoints(app))
app.listen(5000, () => console.log("Server running on port 5000"))