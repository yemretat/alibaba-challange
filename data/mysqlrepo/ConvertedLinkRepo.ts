import { ConvertedLink } from "../models/ConvertedLink";

class ConvertedLinkRepo {
    /**
     * 
     * @param props createdDate is added and manipulated to make it compatible with mysql
     * @returns 
     */

    saveConvertedLink(props:any)
    {
        props.createdDate=new Date().toISOString().slice(0, 19).replace('T', ' ') 
        return ConvertedLink.create(props)
    }
}
export default new ConvertedLinkRepo()