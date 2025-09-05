import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

// POST - Logout user
export async function POST(request) {
  try {
    await connectDB();
    
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, { status: 400 });
    }
    
    const { userId } = body;
    
    // Validation
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: 'User ID is required'
      }, { status: 400 });
    }
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid user ID'
      }, { status: 400 });
    }
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        isOnline: false,
        lastSeen: new Date()
      },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Logout successful',
      data: user
    });
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: false,
      message: 'Logout failed',
      error: error.message
    }, { status: 500 });
  }
}
