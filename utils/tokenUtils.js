import jwt from 'jsonwebtoken';

export const jwtTokenGenerate = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const jwtTokenCompare = (token) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  return decode;
};
