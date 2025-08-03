import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import connectDB from '../config/dbConfig';
async function seedAdmin() {
  try {
    await connectDB();
    const existingAdmin = await UserModel.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin account already exists.');
      return;
    }
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const adminUser = new UserModel({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      is_active: true,
    });

    await adminUser.save();
    console.log('✅ Admin account created successfully');
  } catch (error) {
    console.error('❌ Error seeding admin account:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
  }
}

seedAdmin();
