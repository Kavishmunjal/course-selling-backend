const {Router} = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const jwt_admin_Secret = require("../jwt");
const {adminMiddelware } = require("../middelware/admin");

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

  adminRouter.post("/addCourse" , adminMiddelware ,async function (req,res){

   const adminId = req.userId;
   const {titleString, description,price,imageUrl}  = req.body;
 
 
 const course =  await courseModel.create({
    title : titleString,
     description : description,
     price : price,
     imageUrl: imageUrl,
     creatorId: adminId 
  })

  res.json({
    message:"created sucessfully",
    courseId : course._id  
})
    
  })
  

adminRouter.put("/addCourse" , adminMiddelware , async function (req,res){
  const { title, description, imageUrl, price, courseId } = req.body;


  const course = await courseModel.updateOne({
      _id: courseId, 
      creatorId: adminId 
  }, {
      title: title, 
      description: description, 
      imageUrl: imageUrl, 
      price: price
  })

  res.json({
      message: "Course updated",
      courseId: course._id
  })

    
})

adminRouter.get("/allCourse" , async function (req,res){

  const adminId = req.userId;

  const courses = await courseModel.find({
      creatorId: adminId ,
  });

  res.json({
      message: "Course updated",
  
})

})

module.exports = {

adminRouter:adminRouter
}
