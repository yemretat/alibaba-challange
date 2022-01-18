import { IToWebUrlService } from "../IToWebUrlService";
import Constants from "../constants";
import { webUrlType } from "../../../data/models/LinkTypes";

export default class ToWebUrlOther implements IToWebUrlService{
    /**
     * The deeplinks which are not filtered search page or product 
     * converts to the homepage weburl
     * @returns 
     */
    toWebUrl(): webUrlType {
        return Constants.WEB_HOME_PAGE 
    }
    
}