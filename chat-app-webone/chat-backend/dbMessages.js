import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    

    message:String,
    name:String,
    timestamp:String,
    received:Boolean,
    chatuser:String
})

export default mongoose.model('Message',chatSchema)