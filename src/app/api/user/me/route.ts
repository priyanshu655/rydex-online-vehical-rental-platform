import connectDb from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user.model";

export async function GET(req:Request){
    try{
        await connectDb();
        const session=await auth();
        if(!session || !session.user){
            return Response.json(
                {message:"user is not authenticated"},
                {status:400}
            )
        }
        const user = await User.findOne({
  email: session.user.email
}).select("-password -__v").lean();
        if(!user){
            return Response.json(
                {message:"user not found!"},
                {status:400}
            )
        }

        return Response.json(
            user,
           {status:200}
        )
    }catch(err){

    }
}