import { NextRequest } from "next/server";
import User from "@/models/user.model";
import { auth } from "@/auth";
import connectDb from "@/lib/db";
import PartnerBank from "@/models/partnerBank.model";
export async function POST(req:NextRequest){
    try {
    await connectDb();
    const session = await auth();

    if (!session || !session.user?.email) {
      return Response.json(
        {
          message: "Unauthorize",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json(
        {
          message: "User not found.",
        },
        { status: 400 },
      );
    }
    const {accountHolder,accountNumber,upi,ifsc,mobileNumber}=await req.json();
    if(!accountHolder||!accountNumber||!ifsc||!mobileNumber){
         return Response.json(
        {
          message: "send all bank detials.",
        },
        { status: 400 },
      );
    }

    const partnerBank=await PartnerBank.findOneAndUpdate({owner:user._id},{accountHolder,accountNumber,ifsc,upi,status:"added"},{upsert:true,new:true});

    user.mobileNumber=mobileNumber;
    if(user.partnerOnboardingSteps<3){
        user.partnerOnboardingSteps=3;
    }

await user.save();
  return Response.json(
        partnerBank,
        { status: 201},
      );

}catch(err){
  return Response.json(
        {
          message: `partner bank error ${err}`,
        },
        { status: 500 },
      );
    }
}

export async function GET(req:NextRequest){
    try {
    await connectDb();
    const session = await auth();

    if (!session || !session.user?.email) {
      return Response.json(
        {
          message: "Unauthorize",
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json(
        {
          message: "User not found.",
        },
        { status: 400 },
      );
    }
    const partnerBank=await PartnerBank.findOne({owner:user._id});

    if(partnerBank){
        return Response.json(partnerBank,{status:200});

    }else{
        return null;
    }
}catch(err){
return Response.json({message:`partner bank error ${err}`},{status:200});
}
}