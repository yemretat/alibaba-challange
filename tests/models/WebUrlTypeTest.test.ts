import { expect } from "chai";
import { webUrlType } from "../../data/models/LinkTypes";

describe("Verifying the types of weburl and deeplinktype",() => {
    it("Should not return error when string which has weburl type is in correct form",(done)=>{
        expect(() => {
            const webUrl:webUrlType="https://www.trendyol.com"
        }).to.not.throw(TypeError)
        done()
    })
    it("Should return error when string which has weburl type is not in correct form",(done)=>{
        expect(() => {
            const webUrl:webUrlType="https://www.trendyol.com/sr?q=%C3%BCt%C3%BCm"
        }).to.not.throw(TypeError)
        done()
    })
})