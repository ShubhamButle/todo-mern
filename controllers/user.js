import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  res.status(StatusCodes.OK).json({ msg: 'user data Fetched', user });
};
