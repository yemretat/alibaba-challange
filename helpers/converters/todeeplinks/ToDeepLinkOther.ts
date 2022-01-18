import { IToDeepLinkConv } from "../IToDeepLinkConv";
import Constants from "../constants";
import { deepLinkType } from "../../../data/models/LinkTypes";

export default class OtherPageUrlToDL implements IToDeepLinkConv{
    /**
     * The urls which are not filtered search page or product 
     * converts to the homepage deeplink
     * @returns 
     */

    toDeepLink(): deepLinkType {
        return Constants.DEEPLINK_HOME_PAGE 
    }
    
}