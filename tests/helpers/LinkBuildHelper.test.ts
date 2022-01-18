import { assert } from "chai";
import chai from "chai";
import { LinkBuildHelper } from "../../helpers/utils/LinkBuildHelper";

//Assertion Style
chai.should();

describe("creating weburls and deeplinks with linkbuilderhelper", () => {
  it("Should return the weburl with LinkBuilderHelper", (done) => {
    const linkBuilderHelper: LinkBuildHelper = new LinkBuildHelper(
      "https://www.trendyol.com"
    );
    linkBuilderHelper.addPath("brand/name-p-1925865");
    linkBuilderHelper.addSearch("merchantId", "105064");
    assert.equal(
      "https://www.trendyol.com/brand/name-p-1925865?merchantId=105064",
      linkBuilderHelper.buildWebUrl()
    );
    done();
  });
  it("Should return the correct segment with LinkBuilderHelper", (done) => {
    const linkBuilderHelper: LinkBuildHelper = new LinkBuildHelper(
      "https://www.trendyol.com/brand/name-p-1925865?merchantId=105064"
    );
    const segment: string = linkBuilderHelper.contentIDSegment();
    assert.equal("name-p-1925865",segment)
    done();
  });
  it("Should return the deepLink with LinkBuilderHelper", (done) => {
    const linkBuilderHelper: LinkBuildHelper = new LinkBuildHelper(
      "ty://"
    );
    linkBuilderHelper.addSearch("Page", "Product");
    linkBuilderHelper.addSearch("ContentId", "1925865");
    linkBuilderHelper.addSearch("MerchantId","105064")
    assert.equal(
      "ty://?Page=Product&ContentId=1925865&MerchantId=105064",
      linkBuilderHelper.buildDeepLink()
    );
    done();
  });
});
