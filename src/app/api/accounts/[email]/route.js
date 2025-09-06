import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// GET - Get account by ID
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

// PUT - Update account by ID
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, { status: 400 });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid account ID'
      }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Account not found'
      }, { status: 404 });
    }

    // Prepare update data
    const updateData = {};

    // Update username if provided
    if (body.username) {
      // Check if username is already taken by another user
      const usernameExists = await User.findOne({
        username: body.username,
        _id: { $ne: id }
      });

      if (usernameExists) {
        return NextResponse.json({
          success: false,
          message: 'Username already exists'
        }, { status: 409 });
      }
      updateData.username = body.username;
    }

    // Update email if provided
    if (body.email) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({
        email: body.email,
        _id: { $ne: id }
      });

      if (emailExists) {
        return NextResponse.json({
          success: false,
          message: 'Email already exists'
        }, { status: 409 });
      }
      updateData.email = body.email;
    }

    // Update password if provided
    if (body.password) {
      const saltRounds = 12;
      updateData.password = await bcrypt.hash(body.password, saltRounds);
    }

    // Update avatar if provided
    if (body.avatar !== undefined) {
      updateData.avatar = body.avatar;
    }

    // Update online status if provided
    if (body.isOnline !== undefined) {
      updateData.isOnline = body.isOnline;
      if (body.isOnline) {
        updateData.lastSeen = new Date();
      }
    }

    // Update preferences if provided
    if (body.preferences) {
      updateData.preferences = { ...existingUser.preferences, ...body.preferences };
    }

    // Perform update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'Account updated successfully',
      data: updatedUser
    });

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

// DELETE - Delete account by ID
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid account ID'
      }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);

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
