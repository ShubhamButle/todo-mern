import { StatusCodes } from 'http-status-codes';

const errorMiddleWare = (error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = error.message || 'Something went wrong, try again later';
  res.status(statusCode).json({ msg });
};

export default errorMiddleWare;
