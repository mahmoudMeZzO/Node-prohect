require("dotenv").config()
const chick = require("./midel wiar")
const express = require("express")
const control = require('./control')
const control2 = require('./controlusers')
const mongoose = require("mongoose")
const userId = require("./model/SchemaUser")
const Router = require("./route/userRoute")
const RouterLog = require("./route/logRoute")
const cors = require("cors")
const orderRoute = require("./route/orderRoute")

const app = express()
const Url = process.env.URL
const Port = process.env.Port || 5000

mongoose.connect(Url).then(() => {
    console.log("mongodb connect success")
})



app.use(cors())
app.use(express.json())
app.use("/api/users", Router)
app.use("/api/userA", RouterLog)
app.use("/api/orders", orderRoute)



app.listen(Port, "0.0.0.0", () => {
    console.log("listen is port 5000")
})