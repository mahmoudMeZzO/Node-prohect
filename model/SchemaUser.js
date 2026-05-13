
// const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const DataSchema = new 
mongoose.Schema({
    name:{
        
        type: String,
        required: true
    } ,
    age:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('userId',DataSchema,"userIds")