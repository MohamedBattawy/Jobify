import { StatusCodes } from 'http-status-codes';
import { UnauthenticatedError } from '../errors/customErrors.js';
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser){
        throw new UnauthenticatedError('invalid credentials');
    } 
    const token = createJWT({userId: user._id, role: user.role});

    res.cookie('token',token , {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: process.env.NODE_ENV === 'production',
        // signed: true,
      }
    )
    res.status(StatusCodes.ACCEPTED).json({ msg: 'user logged in' });
  };

export const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === 'production',
      });
    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
  };