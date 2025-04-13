import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { StatusCodes } from 'http-status-codes';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

export const getCurrentUser = async (req, res) => {
    const userId= req.user.userId;
    const user = await User.findById(userId);
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  };
  
  export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });  };

  export const updateUser = async (req, res) => {
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) { // req.file was added by multer middleware
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) { // delete old avatar if it exists
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    res.status(StatusCodes.OK).json({ msg: 'user updated', updatedUser });
  };