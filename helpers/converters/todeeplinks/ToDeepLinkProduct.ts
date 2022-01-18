import { IToDeepLinkConv } from "../IToDeepLinkConv";
import Constants from "../constants";
import { webUrlType,deepLinkType } from "../../../data/models/LinkTypes";
import { LinkBuildHelper } from "../../utils/LinkBuildHelper";
export default class ToDeepLinkProduct implements IToDeepLinkConv {
   /**
    * LinkBuilderHelper class is used to create correct form of Product deeplink 
    * @param link ProductPage webUrl given to be converted
    * @returns deepLink version of ProductPage
    */  

   toDeepLink(link: webUrlType): deepLinkType {
    var linkBuildHelper = new LinkBuildHelper(link)
    const contentID=this.contentIDReturner(linkBuildHelper.contentIDSegment())
    linkBuildHelper.addSearch(Constants.DEEPLINK_PAGE,Constants.DEEPLINK_PRODUCT).addSearch(Constants.DEEPLINK_CONTENT,contentID)
    Object.keys(linkBuildHelper.searchKeys).map(obj => {
      if(Constants.WEB_BOUTIQUE == obj)
        linkBuildHelper.addSearch(Constants.DEEPLINK_CAMPAIGN,linkBuildHelper.searchKeys[obj])
      if(Constants.WEB_MERCHANT == obj)
        linkBuildHelper.addSearch(Constants.DEEPLINK_MERCHANT,linkBuildHelper.searchKeys[obj])
    })

    return linkBuildHelper.buildDeepLink() 
  }

  contentIDReturner(path:string):string{
    const contentID:string =path.split(Constants.WEB_PRODUCT_P)[1]!
    return contentID
  }
}
