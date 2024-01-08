import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { jwtTokenGenerate } from '../utils/tokenUtils.js';

export const register = async (req, res, next) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created successfully' });
};

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });

  const validUser = user && (await comparePassword(password, user.password));
  if (!validUser) throw new UnauthenticatedError('invalid Credentials');
  //   payload
  const userdata = {
    userId: user._id,
    userName: user.name,
  };

  //   Generating jwy token
  const oneDay = 1000 * 60 * 60 * 24;
  const token = jwtTokenGenerate(userdata);
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.CREATED).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logout successfully' });
};
