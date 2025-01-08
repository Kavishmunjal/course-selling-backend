
const {Router} = require("express");
const userRouter = Router();
const {userModel} = require("../db");
const { setThePassword } = require("whatwg-url");
const e = require("express");
const jwt = require("jsonwebtoken");
const jwt_user_Secret = "kavish"




userRouter.post("/signup" , async function(req,res){

    const email=  req.body.email;
    const passward =  req.body.passward;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;

    try {
    await userModel.create({
        email : email,
        passward: passward,
        firstName: firstName,
        lastName: lastName,
     })
    } catch (error) {
            
    }
     res.json({
        message: "you are sign in sucessfully"
     })
    });

userRouter.post("/signin" , async function(req,res){

const email = req.body.email;
const passward = req.body.passward;

const user = await userModel.findOne({
    email: email,
    passward: passward
})

if(user) {
    const token = jwt.sign({
        id: user._id,
    }, jwt_user_Secret);

    res.json({
        token: token
    })
}
else{
  res.status(403).json({
     message: "you not have an account , please signup first"
  })

}



    
});

userRouter.get("/purchases" , function(req,res){



    
});

module.exports = {
userRouter: userRouter

}