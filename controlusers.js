var jwt = require("jsonwebtoken")
const { set } = require("mongoose")
const UserA = require("./model/SchemaUsers")
const bcrypt=require("bcryptjs")
const tooken=require("./jwtTooken")
const jwtTooken = require("./jwtTooken")
// var id = 0 ;

const getAll = async ( req, res )=>{
  try{
    const query =req.query
    const limet = query.limet || 20 
    const page = query.page || 1
    const skip = (page-1)*limet

    const UserAll =  await UserA.find({} , {__v:false}).limit(limet).skip(skip)
    return res.json({status: "success", Data:{"DataUser": UserAll}})
    
    console.log(UserAll)
    }catch(e){
      return  res.status(200).json("NOT FOUND USERS")
    }
 }

const Regester = async ( req, res )=>{
    try{

        console.log(req.body);
        const {firstName , lastName , emile , password} = req.body
        const finduser = await UserA.findOne({emile: emile , __v: false})
        if(finduser){
           return res.status(400).json("accont oredy saved")
            
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const NewUser = new UserA({
            firstName,
            lastName,
            emile,
            password: hashedPassword
        })

        const tooken = await jwtTooken({emile:NewUser.emile, id :NewUser._id})
        NewUser.tooken=tooken
        console.log(tooken);
        
        await NewUser.save()
          return  res.status(201).json("Account Created")
          
    }catch(e){
       return res.status(400).json("")
    }
    

 }
let token = 0 
const login = async ( req, res )=>{

    const {emile , password}  = req.body;

    if (!emile && !password){
         return res.status(404).json("Worrng Data")
    }
    
    const loguser = await UserA.findOne({emile: emile});
    const MatshPassword = await bcrypt.compare(password , loguser.password)
    if (loguser && MatshPassword){
        const tooken = await jwtTooken({emile: UserA.emile, id: UserA._id})
        // id = loguser._id
        // console.log(id);
           token = loguser.tooken
          
          console.log(tooken);
          await res.status(200).json({status: "User login", Data: {tooken: tooken, email: loguser}})
          
          
        }else {
            await res.status(400).json("wroong")
        }
    }
      
 
 
 

const delet = async (req,res)=>{
    
    
    const id = await UserA.findById({_id : req.params.id})
    if (id == null){
         return res.json("id not found")
    }
    console.log(id);
    try{
        
         const delet1 = await UserA.deleteOne({_id : req.params.id})

         console.log("DELETED IS DONE")
         return res.status(200).json({DELETAD:true})
     }catch (e){
         res.status(400).json("BAD REQ" )
     }
 
 }
module.exports = {
    getAll,
    Regester,
    login,
    delet,
    token
    

}