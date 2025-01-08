const {Router} = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const jwt_admin_Secret = "munjal";

adminRouter.post("/signup" , async function (req,res){
    const email=  req.body.email;
    const passward =  req.body.passward;
     const firstName = req.body.firstName;
     const lastName = req.body.lastName;

    try {
    await adminModel.create({
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

adminRouter.post("/signin" , async function (req,res){
    const email = req.body.email;
    const passward = req.body.passward;
    
    const admin = await adminModel.findOne({
        email: email,
        passward: passward
    })
    
    if(admin) {
        const token = jwt.sign({
            id: admin._id,
        }, jwt_admin_Secret);
    
        res.json({
            token: token
        })
    }
    else{
      res.status(403).json({
         message: "you not have an account , please signup first"
      })
    }
  })

adminRouter.put("/addCourse" , function (req,res){


    
})

adminRouter.get("/allCourse" , function (req,res){


    
})


module.exports = {

adminRouter:adminRouter
}

