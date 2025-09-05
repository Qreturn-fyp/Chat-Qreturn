import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Create Account
export async function POST(req) {
  try {
    let data;
    try {
      data = await req.json();
    } catch (jsonError) {
      return NextResponse.json(
        { message: "Invalid JSON data" },
        { status: 400 }
      );
    }

    await connectDB();

    // Single object validation
    const { username, email, password } = data;
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User(data);
    const user = await newUser.save();

    if (!user) return NextResponse.json({ message: "Failed to create" }, { status: 500 });
    return NextResponse.json({ message: "Account Create Successfull", user }, { status: 201 });

  } catch (error) {
    console.error("Error creating User", error);
    return NextResponse.json(
      { message: "Failed to create User" },
      { status: 500 }
    );
  }
}


// get all users or get user by email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    await connectDB();

    // get by email
    if (email) {
      const user = await User.find({ email: email });
      if (!user || user.length === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      } else {
        return NextResponse.json(
          { message: "User retrieved successfully", user: user },
          { status: 200 }
        );
      }
    }

    // Find all lost posts
    const user = await User.find();
    return NextResponse.json(
      { message: "Users retrieved successfully", users: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Users:", error);
    return NextResponse.json(
      { message: "Failed to fetch Users" },
      { status: 500 }
    );
  }
}

