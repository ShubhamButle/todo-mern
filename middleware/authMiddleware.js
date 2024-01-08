import { UnauthenticatedError } from '../errors/customErrors.js';
import { jwtTokenCompare } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw new UnauthenticatedError('authentication invalid');
    }
    const { userId, userName: name } = jwtTokenCompare(
      token,
      process.env.JWT_SECRET
    );

    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
