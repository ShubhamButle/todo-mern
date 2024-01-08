import bcrypt, { genSalt } from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const iMatch = await bcrypt.compare(password, hashedPassword);
  return iMatch;
};
