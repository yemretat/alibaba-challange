import Constants from "../constants";
import ToDeepLinkProduct from "./ToDeepLinkProduct";
import ToDeepLinkSearch from "./ToDeepLinkSearch";
import ToDeepLinkOther from "./ToDeepLinkOther";
import { IToDeepLinkConv } from "../IToDeepLinkConv";
import { deepLinkType, webUrlType } from "../../../data/models/LinkTypes";

export default class ToDeepLinkBase implements IToDeepLinkConv {
  private converter: IToDeepLinkConv;

  /**
   * ToDeepLinkBase detects the web URL type then convert it to the deep link
   *
   * @param link webUrlType given to be converted
   * @returns  deepLink version of the webUrl
   */

  toDeepLink(link: webUrlType): deepLinkType {
    if (link.match(Constants.REGEX_WEB_PRODUCT)) {
      this.converter = new ToDeepLinkProduct();
    } else if (link.match(Constants.REGEX_WEB_SEARCH)) {
      this.converter = new ToDeepLinkSearch();
    } else {
      this.converter = new ToDeepLinkOther();
    }
    let updatedLink: string = this.converter.toDeepLink(link);

    return updatedLink as deepLinkType;
  }
}
