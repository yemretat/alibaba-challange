import { assert,expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToDeepLinkSearch from "../../../helpers/converters/todeeplinks/ToDeepLinkSearch";
import { IToDeepLinkConv } from "../../../helpers/converters/IToDeepLinkConv";
import { deepLinkType } from "../../../data/models/LinkTypes";
import app from "../../../server"

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to deeplink as search page", () => {
  it("Should return deeplink when searchpage url has param ", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkSearch();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/sr?q=%C3%BCt%C3%BC"
    );
    assert.equal(deepLinkResult, "ty://?Page=Search&Query=%C3%BCt%C3%BC");
    done();
  });
});
describe("boundary case is tested using API endpoints to verify correctly working of the correct service in the unexpected scenario", () => {
    it("Should return deeplink when searchpage url has param ", (done) => {
      chai
        .request(app)
        .post("/api/link_to_DeepLink")
        .set("content-type", "application/json")
        .send({
          webUrl: "https://www.trendyol.com/sr",
        })
        .end((err, response) => {
          assert.equal("ty://?Page=Home", response.body.Response);
          done();
        });
    });
  });
  