import { assert, expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../server";
//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("testing the API endpoints in terms of status contentType and expectation", () => {
  it("Should return the correct status when converting link to deepLink", (done) => {
    chai
      .request(app)
      .post("/api/link_to_DeepLink")
      .set("content-type", "application/json")
      .send({
        webUrl:
          "https://www.trendyol.com/casio/erkek-kol-saat-p-1925865?boutiqueId=439892",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header(
          "content-type",
          "application/json; charset=utf-8"
        );
        assert.equal(
          "ty://?Page=Product&ContentId=1925865&CampaignId=439892",
          response.body.Response
        );
        done();
      });
  });
  it("Should return the correct status when converting deeplink to link", (done) => {
    chai
      .request(app)
      .post("/api/deepLink_to_Link")
      .set("content-type", "application/json")
      .send({
        deepLink: "ty://?Page=Product&ContentId=1925865&MerchantId=105064",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.header(
          "content-type",
          "application/json; charset=utf-8"
        );

        assert.equal(
          "https://www.trendyol.com/brand/name-p-1925865?merchantId=105064",
          response.body.Response
        );
        done();
      });
  });
});

