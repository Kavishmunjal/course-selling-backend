const jwt = require("jsonwebtoken");
const {jwt_admin_secret} = require("../jwt");

function adminMiddelware (req,res,next){
   const token  = req.header.token;
   const decorded =  jwt.verify(token, jwt_admin_secret);
    if(decorded){
        req.userid=decorded.id;
        next()
    }
    else{
        res.status(403).json({
            message : "you are not signin"
        })
    }



}
module.exports = {
     adminMiddelware: adminMiddelware
};