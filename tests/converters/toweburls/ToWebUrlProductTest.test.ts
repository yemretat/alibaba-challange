import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToWebUrlProduct from "../../../helpers/converters/toweburls/ToWebUrlProduct";
import { IToWebUrlService } from "../../../helpers/converters/IToWebUrlService";
import { webUrlType } from "../../../data/models/LinkTypes";
import app from "../../../server";
//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to weburl as product page", () => {
  it("Should return weburl when product page has only contentId ", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlProduct();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Product&ContentId=1123445"
    );
    assert.equal(webUrlResult, "https://www.trendyol.com/brand/name-p-1123445");
    done();
  });
  it("Should return weburl when product page has contentId and campaignId ", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlProduct();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Product&ContentId=1925865&CampaignId=5908230"
    );
    assert.equal(
      webUrlResult,
      "https://www.trendyol.com/brand/name-p-1925865?boutiqueId=5908230"
    );
    done();
  });
  it("Should return weburl when product page has contentId and merchantId ", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlProduct();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Product&ContentId=1925865&MerchantId=9994"
    );
    assert.equal(
      webUrlResult,
      "https://www.trendyol.com/brand/name-p-1925865?merchantId=9994"
    );
    done();
  });
  it("Should return weburl when product page has contentId ,merchantId and campaignId ", (done) => {
    const linkConverter: IToWebUrlService = new ToWebUrlProduct();
    let webUrlResult: webUrlType = linkConverter.toWebUrl(
      "ty://?Page=Product&ContentId=12314124&CampaignId=1241214&MerchantId=4198241"
    );
    assert.equal(
      webUrlResult,
      "https://www.trendyol.com/brand/name-p-12314124?boutiqueId=1241214&merchantId=4198241"
    );
    done();
  });
  describe("boundary and edge cases are tested using API endpoints to verify correctly working of the correct service in the unexpected scenarios", () => {
    it("Should return empty homepage weburl when product page contentId is empty", (done) => {
      chai
        .request(app)
        .post("/api/deepLink_to_Link")
        .set("content-type", "application/json")
        .send({
          deepLink: "ty://?Page=Product&ContentId=",
        })
        .end((err, response) => {
          assert.equal("https://www.trendyol.com", response.body.Response);
          done();
        });
    });
    it("Should return empty homepage weburl when page query param is not Product", (done) => {
        chai
          .request(app)
          .post("/api/deepLink_to_Link")
          .set("content-type", "application/json")
          .send({
            deepLink: "ty://?Page=Productsa&ContentId=",
          })
          .end((err, response) => {
            assert.equal("https://www.trendyol.com", response.body.Response);
            done();
          });
      });
      it("Should return empty homepage weburl when contentId param is not ContentId", (done) => {
        chai
          .request(app)
          .post("/api/deepLink_to_Link")
          .set("content-type", "application/json")
          .send({
            deepLink: "ty://?Page=Product&ContenttId=123214",
          })
          .end((err, response) => {
            assert.equal("https://www.trendyol.com", response.body.Response);
            done();
          });
      });
    it("Should ignore the invalid query param when product page deeplink has invalid paramter", (done) => {
        chai
          .request(app)
          .post("/api/deepLink_to_Link")
          .set("content-type", "application/json")
          .send({
            deepLink: "ty://?Page=Product&ContentId=41241512&InvalidId=1231414",
          })
          .end((err, response) => {
            assert.equal("https://www.trendyol.com/brand/name-p-41241512", response.body.Response);
            done();
          });
      });
  });
});
