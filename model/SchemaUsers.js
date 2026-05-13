const mongoose = require("mongoose")

const DataSchema = new 
mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    emile : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    tooken : {
        type: String
    }
})
module.exports = mongoose.model('userA',DataSchema,"userAs")
