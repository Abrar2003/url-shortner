const URL = require("../models/url.model");
const is_expired = async (req, res, next) => {
    try {
        const id = req.params.shortid;
        const url = await URL.findbyId( id );
        if(url.expiration_date < Date.now()){
            return res.send({ message: "url is expired" });
        }
        else{
            next();
        }
    } catch (error) {
        console.log({error})
    }
}

module.exports = is_expired;