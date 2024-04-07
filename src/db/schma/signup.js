import { Schema, model } from "mongoose";
const emailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const UserSchma = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        match: [emailRegex, 'Please provide a valid email address']
    },
    password:{
        type:String,
        required: true 
    },
    contact:{
        type:Number,
        required:true
    },
})

export const User = model('User',UserSchma)