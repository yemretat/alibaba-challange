import { IToWebUrlService } from "../IToWebUrlService";
import Constants from "../constants";
import ToWebUrlProduct from "./ToWebUrlProduct";
import ToWebUrlSearch from "./ToWebUrlSearch";
import ToWebUrlOther from "./ToWebUrlOther";
import { deepLinkType, webUrlType } from "../../../data/models/LinkTypes";

export default class ToWebUrlBase implements IToWebUrlService {
  private converter: IToWebUrlService;
  /**
   * ToWebUrlBase detects the deeplink type then convert it to the weburl
   *
   * @param link deeplinktype given to be converted
   * @returns  weburl version of the deeplink
   */

  toWebUrl(link: deepLinkType): webUrlType {
    if (link.match(Constants.REGEX_DEEPLINK_PRODUCT)) {
      this.converter = new ToWebUrlProduct();
    } else if (link.match(Constants.REGEX_DEEPLINK_SEARCH)) {
      this.converter = new ToWebUrlSearch();
    } else {
      this.converter = new ToWebUrlOther();
    }
    let updatedLink: string;
    updatedLink = this.converter.toWebUrl(link);

    return updatedLink as webUrlType;
  }
}
