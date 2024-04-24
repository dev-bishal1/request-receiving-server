import { type Response, type Request, type NextFunction } from 'express';
import logger from '../utils/logger';

interface Error {
  statusCode: number;
  message: string;
  stack: any;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err);
  const errStatus = err.statusCode ?? 500;
  const errMsg = err.message ?? 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
  next();
};

export default errorHandler;
