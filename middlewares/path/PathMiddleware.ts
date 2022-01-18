import { Request, Response, NextFunction } from "express";
import { ConvertedLinkEnums } from "../../helpers/enums/ConvertedLinkEnums";
import Logger from "../../helpers/logger/Logger";

class PathMiddleWare {
  pathTypeCheck(req: Request, res: Response, next: NextFunction) {
    const reqPath = req.route.path;
    if (
      req.path == ConvertedLinkEnums.ReqPathEnums.TO_DEEPLINK &&
      Object.keys(req.body!)[0]! == ConvertedLinkEnums.BodyTypes.TO_DEEPLINK
    ) {
      next();
    } else if (
      req.path == ConvertedLinkEnums.ReqPathEnums.TO_WEBURL &&
      Object.keys(req.body!)[0]! == ConvertedLinkEnums.BodyTypes.TO_WEBURL
    ) {
      next();
    } else {
      Logger.error("The Body key is false")
      res
        .status(400)
        .json({ success: false, message: "Please give the correct body key" });
    }
  }
}
export default new PathMiddleWare()
