import mongoose,{Mongoose} from "mongoose";

interface Iuser extends Document{
    name:string;
    email:string;
    password?:string;
    role:"user"|"partner"|"admin";
    isEmailVerified?:boolean;
    otp?:string;
    otpExpiresAt?:Date;
    partnerOnboardingSteps:number;
    mobileNumber?:string;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema=new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user",
        enum:["user","partner","admin"]
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    partnerOnboardingSteps:{
        type:Number,
        min:0,
        max:8,
        default:0
    },
    mobileNumber:{
        type:String
    }
    ,
    otp:{
        type:String
    },
    otpExpiresAt:{
        type:Date
    }
},{timestamps:true});

const User=mongoose.models.User||mongoose.model("User",userSchema);

export default User