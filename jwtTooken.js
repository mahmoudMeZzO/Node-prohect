const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = async (data)=>{
     const tooken = await jwt.sign(data ,process.env.SecretKey , {expiresIn : "3m"})
     return tooken
    
}