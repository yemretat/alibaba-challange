import { IToWebUrlService } from "../IToWebUrlService";
import Constants from "../constants";
import { deepLinkType, webUrlType } from "../../../data/models/LinkTypes";
import { LinkBuildHelper } from "../../utils/LinkBuildHelper";
export default class DeepSearchPageConv implements IToWebUrlService {

  /**
   * LinkBuilderHelper class is used to create correct form of Search Page weburl
   * @param link SearchPage deeplink given to be converted
   * @returns weburl version of SearchPage
   */

  toWebUrl(link: deepLinkType): webUrlType {
    var linkBuildHelper = new LinkBuildHelper(link)
    Object.keys(linkBuildHelper.searchKeys).map(obj => {
      if(Constants.DEEPLINK_QUERY == obj){
        linkBuildHelper.addPath(Constants.WEB_PRODUCT_SR_PATH)
        linkBuildHelper.addSearch(Constants.WEB_SEARCH,linkBuildHelper.searchKeys[obj])
      }
    })
  
    return linkBuildHelper.buildWebUrl() ;
  }
}
