import { IToDeepLinkConv } from "../IToDeepLinkConv";
import Constants from "../constants";
import { deepLinkType, webUrlType } from "../../../data/models/LinkTypes";
import { LinkBuildHelper } from "../../utils/LinkBuildHelper";

export default class SearchUrlToDL implements IToDeepLinkConv {
  /**
   * LinkBuilderHelper class is used to create correct form of Search Page deeplink
   * @param link SearchPage webUrl given to be converted
   * @returns deepLink version of Searchpage
   */
  toDeepLink(link: webUrlType): deepLinkType {
    var linkBuildHelper = new LinkBuildHelper(link);
    linkBuildHelper.addSearch(
      Constants.DEEPLINK_PAGE,
      Constants.DEEPLINK_SEARCH
    );
    Object.keys(linkBuildHelper.searchKeys).map((obj) => {
      if (Constants.WEB_SEARCH == obj)
        linkBuildHelper.addSearch(
          Constants.DEEPLINK_QUERY,
          linkBuildHelper.searchKeys[obj]
        );
    });

    return linkBuildHelper.buildDeepLink();
  }
}
