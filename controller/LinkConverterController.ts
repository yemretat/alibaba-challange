import { Router } from "express";
import { ILinkConverterService } from "../services/Abstract/ILinkConverterService";
import LinkConverterService from "../services/Concrete/LinkConverterService";
import errorWrapper from "../helpers/error/errorWrapper";
import { redisCacheMiddleware } from "../server";
import PathMiddleWare from "../middlewares/path/PathMiddleware";
class LinkConverterController {
  router = Router();

  private _linkConverterService: ILinkConverterService;

  /**
   *
   * @param linkConverterService the injector class injects dependency through the
   * constructor of the LinkConverterController
   */

  constructor(linkConverterService: ILinkConverterService) {
    this._linkConverterService = linkConverterService;
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      "/link_to_DeepLink",PathMiddleWare.pathTypeCheck,
      (req, res, next) => {
        redisCacheMiddleware.cacheCheck(req, res, next, redisCacheMiddleware);
      },
      errorWrapper(this._linkConverterService.toDeepLink)
    );
    this.router.post(
      "/deepLink_to_Link",PathMiddleWare.pathTypeCheck,
      (req, res, next) => {
        redisCacheMiddleware.cacheCheck(req, res, next, redisCacheMiddleware);
      },
      errorWrapper(this._linkConverterService.toLink)
    );
  }
}

export default new LinkConverterController(new LinkConverterService()).router; //dependency Inversion
