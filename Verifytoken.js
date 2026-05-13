const jwt = require("jsonwebtoken")
const  control2 =require('./controlusers')
const  UserA =require('./model/SchemaUsers')
require("dotenv").config()


const Verifytoken = async (req , res , next)=>{
    
    
    
    const getauth = await req.headers["Authorization"] || req.headers["authorization"]
    try{
        const token2 = getauth.split(" ")[1]

    const verify = jwt.verify(token2,process.env.SecretKey)
    // console.log("auth =>" , verify);
    next()
    }catch(e){
        res.json("token not valid")
        console.log(e);
        
    }   
  
    

}
module.exports = Verifytoken