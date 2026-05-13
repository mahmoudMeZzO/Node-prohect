const  control = require('../control')
const express = require("express")
const  control2 = require('../controlusers')
const Verifytoken = require("../Verifytoken")


const Router = express.Router()

Router.route("/")
        .get(Verifytoken , control.get)
        .post(Verifytoken , control.add);

Router.route("/:id")
        .get(Verifytoken , control.getid)
        .patch(Verifytoken , control.updet)
        .delete(Verifytoken , control.delet);

module.exports = Router