import connectDB from './mongodb.js';

// Database connection wrapper
export async function getDatabase() {
  try {
    await connectDB();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Test database connection
export async function testConnection() {
  try {
    await connectDB();
    console.log('✅ Database connection successful');
    return { success: true, message: 'Database connected successfully' };
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return { success: false, message: error.message };
  }
}
