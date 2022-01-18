import { deepLinkType, webUrlType } from "../../data/models/LinkTypes";

export interface IToWebUrlService {
  toWebUrl(link?: deepLinkType): webUrlType;
}
