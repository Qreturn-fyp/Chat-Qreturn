import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET - Get all accounts
export async function GET() {
  try {
    await connectDB();
    
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Get all accounts error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch accounts',
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new account
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { username, email, password } = body;
    
    // Validation
    if (!username || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Username, email, and password are required'
      }, { status: 400 });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
      }, { status: 409 });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: userResponse
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create account error:', error);
    
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
      message: 'Failed to create account',
      error: error.message
    }, { status: 500 });
  }
}
