import { Request, Response, NextFunction } from "express";

export interface ILinkConverterService {
  toDeepLink(req: Request, res: Response, next: NextFunction): Promise<any>;
  toLink(req: Request, res: Response, next: NextFunction): Promise<any>;
}
