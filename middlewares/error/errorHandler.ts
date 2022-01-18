import { Request, Response, NextFunction } from 'express';
import Logger from '../../helpers/logger/Logger';


export function unCoughtErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const error: object = { Name: err.name, Error:err };

  Logger.error(JSON.stringify(error));

  res.status(400).json({success : false, message: err.name });
}


