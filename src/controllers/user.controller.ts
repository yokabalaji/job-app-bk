import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

   if (!name || !email || !password) {
    return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required fields',
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
        return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};
