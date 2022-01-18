import { Request, Response, NextFunction } from "express";
import { ConvertedLinkEnums } from "../../helpers/enums/ConvertedLinkEnums";
import ConvertedLinkRepo from "../../data/mysqlrepo/ConvertedLinkRepo";
import Logger from "../../helpers/logger/Logger";

export default class RedisMiddleware {
  redisClient: any;
  constructor(redis: any) {
    this.redisClient = redis;
  }

  cacheCheck(
    req: Request,
    res: Response,
    next: NextFunction,
    redisCacheMiddleware: RedisMiddleware
  ) {
    const key = redisCacheMiddleware.generateCacheKey(Object.values(req.body!)[0]!,req.route.path);
    redisCacheMiddleware.redisClient.get(key, (err: any, data: any) => {
      if (err) {
        Logger.error(JSON.stringify(err));
        res.status(400).json({success : false, message: err.name });
      } else {
        // Check cached data is exist.
        if (data != null) {
          // Send cached data.
          Logger.info(`Response is sent from cache with key: ${key}`);
          //send to the database
          const saveRowObject = {
            source: Object.values(req.body!)[0]!,
            target: data,
            direction:
              req.route.path == "/link_to_DeepLink"
                ? ConvertedLinkEnums.ConversionDirection.TO_DEEPLINK
                : ConvertedLinkEnums.ConversionDirection.TO_WEBURL,
          };
          ConvertedLinkRepo.saveConvertedLink(saveRowObject);
          res.status(200).json({
            success:true,
            Response: data,
          });
        } else {
          // If there is no cached data then let leave the caching to the
          // final controller function.
          Logger.info(`Response is not sent from cache with key: ${key}`);
          next();
        }
      }
    });
  }

  generateCacheKey(url:any,direction:string) {
    return `${url}_${direction}`;
  }
}
