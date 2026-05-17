const jwt = require("jsonwebtoken")
const control2 = require('./controlusers')
const UserA = require('./model/SchemaUsers')
require("dotenv").config()


const Verifytoken = async (req, res, next) => {



    try {
        const getauth = await req.headers["Authorization"] || req.headers["authorization"]
        const token2 = getauth.split(" ")[1]

        const verify = jwt.verify(token2, process.env.SecretKey)
        // console.log("auth =>" , verify);
        req.user = verify
        next()
    } catch (e) {
        res.json("token not valid")
        console.log(e);

    }



}
module.exports = Verifytoken