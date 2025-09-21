import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// get user by email and password
export async function GET(request, { params }) {
    try {
        await connectDB();
        const { email, password } = params;

        // Find user by email and password
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return NextResponse.json({ message: "User not found or username and password not matched" }, { status: 404 });
        } else {
            return NextResponse.json(
                { message: "User retrieved successfully", user: user },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error('Get account by email and password error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch account',
            error: error.message
        }, { status: 500 });
    }
}
