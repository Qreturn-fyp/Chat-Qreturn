import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

// GET - Get account by email
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { email } = params;

    // // get by email
    const user = await User.find({ email: email });
    if (!user || user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { message: "User retrieved successfully", user: user },
        { status: 200 }
      );
    }


  } catch (error) {
    console.error('Get account by ID error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch account',
      error: error.message
    }, { status: 500 });
  }
}

// PUT - Update account by email
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { email } = params;

    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, { status: 400 });
    }

    // Check if user exists
    const user = await User.find({ email: email });
    if (!user || user.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Account not found'
      }, { status: 404 });
    } else {
      const userUpdate = await User.findOneAndUpdate(
        { email: email },
        body,
        { new: true , runValidators: true}
      ).select('-password');
      return NextResponse.json({
        success: true,
        message: 'User Updated Successfully',
        data: userUpdate
      });

    }

  } catch (error) {
    console.error('Update account error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to update account',
      error: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete account by email
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { email } = params;

    const user = await User.findOneAndDelete({ email: email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Account not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete account',
      error: error.message
    }, { status: 500 });
  }
}
