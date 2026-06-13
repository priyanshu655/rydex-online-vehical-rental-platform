import mongoose from "mongoose"
import { unique } from "next/dist/build/utils";

type vehicleType=
 "bike"|
 "car"|
 "loading"|
 "truck"|
 "auto";

interface Ivehicle{
    owner:mongoose.Types.ObjectId,
    type:vehicleType,
    vehicleModel:string,
    number:string,
    imageUrl?:string,
    baseFare?:number,
    pricePerKm:number,
    waitingCharge:number,
    status:"approvd"|"pending"|"rejected",
    rejectionReason:string,
    isActive:boolean,
    createdAt:Date,
    updatedAt:Date
}
const vehicleSchema=new mongoose.Schema<Ivehicle>({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:["bike","car","loading","truck","auto"],
        required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    },
    vehicleModel:{
        type:String,
        required:true
    },
    imageUrl:String,
    baseFare:Number,
    pricePerKm:Number,
    waitingCharge:Number,
    status:{
        type:String,
        enum:["approved","rejected","pending"],
        default:"pending"
    },
    rejectionReason:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})


const Vehicle =
  mongoose.models.Vehicle ||
  mongoose.model<Ivehicle>("Vehicle", vehicleSchema);

export default Vehicle;

