const  control = require('../control')
const express = require("express")
const  control2 =require('../controlusers')
const Verifytoken = require("../Verifytoken")


const RouterLog =express.Router()





RouterLog.route("/").get(Verifytoken , control2.getAll)
RouterLog.route("/:id").delete(Verifytoken , control2.delet)

RouterLog.route("/regestr").post (control2.Regester)
RouterLog.route("/login").post(control2.login)

module.exports = RouterLog