import { assert } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import ToDeepLinkProduct from "../../../helpers/converters/todeeplinks/ToDeepLinkProduct";
import { IToDeepLinkConv } from "../../../helpers/converters/IToDeepLinkConv";
import { deepLinkType } from "../../../data/models/LinkTypes";
import app from "../../../server"
//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("convert to deeplink as product page", () => {
  it("Should return deeplink when product page has only contentId ", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/casio/erkek-kol-saati-p-1925865"
    );
    assert.equal(deepLinkResult, "ty://?Page=Product&ContentId=1925865");
    done();
  });
  it("Should return deeplink when product page has only contentId with different path", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/brand/model-p-1234124"
    );
    assert.equal(deepLinkResult, "ty://?Page=Product&ContentId=1234124");
    done();
  });
  it("Should return deeplink when product page has boutiqueId", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/casio/erkek-kol-saat-p-1925865?boutiqueId=439892"
    );
    assert.equal(
      deepLinkResult,
      "ty://?Page=Product&ContentId=1925865&CampaignId=439892"
    );
    done();
  });
  it("Should return deeplink when product page has boutiqueId with different path", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/brand/model-p-1234123?boutiqueId=11123"
    );
    assert.equal(
      deepLinkResult,
      "ty://?Page=Product&ContentId=1234123&CampaignId=11123"
    );
    done();
  });
  it("Should return deeplink when product page has merchantId", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/casio/erkek-kol-saat-p-1925865?merchantId=105064"
    );
    assert.equal(
      deepLinkResult,
      "ty://?Page=Product&ContentId=1925865&MerchantId=105064"
    );
    done();
  });
  it("Should return deeplink when product page has merchantId and boutiqueId", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/brand/model-p-123443?boutiqueId=11&merchantId=2243"
    );
    assert.equal(
      deepLinkResult,
      "ty://?Page=Product&ContentId=123443&CampaignId=11&MerchantId=2243"
    );
    done();
  });
  it("Should return deeplink when product page has invalid query param", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/casio/erkek-kol-saat-p-1925865?invalidId=123"
    );
    assert.equal(deepLinkResult, "ty://?Page=Product&ContentId=1925865");
    done();
  });
  it("Should return deeplink when product page has valid and invalid query param together", (done) => {
    const linkConverter: IToDeepLinkConv = new ToDeepLinkProduct();
    let deepLinkResult: deepLinkType = linkConverter.toDeepLink(
      "https://www.trendyol.com/casio/erkek-kol-saat-p-1925865?boutiqueId=123456&invalidId=123&merchantId=12342145"
    );
    assert.equal(
      deepLinkResult,
      "ty://?Page=Product&ContentId=1925865&CampaignId=123456&MerchantId=12342145"
    );
    done();
  });
});
describe("convert to deeplink for product page using API endpoint", () => {
  it("Should return empty homepage deeplink when product page contentId has character other than digit after -p-", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl:
          "https://www.trendyol.com/brand/model-p-yunusemre124?boutiqueId=11&merchantId=2243",
      })
      .end((err, response) => {
        assert.equal("ty://?Page=Home", response.body.Response);
        done();
      });
  });
  it("Should return empty homepage deeplink when product page has no contentId", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl: "https://www.trendyol.com/casio/erkek-kol-saat-p-",
      })
      .end((err, response) => {
        assert.equal("ty://?Page=Home", response.body.Response);
        done();
      });
  });
  it("Should return empty homepage deeplink when product page has no p text", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl: "https://www.trendyol.com/casio/erkek-kol-saat-1925865",
      })
      .end((err, response) => {
        assert.equal("ty://?Page=Home", response.body.Response);
        done();
      });
  });
  it("Should return empty homepage deeplink when product page has no product name", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl: "https://www.trendyol.com/casio/-p-1925865",
      })
      .end((err, response) => {
        assert.equal(
          "ty://?Page=Product&ContentId=1925865",
          response.body.Response
        );
        done();
      });
  });
  it("Should return empty homepage deeplink when product page has no -p- text", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl: "https://www.trendyol.com/casio/erkek-kol-saat-1925865",
      })
      .end((err, response) => {
        assert.equal("ty://?Page=Home", response.body.Response);
        done();
      });
  });
});
