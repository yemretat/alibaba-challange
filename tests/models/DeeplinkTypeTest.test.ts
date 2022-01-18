import { expect } from "chai";
import { deepLinkType } from "../../data/models/LinkTypes";

describe("Verifying the types of weburl and deeplinktype",() => {
    it("Should not return error when string which has weburl type is in correct form",(done)=>{
        expect(() => {
            const deeplink:deepLinkType="ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064"
        }).to.not.throw(TypeError)
        done()
    })
    it("Should return error when string which has weburl type is not in correct form with second version",(done)=>{
        expect(() => {
            const deeplink:deepLinkType="ty://?Page=Search&Query=%C3%BCt%C3%BC"
        }).to.not.throw(TypeError)
        done()
    })
})