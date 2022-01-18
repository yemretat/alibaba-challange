import { IToWebUrlService } from "../IToWebUrlService";
import Constants from "../constants";
import { webUrlType,deepLinkType } from "../../../data/models/LinkTypes";
import { LinkBuildHelper } from "../../utils/LinkBuildHelper";


export default class ToWebUrlProduct implements IToWebUrlService {

    /**
    * LinkBuilderHelper class is used to create correct form of Product weburl 
    * @param link ProductPage deeplink given to be converted
    * @returns weburl version of ProductPage
    */  

  toWebUrl(link:deepLinkType): webUrlType{
    var linkBuildHelper = new LinkBuildHelper(link)
    Object.keys(linkBuildHelper.searchKeys).map(obj => {
      if(Constants.DEEPLINK_CONTENT == obj){
        const path =Constants.WEB_PRODUCT_B_PATH+ Constants.WEB_PRODUCT_NAME_PATH+linkBuildHelper.searchKeys[obj]
        linkBuildHelper.addPath(path)
      }
      if(Constants.DEEPLINK_CAMPAIGN == obj)
        linkBuildHelper.addSearch(Constants.WEB_BOUTIQUE,linkBuildHelper.searchKeys[obj])
      if(Constants.DEEPLINK_MERCHANT == obj)
        linkBuildHelper.addSearch(Constants.WEB_MERCHANT,linkBuildHelper.searchKeys[obj])
    })
    return linkBuildHelper.buildWebUrl()

  }
}
