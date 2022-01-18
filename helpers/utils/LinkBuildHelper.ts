import URI from "urijs";
import Constants from "../converters/constants";
import { deepLinkType, webUrlType } from "../../data/models/LinkTypes";

export class LinkBuildHelper {
  private currentLink: URI;
  private linkBuilder: URI;
  searchKeys;
  constructor(urlLink: string) {
    this.linkBuilder = new URI();
    this.currentLink = new URI(urlLink);
    this.searchKeys = this.currentLink.search(true);
  }
  addProtocol(protocol: string): LinkBuildHelper {
    this.linkBuilder.protocol(protocol);
    return this;
  }

  addPath(path: string): LinkBuildHelper {
    this.linkBuilder.pathname(path);
    return this;
  }

  addSearch(searchKey: string, searchValue: string): LinkBuildHelper {
    this.linkBuilder.addSearch(searchKey, searchValue);
    return this;
  }

  contentIDSegment() {
    return this.currentLink.segment(1)!;
  }

  buildDeepLink(): deepLinkType {
    this.linkBuilder.protocol(Constants.DEEPLINK_PROTOCOL);
    const link: string = this.linkBuilder.href();
    let deepLink: deepLinkType = this.replacedAt(link, link.indexOf("/"));
    return deepLink;
  }

  buildWebUrl(): webUrlType {
    this.linkBuilder.protocol(Constants.WEB_PROTOCOL);
    this.linkBuilder.hostname(Constants.WEB_HOSTNAME);
    this.linkBuilder.subdomain(Constants.WEB_SUBDOMAIN);
    return this.linkBuilder.href() as webUrlType;
  }

  private replacedAt(deepLink: string, index: number): deepLinkType {
    return (deepLink.substring(0, index) +
      deepLink.substring(index + 1)) as deepLinkType;
  }

}
