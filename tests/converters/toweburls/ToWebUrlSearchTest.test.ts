import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToWebUrlSearch from "../../../helpers/converters/toweburls/ToWebUrlSearch";
import { IToWebUrlService } from "../../../helpers/converters/IToWebUrlService";
import { webUrlType } from "../../../data/models/LinkTypes";
import app from "../../../server";

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to webUrl as search page", () => {
  it("Should return weburl when searchpage url has param ", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlSearch();
    let deepLinkResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Search&Query=1214412"
    );
    assert.equal(deepLinkResult, "https://www.trendyol.com/sr?q=1214412");
    done();
  });
});
describe("boundary cases are tested using API endpoints to verify correctly working of the correct service in the unexpected scenario", () => {
  it("Should return homepage deeplink when query param is not exist", (done) => {
    chai
      .request(app)
      .post("/api/deepLink_to_Link")
      .set("content-type", "application/json")
      .send({
        deepLink: "ty://?Page=Search",
      })
      .end((err, response) => {
        assert.equal("https://www.trendyol.com", response.body.Response);
        done();
      });
  });
  it("Should return homepage deeplink when query param is invalid", (done) => {
    chai
      .request(app)
      .post("/api/deepLink_to_Link")
      .set("content-type", "application/json")
      .send({
        deepLink: "ty://?Page=Search&Quey=elbise",
      })
      .end((err, response) => {
        assert.equal("https://www.trendyol.com", response.body.Response);
        done();
      });
  });
});
