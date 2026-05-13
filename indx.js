require("dotenv").config()
const chick = require("./midel wiar")
const express = require("express")
// let users =require("./data")
const  control =require('./control')
const  control2 =require('./controlusers')
const mongoose = require("mongoose")
const userId =require("./model/SchemaUser")
const Router =require("./route/userRoute")
const RouterLog =require("./route/logRoute")

const app = express()
const Url = process.env.URL
const Port = process.env.Port

mongoose.connect(Url).then(()=>{
    console.log("mongodb connect success")
})



app.use(express.json())
app.use("/api/users" , Router)
app.use("/api/userA" , RouterLog)



app.listen(Port , ()=>{
    console.log("listen is port 5000")
})