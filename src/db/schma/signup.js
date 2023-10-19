import { Schema, model } from "mongoose";

const UserSchma = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true 
    },
    password:{
        type:String,
        required: true 
    },
    contact:{
        type:String,
        required:true
    },
})

export const User = model('User',UserSchma)