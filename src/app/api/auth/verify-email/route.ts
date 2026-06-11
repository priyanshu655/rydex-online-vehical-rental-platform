import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDb();

    const { email, otp } = await req.json();

    // Validation
    if (!email || !otp) {
      return Response.json(
        {
          message: "Email and OTP are required",
        },
        { status: 400 },
      );
    }

    console.log("EMAIL FROM FRONTEND:", email);
    console.log("OTP FROM FRONTEND:", otp);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", user);

    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 400 },
      );
    }

    if (user.isEmailVerified) {
      return Response.json(
        {
          message: "Email is already verified",
        },
        { status: 400 },
      );
    }

    if (!user.otp) {
      return Response.json(
        {
          message: "OTP not found",
        },
        { status: 400 },
      );
    }

    if (!user.otpExpiresAt) {
      return Response.json(
        {
          message: "OTP expiry not found",
        },
        { status: 400 },
      );
    }

    if (new Date() > user.otpExpiresAt) {
      return Response.json(
        {
          message: "OTP has expired",
        },
        { status: 400 },
      );
    }

    if (String(user.otp) !== String(otp)) {
      return Response.json(
        {
          message: "Invalid OTP",
        },
        { status: 400 },
      );
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);

    return Response.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
