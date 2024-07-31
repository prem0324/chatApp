import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Number:Number
})

export default mongoose.model('ChatUser',chatSchema)