import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToDeepLinkOther from "../../../helpers/converters/todeeplinks/ToDeepLinkOther";
import { IToDeepLinkConv } from "../../../helpers/converters/IToDeepLinkConv";
import { deepLinkType } from "../../../data/models/LinkTypes";
import app from "../../../server";

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to deeplink as otherpage when urls are not filtered as a search page or product detail page", () => {
  it("Should return deeplink when webUrl request trendyol domain but not filtered as product or search page", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkOther();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/Hesabim/Favoriler"
    );
    assert.equal(deepLinkResult, "ty://?Page=Home");
    done();
  });
  describe("convert to deeplink for product page using API endpoint", () => {
    it("Should return deeplink when webUrl request trendyol domain but not filtered as product or search page", (done) => {
      chai
        .request(app)
        .post("/api/link_to_DeepLink")
        .set("content-type", "application/json")
        .send({
          webUrl: "https://www.trendyol.com/Hesabim/Favoriler",
        })
        .end((err, response) => {
          assert.equal("ty://?Page=Home", response.body.Response);
          done();
        });
    });
  });
});
