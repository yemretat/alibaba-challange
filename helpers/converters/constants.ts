import { webUrlType,deepLinkType } from "../../data/models/LinkTypes";

export default class ConstantsConfig {
  static WEB_PROTOCOL: string = "https";
  static WEB_HOSTNAME: string = "trendyol.com"
  static WEB_SUBDOMAIN: string = "www"
  static WEB_BOUTIQUE: string = "boutiqueId";
  static WEB_MERCHANT: string = "merchantId";
  static WEB_SEARCH: string = "q";
  static WEB_PRODUCT_P: string = "-p-";
  static WEB_PRODUCT_B_PATH: string = "brand/";
  static WEB_PRODUCT_SR_PATH : string ="sr"
  static WEB_PRODUCT_NAME_PATH: string = "name-p-";


  static DEEPLINK_PROTOCOL: string = "ty";
  static DEEPLINK_PAGE: string = "Page";
  static DEEPLINK_PRODUCT: string = "Product";
  static DEEPLINK_CAMPAIGN: string = "CampaignId";
  static DEEPLINK_MERCHANT: string = "MerchantId";
  static DEEPLINK_SEARCH: string = "Search";
  static DEEPLINK_CONTENT: string = "ContentId";
  static DEEPLINK_QUERY: string = "Query";

  static DEEPLINK_HOME_PAGE: deepLinkType = "ty://?Page=Home";
  static WEB_HOME_PAGE: webUrlType = "https://www.trendyol.com"

  static REGEX_WEB_PRODUCT: RegExp = new RegExp(
    "\\/[^\\/]+\\/[^\\/]*-p-[0-9]+[^\\/]*"
  );
  static REGEX_WEB_SEARCH: RegExp = new RegExp("\\/sr\\?q=[^\\/]+");
  static REGEX_SEARCH_PARAM: RegExp = new RegExp("[a-zA-Z%0-9]+");
  static REGEX_DEEPLINK_PRODUCT: RegExp = new RegExp(
    "Product\\&ContentId=[0-9]+[^\\/]*"
  );
  static REGEX_DEEPLINK_SEARCH: RegExp = new RegExp("Search\\&Query=[^\\/]+");
}
