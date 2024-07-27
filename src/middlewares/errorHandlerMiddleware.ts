import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  code?: string;
  errors?: string[];
}

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number;
  const { errors, message } = err;
  const success: boolean = false;
  const error: string = err.constructor.name === 'Error' && err.code ? err.code : err.constructor.name;

  switch (error) {
    case 'ValidatorError':
      statusCode = 400;
      break;
    case 'DatabaseError':
      statusCode = 503;
      break;

    default:
      statusCode = 500;
  }
  res.status(statusCode).json({ success, error, message, errors });
  next();
};

export default errorHandlerMiddleware;
