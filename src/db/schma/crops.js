import { Schema, Types, model } from "mongoose";
 
const CropsSchma = new Schema({
    name:{
        type:String,
        required: true
    },
    img:{
        type:String,
    },
    description:{
        type:String,
        required: true 
    },
    status:{
        type:String,
        required: true 
    },
    basePrice:{
        type:Number,
        required: true 
    },
    lastbid:{
        type:Number,
        default:0,
        required: true 
    },
    lastbider:{
        type:Types.ObjectId,
    },
    date:{
        type:Date,
        default:Date.now()
    },
    Quantity:{
        type:Number,
        required: true 
    },
    confirm:{
        type:Boolean,
        default:false,
        required: true 
    },
    owner:{
        type:Types.ObjectId,
        required:true
    }
})
export const Crops = model('Crops',CropsSchma)