const jwt = require("jsonwebtoken");
const {jwt_user_secret} = require("../jwt");

function userMiddelware (req,res,next){
   const token  = req.header.token;
   const decorded =  jwt.verify(token, jwt_user_secret);
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

module.exports ={
 userMiddelware: userMiddelware
};