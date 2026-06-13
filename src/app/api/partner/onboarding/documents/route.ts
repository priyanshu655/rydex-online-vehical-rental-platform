import connectDb from "@/lib/db";
import { NextRequest } from "next/server";
import User from "@/models/user.model";
import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import { url } from "inspector";
import Vehicle from "@/models/vehical.model";
import PartnerDocs from "@/models/partnerDocs.model";

export async function POST(req:NextRequest) {
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

    const formData=await req.formData();
    const aadhar=formData.get("aadhar") as Blob | null;
    const license=formData.get("license") as Blob | null;
    const rc=formData.get("rc") as Blob | null;

    if(!aadhar||!license||!rc){
        return Response.json({
            message:"all documents are required"
        },{status:400})
    }

   const updatePayload: {
  owner: typeof user._id;
  status: string;
  aadharUrl?: string;
  licenseUrl?: string;
  rcUrl?: string;
} = {
  owner: user._id,
  status: "pending",
};

    if(aadhar){
        const url=await uploadOnCloudinary(aadhar);
        if(!url){
            return Response.json({
            message:"aadhar upload failed"
        },{status:500})
        }
         updatePayload.aadharUrl=url;
    }
 if(license){
        const url=await uploadOnCloudinary(license);
        if(!url){
            return Response.json({
            message:"license upload failed"
        },{status:500})
        }
         updatePayload.licenseUrl=url;
    }
 if(rc){
        const url=await uploadOnCloudinary(rc);
        if(!url){
            return Response.json({
            message:"license upload failed"
        },{status:500})
        }
         updatePayload.rcUrl=url;
    }

const partner_docs=await PartnerDocs.findOneAndUpdate({owner:user._id},{$set:updatePayload},{upsert:true,new:true})

if(user.partnerOnboardingSteps<2){
    user.partnerOnboardingSteps=2;
}

await user.save();
 return Response.json(
            partner_docs
        ,{status:201})
}catch(error:any){
    console.error("PARTNER DOC ERROR:", error);

    return Response.json(
      {
        message: error?.message || "partner docs error"
      },
      { status: 500 }
    );
}
}
