import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToWebUrlOther from "../../../helpers/converters/toweburls/ToWebUrlOther";
import { IToWebUrlService } from "../../../helpers/converters/IToWebUrlService";
import { webUrlType } from "../../../data/models/LinkTypes";
import app from "../../../server";

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to webUrl as otherpage when deeplink is not filtered as a search page or product detail page", () => {
  it("Should return weburl when deeplink not filtered as product or search page", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlOther();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Favorites"
    );
    assert.equal(webUrlResult, "https://www.trendyol.com");
    done();
  });
  it("Should return weburl when deeplink not filtered as product or search page with different page query", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlOther();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Siparislerim"
    );
    assert.equal(webUrlResult, "https://www.trendyol.com");
    done();
  });
  describe("convert to deeplink for product page using API endpoint", () => {
    it("Should return deeplink when webUrl request trendyol domain but not filtered as product or search page", (done) => {
      chai
        .request(app)
        .post("/api/deepLink_to_Link")
        .set("content-type", "application/json")
        .send({
          deepLink: "ty://?Page=Favorites",
        })
        .end((err, response) => {
          assert.equal("https://www.trendyol.com", response.body.Response);
          done();
        });
    });
  });
});
