import { deepLinkType, webUrlType } from "../../data/models/LinkTypes";

export interface IToDeepLinkConv {
  toDeepLink(link?: webUrlType): deepLinkType;
}
