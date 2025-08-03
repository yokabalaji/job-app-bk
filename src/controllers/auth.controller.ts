import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { generateToken } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken({ userId: user._id, email: user.email, role: user.role, username: user.name });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};
