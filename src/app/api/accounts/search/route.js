import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET - Search accounts by username or email
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      }, { status: 400 });
    }
    
    const skip = (page - 1) * limit;
    
    // Search in username and email fields
    const searchRegex = new RegExp(query.trim(), 'i');
    
    const users = await User.find({
      $or: [
        { username: searchRegex },
        { email: searchRegex }
      ]
    }, { password: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ username: 1 });
    
    const total = await User.countDocuments({
      $or: [
        { username: searchRegex },
        { email: searchRegex }
      ]
    });
    
    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Search accounts error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to search accounts',
      error: error.message
    }, { status: 500 });
  }
}
