import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehical.model";
import { NextRequest } from "next/server";

const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;

export async function POST(req: Request) {
  try {
    await connectDb();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const { type, number, vehicleModel } = await req.json();

    if (!type || !number || !vehicleModel) {
      return Response.json(
        { message: "Missing required details" },
        { status: 400 }
      );
    }

    const vehicleNumber = number.toUpperCase();

    if (!VEHICLE_REGEX.test(vehicleNumber)) {
      return Response.json(
        { message: "Invalid Vehicle Number Format" },
        { status: 400 }
      );
    }

    const duplicate = await Vehicle.findOne({
      number: vehicleNumber,
      owner: { $ne: user._id },
    });

    if (duplicate) {
      return Response.json(
        { message: "Vehicle already registered" },
        { status: 400 }
      );
    }

    let vehicle = await Vehicle.findOne({
      owner: user._id,
    });

    if (vehicle) {
      vehicle.type = type;
      vehicle.number = vehicleNumber;
      vehicle.vehicleModel = vehicleModel;
      vehicle.status = "pending";

      await vehicle.save();

      return Response.json(
        { vehicle },
        { status: 200 }
      );
    }

    vehicle = await Vehicle.create({
      owner: user._id,
      type,
      number: vehicleNumber,
      vehicleModel,
      status: "pending",
    });

    if (user.partnerOnboardingSteps < 1) {
      user.partnerOnboardingSteps = 1;
    }

    user.role = "partner";

    await user.save();

    return Response.json(
      { vehicle },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Vehicle operation failed",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const session = await auth();

    if (!session?.user?.email) {
      return Response.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      email: session.user.email,
    });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const vehicle = await Vehicle.findOne({
      owner: user._id,
    });

    if (!vehicle) {
      return Response.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    return Response.json(
      vehicle,
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Failed to fetch vehicle",
      },
      { status: 500 }
    );
  }
}